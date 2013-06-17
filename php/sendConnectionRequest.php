<?php
	include "libs/db_util.php";
	include "libs/ws_apps_util.php";

	$conn = connect("127.0.0.1", "5000", "root", "");

	$to = $_POST["to"];
	$from = $_POST["from"];
	$status = "pending_approval";

	$query = "Insert into connection_requests (to_user, from_user, request_status) values (?, ?, ?)";
	$stmt = mysqli_prepare($conn, $query) or die("Prepare query failed: ".mysqli_stmt_error($stmt));
	mysqli_stmt_bind_param($stmt, "iis", $to, $from, $status);
	mysqli_stmt_execute($stmt) or die("Query Execution failed: ".mysqli_stmt_error($stmt));

	echo mysqli_stmt_affected_rows($stmt);
	updateSearchDomain($from);
	
	sendConnRequestNotification($to, $from);
	
	mysqli_close($conn);
?>