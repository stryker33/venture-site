<?php
	
	function connect($host, $port, $user, $password)
	{
		$conn = mysqli_connect($host, $user, $password, "venture", $port) or die("db_util: Unable to connect to the MySQL Server: ".mysqli_error());
			mysqli_set_charset($conn, "utf8");

		return $conn;
	}

	function initMemcached()
	{
		$memcached = new Memcached();
		$memcached->addServer("127.0.0.1", "11211");
		
		return $memcached;
	}

	function getUserInfo($uid)
	{
		$memcached = initMemcached();

		$finalUserInfo = array();
		$cache_result = $memcached->get(md5("user-info-uid-".$uid));
		if($cache_result)
		{
			return $cache_result;
		}
		else
			return updateUserInfo($uid); 		
	}
	

	function updateUserInfo($uid)
	{
		$conn = connect("127.0.0.1", "5000", "root", "");
		$memcached = initMemcached();
		
		// Query user table
		$query = "Select uid, profile_image, first_name, last_name, gender, dob, current_home, hometown from user where uid=".$uid;
		$result = mysqli_query($conn, $query) or die("query Execution failed: ".mysqli_error($conn));
		$userInfo = mysqli_fetch_array($result, MYSQL_ASSOC);

		//$pathInfo  = pathinfo($userInfo["profile_image"], PATHINFO_EXTENSION);
		//$image = file_get_contents($userInfo["profile_image"]);
		//$base64 = "data:image/".$pathInfo.";base64,".base64_encode($image);

		$finalUserInfo["user"] = $userInfo;
		//$finalUserInfo["user"]["profile_image"] = $base64;

		// Query edu_desc table
		$query = "Select institute_name from edu_desc where uid=".$uid;
		$result = mysqli_query($conn, $query) or die("query Execution failed: ".mysqli_error($conn));
		while($eduDescInfo = mysqli_fetch_array($result, MYSQL_ASSOC))
			$finalUserInfo["edu_desc"][] = $eduDescInfo;

		// Query work_desc table
		$query = "Select work_designation, work_place_name from work_desc where uid=".$uid;
		$result = mysqli_query($conn, $query) or die("query Execution failed: ".mysqli_error($conn));
		while($workDescInfo = mysqli_fetch_array($result, MYSQL_ASSOC))
			$finalUserInfo["work_desc"][] = $workDescInfo;

		$memcached->set(md5("user-info-uid-".$uid), $finalUserInfo, 300);
		return $finalUserInfo;
	}

	// Returns the connected users
	function getConnections($uid)
	{
		$memcached = initMemcached();

		$cache_result = $memcached->get(md5("user-connections-".$uid));
		if($cache_result)
		{
			return $cache_result;
		}
		else
		{
			$userConnections = updateConnections($uid);
			return $userConnections;		
		}
	}

	// Updates the user-connections-uid key stored in memcached
	function updateConnections($uid)
	{
		$conn = connect("127.0.0.1", "5000", "root", "");
		$memcached = initMemcached();
		
		$userConnections = array();

		// Query connections table
		$query = "Select conn_user1 as connectedUser from connections where conn_user2 = $uid UNION ".
		  		 "Select conn_user2 as connectedUser from connections where conn_user1 = $uid";
		$result = mysqli_query($conn, $query) or die("Query Execution failed: ".mysqli_error($conn));
		while($connectedUser = mysqli_fetch_array($result, MYSQL_ASSOC))
			$userConnections[] = getUserInfo($connectedUser["connectedUser"]);

		$memcached->set(md5("user-connections-".$uid), $userConnections);
		mysqli_close($conn);

		return $userConnections;
	}

	// Returns the searchDomain from a user
	function getSearchDomain($uid)
	{
		$memcached = initMemcached();

		$cache_result = $memcached->get(md5("search-domain-uid-".$uid));
		if($cache_result)
		{
			return $cache_result;
		}
		else
		{
			$searchDomain = updateSearchDomain($uid);
			return $searchDomain;
		}
	}

    // Creates a searchDomain based on the current data
	function updateSearchDomain($uid)
	{
		$conn = connect("127.0.0.1", "5000", "root", "");
		$memcached = initMemcached();

		$query1 = "Select conn_user1 as connected_user from connections where conn_user2 = $uid".
			   	   " UNION ".
				   "Select conn_user2 as connected_user from connections where conn_user1 = $uid";
			
		$query2 = "Select DISTINCT conn_user1 as connected_to_connections from connections where conn_user2 IN".
				  "(Select conn_user1 as connected_user from connections where conn_user2 = $uid".
				  " UNION ".
				  "Select conn_user2 as connected_user from connections where conn_user1 = $uid)".
				  " AND conn_user1 NOT IN".
				  "(Select conn_user1 as connected_user from connections where conn_user2 = $uid ".
				  " UNION ".
				  "Select conn_user2 as connected_user from connections where conn_user1 = $uid)".
				  " UNION ".
				  "Select DISTINCT conn_user2 as connected_to_connections from connections where conn_user1 IN ".
				  "(Select conn_user1 as connected_user from connections where conn_user2 = $uid ".
				  " UNION ".
				  "Select conn_user2 as connected_user from connections where conn_user1 = $uid)".
				  "AND conn_user2 NOT IN".
				  "(Select conn_user1 as connected_user from connections where conn_user2 = $uid ".
				  " UNION ".
				  "Select conn_user2 as connected_user from connections where conn_user1 = $uid)";
		
		$query3 = "Select DISTINCT uid from work_desc where work_place_name IN (Select work_place_name from work_desc where uid = $uid)".
				  " UNION ".
				  "Select DISTINCT uid from edu_desc where institute_name IN (Select institute_name from edu_desc where uid = $uid)";

		$query4 = "Select uid from user ".
				  "where current_home LIKE (Select current_home from user where uid = $uid) OR ".
				  "hometown LIKE (Select hometown from user where uid = $uid)";

		$result = mysqli_query($conn, $query1) or die("Query Execution (query1) failed: ".mysqli_error($conn));
		while($row = mysqli_fetch_array($result, MYSQL_ASSOC))
			$searchDomain[] = $row["connected_user"];

		$result = mysqli_query($conn, $query2) or die("Query Execution (query2) failed: ".mysqli_error($conn));
		while($row = mysqli_fetch_array($result, MYSQL_ASSOC))
			$searchDomain[] = $row["connected_to_connections"];

		$result = mysqli_query($conn, $query3) or die("Query Execution (query3) failed: ".mysqli_error($conn));
		while($row = mysqli_fetch_array($result, MYSQL_ASSOC))
			$searchDomain[] = $row["uid"];

		$result = mysqli_query($conn, $query4) or die("Query Execution (query4) failed: ".mysqli_error($conn));
		while($row = mysqli_fetch_array($result, MYSQL_ASSOC))
			$searchDomain[] = $row["uid"];

		$searchDomain = array_unique($searchDomain);
		unset($searchDomain[array_search($uid, $searchDomain)]);
		$searchDomainString = join(',', $searchDomain);

		$query5 = "Select u.uid, u.profile_image, u.first_name, u.last_name, u.dob, u.gender, u.current_home, u.hometown, e.institute_name, w.work_designation, w.work_place_name  ".
				  "from user as u ".
				  "INNER JOIN edu_desc as e ON u.uid = e.uid ".
				  "INNER JOIN work_desc as w ON u.uid = w.uid ".
				  "where u.uid IN ($searchDomainString)";

		$query6 = "Select conn_user1, conn_user2 from connections ".
				  "where (conn_user1 = $uid AND conn_user2 IN ($searchDomainString) OR (conn_user1 IN ($searchDomainString) AND conn_user2 = $uid))";

		$finalSearchDomain = array();
		$result = mysqli_query($conn, $query5) or die("Query Execution (query5) failed: ".mysqli_error($conn));
		while($row = mysqli_fetch_array($result, MYSQL_ASSOC))
		{
			$finalSearchDomain[$row["uid"]] = $row;
			$finalSearchDomain[$row["uid"]]["connection_status"] = "";
		}
				

		$result = mysqli_query($conn, $query6) or die("Query Execution (query6) failed: ".mysqli_error($conn));
		while($row = mysqli_fetch_array($result, MYSQL_ASSOC))
		{
			if($row["conn_user1"] == $uid)
			{
				$finalSearchDomain[$row["conn_user2"]]["connection_status"] = "connected";
				$key = array_search($row["conn_user2"], $searchDomain);
				unset($searchDomain[$key]);
			}
				
			else if($row["conn_user2"] == $uid)
			{
				$finalSearchDomain[$row["conn_user1"]]["connection_status"] = "connected"; 
				$key = array_search($row["conn_user1"], $searchDomain);
				unset($searchDomain[$key]);
			}
		}

		$searchDomainString = join(',', $searchDomain);
		$query7 = "Select to_user, request_status from connection_requests ".
				  "where to_user IN ($searchDomainString) AND from_user = $uid";

		$result = mysqli_query($conn, $query7) or die("Query Execution (query7) failed: ".mysqli_error($conn));
		while($row = mysqli_fetch_array($result, MYSQL_ASSOC))
		{
			$finalSearchDomain[$row["to_user"]]["connection_status"] = $row["request_status"];
		}

		$searchDomain = $finalSearchDomain;

		$finalSearchDomain = array();
		foreach($searchDomain as $searchUser)
			$finalSearchDomain[] = $searchUser; 

		//echo json_encode($finalSearchDomain);
		$memcached->set(md5("search-domain-uid-".$uid), $finalSearchDomain, 300);
		mysqli_close($conn);

		return $finalSearchDomain;
	}

	// Returns the Connection Groups corresponding to a User
	function getConnectionGroups($uid)
	{
		$memcached = initMemcached();

		$cache_result = $memcached->get(md5("connection-groups-uid-".$uid));
		if($cache_result)
			return $cache_result;
		else 
			return updateConnectionGroups($uid);
	}


	// Updates the connection groups associated with a User
	function updateConnectionGroups($uid)
	{
		$conn = connect("127.0.0.1", "5000", "root", "");
		$memcached = initMemcached();

		$connectionGroupCount = 0;
		$connectionGroups = array();
		$connectionGroups["uid"] = $uid;
		$connectionGroups["groups"] = array();

		$query = "Select cg_name, cg_members from connection_groups where uid=$uid";
		$result = mysqli_query($conn, $query) or die("Query Execution Failed: ".mysqli_error($conn));
		while($row = mysqli_fetch_array($result, MYSQL_ASSOC))
		{
			$connectionGroups["groups"][$connectionGroupCount]["group_name"] = $row["cg_name"];
			$connectionGroups["groups"][$connectionGroupCount++]["group_members"] = json_decode($row["cg_members"]); 
		}

		$memcached->set(md5("connection-groups-uid-".$uid), $connectionGroups, 300);

		return $connectionGroups;
	}
?>