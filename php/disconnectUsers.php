<?php
	include "libs/db_util.php";

	$conn = connect("127.0.0.1", "5000", "root", "");

	$conn_user1 = $_POST["u1"]; // Disconnecting user
	$conn_user2 = $_POST["u2"];


	$query = "Delete from connections where (conn_user1 = ? and conn_user2 = ?) or (conn_user1 = ? and conn_user2 = ?)";
	$stmt = mysqli_prepare($conn, $query) or die("Prepare Query failed: ".mysqli_stmt_error());
	mysqli_stmt_bind_param($stmt, "iiii", $conn_user1, $conn_user2, $conn_user2, $conn_user1);
	mysqli_stmt_execute($stmt) or die("Query Execution failed: ".mysqli_stmt_error());

	updateSearchDomain($conn_user1);
	updateSearchDomain($conn_user2);
	updateConnections($conn_user1);
	updateConnections($conn_user2);
	
	echo mysqli_stmt_affected_rows($stmt);	 
?>