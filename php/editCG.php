<?php
	include "libs/db_util.php";

	$conn = connect("127.0.0.1", "5000", "root", "");
	
	$uid = $_GET["uid"];
	$action = $_GET["a"];
	$connectionGroup = $_GET["cg"];

	// Delete the existing connection group
	$query1 = "Delete from connection_groups where uid = ? and cg_name = ?";
	$stmt = mysqli_prepare($conn, $query1) or die("Query Prepare(query1) Failed: ".mysqli_error($conn));
	mysqli_stmt_bind_param($stmt, "is", $uid, $connectionGroup["old_group_name"]);
	mysqli_stmt_execute($stmt);

	if(mysqli_stmt_affected_rows($stmt) != "1")
		die("error");

	if($action == "edit") // Edit Connection Group
	{
		$query2 = "Insert into connection_groups values (?, ?, ?)";
		$stmt = mysqli_prepare($conn, $query2) or die("Query Prepare(query2) Failed: ".mysqli_error($conn));
		mysqli_stmt_bind_param($stmt, "iss", $uid, $connectionGroup["new_group_name"], json_encode($connectionGroup["group_members"]));
		mysqli_stmt_execute($stmt);

		if(mysqli_stmt_affected_rows($stmt) != "1")
			die("error");
	}

	echo "success";
	updateConnectionGroups($uid);

	mysqli_close($conn);
?>