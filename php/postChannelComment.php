<?php
	include "libs/db_util.php";

	$conn = connect("127.0.0.1", "5000", "root", "");
	
	$comment = $_POST["comment"];

	$query = "Insert into channel_comments (channel_id, commentor_id, comment) values(?, ?, ?)";
	$stmt = mysqli_prepare($conn, $query) or die("Query Prepare failed: ".mysqli_error($conn));
	mysqli_stmt_bind_param($stmt, "sis", $comment["ch_id"], $comment["c_id"], $comment["c"]);
	mysqli_stmt_execute($stmt);

	if(mysqli_stmt_affected_rows($stmt) == 1)
		echo "comment posted";
	else 
		echo "error";

	mysqli_close($conn)
?>