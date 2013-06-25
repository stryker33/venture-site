<?php
	include "libs/db_util.php";

	$conn = connect("127.0.0.1", "5000", "root", "");

	$uid = $_GET["uid"];
	$channel_name = $_GET["c_n"];
	$channel_visibility = $_GET["c_v"];
	$channel_desc = $_GET["c_d"];

	$query = "Insert into channels values (?, ?, ?, ?)";
	$stmt = mysqli_prepare($conn, $query) or die("Query prepare failed: ".mysqli_error($conn));
	mysqli_stmt_bind_param($stmt, "isss", $uid, $channel_name, $channel_visibility, $channel_desc);
	mysqli_stmt_execute($stmt);

	if(mysqli_stmt_affected_rows($stmt) == "1")
		echo "channel_created";
	else 
		echo "error";
	
	updateChannels($uid);
	mysqli_close($conn);
?>