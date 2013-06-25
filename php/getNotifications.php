<?php
	include "libs/db_util.php";

	// Script to return notifications corresponding to a user
	$conn = connect("127.0.0.1", "5000", "root", "");
	$memcached = initMemcached();

	
	$uid = $_GET["uid"];
	$all = false;
	$connectionRequests = false;

	if(isset($_GET["all"]))
		$all = true;
	if(isset($_GET["c_req"])) // c_req
		$connectionRequests = true;

	$notifications = array();
	if($all == true)
	{
		$notifications = getConnectionRequests($conn, $uid, $notifications);
		echo json_encode($notifications);
		
		mysqli_close($conn);
		exit;
	}
	
	if($connectionRequests == true)
	{
		$notifications = getConnectionRequests($conn, $uid, $notifications);
		echo json_encode($notifications);
		
		mysqli_close($conn);
		exit;
	}

	// Functions
	
	// Gets the connection requests corresponding to a user
	function getConnectionRequests($conn, $uid, $notifications)
	{
		$query = "Select from_user, request_status from connection_requests where to_user = $uid";
		$result = mysqli_query($conn, $query) or die("Query Execution Failed(conn_req): ".mysqli_error($conn));
		while($row = mysqli_fetch_array($result, MYSQL_ASSOC))
		{
			$connection_request["user"] = getUserInfo($row["from_user"]);
			$connection_request["request_status"] = $row["request_status"];
			//$notifications["connection_requests"][] = getUserInfo($row["from_user"]);
			$notifications["connection_requests"][] = $connection_request;
		}

		return $notifications;	
	}
?>