<?php
	include "libs/db_util.php";

	$conn = connect("127.0.0.1", "5000", "root", "");

	$uid = $_GET["uid"];
	$cg = $_GET["cg"];

	$query = "Insert into connection_groups values (?, ?, ?)";
	$stmt = mysqli_prepare($conn, $query) or die("Prepare query failed: ".mysqli_stmt_error($stmt));
	mysqli_stmt_bind_param($stmt, "iss", $uid, $cg["group_name"], json_encode($cg["group_members"]));
	mysqli_stmt_execute($stmt) or die("Query Execution failed: ".mysqli_stmt_error($stmt));

	if(mysqli_stmt_affected_rows($stmt) == 1)
		echo "cg_created";

	mysqli_close($conn);
?>