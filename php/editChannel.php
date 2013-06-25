<?php
	include "libs/db_util.php";

	$conn = connect("127.0.0.1", "5000", "root", "");
	
	$uid = $_GET["uid"];
	$action = $_GET["a"];
	$old_channel_name = $_GET["o_c_n"];

	// Delete the existing channel
	$query1 = "Delete from channels where channel_owner_uid = ? and channel_name = ?";
	$stmt = mysqli_prepare($conn, $query1) or die("Query Prepare(query1) Failed: ".mysqli_error($conn));
	mysqli_stmt_bind_param($stmt, "is", $uid, $old_channel_name);
	mysqli_stmt_execute($stmt);

	if(mysqli_stmt_affected_rows($stmt) != "1")
		die("error");

	if($action == "edit") // Edit Channel
	{
		$new_channel_name = $_GET["n_c_n"];
		$channel_visibility = $_GET["c_v"];
		$channel_desc= $_GET["c_d"];
		
		$query2 = "Insert into channels values (?, ?, ?, ?)";
		$stmt = mysqli_prepare($conn, $query2) or die("Query Prepare() failed: ".mysqli_error($conn));
		mysqli_stmt_bind_param($stmt, "isss", $uid, $new_channel_name, $channel_visibility, $channel_desc);
		mysqli_stmt_execute($stmt);
		
		if(mysqli_stmt_affected_rows($stmt) != "1")
			die("error");
	}

	echo "success";
	updateChannels($uid);

	mysqli_close($conn);
?>