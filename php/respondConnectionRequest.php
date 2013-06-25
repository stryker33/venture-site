<?php
	include "libs/db_util.php";

	$conn = connect("127.0.0.1", "5000", "root", "");

	$to = $_GET["t"];
	$from = $_GET["f"];
	$response = $_GET["r"];
	$relation = $_GET["rel"];

	// a => accept, r => reject, rl => review_later
	if($response == "a")
	{
		$query = "Insert into connections (conn_user1, conn_user2, conn_relation) values (?, ?, ?)";
		$stmt = mysqli_prepare($conn, $query) or die("Prepare Query failed: ".mysqli_stmt_error());
		mysqli_stmt_bind_param($stmt, "iis", $to, $from, $relation);
		mysqli_stmt_execute($stmt) or die("Query Execution failed: ".mysqli_stmt_error());

		echo mysqli_stmt_affected_rows($stmt);

		$query = "Delete from connection_requests where to_user = ? and from_user = ?";
		$stmt = mysqli_prepare($conn, $query) or die("Prepare Query failed: ".mysqli_stmt_error());
		mysqli_stmt_bind_param($stmt, "ii", $to, $from);
		mysqli_stmt_execute($stmt) or die("Query Execution failed: ".mysqli_stmt_error());

		echo " ".mysqli_stmt_affected_rows($stmt);
		updateConnections($to);
		updateConnections($from);
	}
	else if($response == "r")
	{
		$query = "Delete from connection_requests where to_user = ? and from_user = ?";
		$stmt = mysqli_prepare($conn, $query) or die("Prepare Query failed: ".mysqli_stmt_error());
		mysqli_stmt_bind_param($stmt, "ii", $to, $from);
		mysqli_stmt_execute($stmt) or die("Query Execution failed: ".mysqli_stmt_error());

		echo mysqli_stmt_affected_rows($stmt);	
	}
	else if($response == "rl")
	{
		$status = "delayed_for_review";
		$query = "Update connection_requests set request_status = ? where to_user = ? and from_user = ?";
		$stmt = mysqli_prepare($conn, $query) or die("Prepare Query failed: ".mysqli_stmt_error());
		mysqli_stmt_bind_param($stmt, "sii", $status, $to, $from);
		mysqli_stmt_execute($stmt) or die("Query Execution failed: ".mysqli_stmt_error());

		echo mysqli_stmt_affected_rows($stmt);
	}
	updateSearchDomain($from);

	mysqli_close($conn);
?>