<?php
	include "libs/db_util.php";
	
	//$conn = mysqli_connect("127.0.0.1", "root", "", "venture", "5000") or die("Unable to connect to the MySQL Server");
	//mysqli_set_charset($conn, "utf8");

	//$memcached = new Memcached();
	//$memcached->addServer("127.0.0.1", "11211");

	$uid = $_GET["uid"];

	/*$finalUserInfo;
	$cache_result = $memcached->get(md5("user-info-uid-".$uid));
	if($cache_result)
	{
		echo json_encode($cache_result);
	}
	else
	{
		// Query user table
		$query = "Select uid, profile_image, first_name, last_name, gender, dob, current_home, hometown from user where uid=".$uid;
		$result = mysqli_query($conn, $query) or die("query Execution failed: ".mysqli_error($conn));
		$userInfo = mysqli_fetch_array($result, MYSQL_ASSOC);
		$finalUserInfo["user"] = $userInfo;

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
		echo json_encode($finalUserInfo);
	}*/

	echo json_encode(getUserInfo($uid));
	exit();
?>