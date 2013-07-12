<?php
	include "libs/db_util.php";
	include "libs/ws_apps_util.php";
	
	$conn = connect("127.0.0.1", "5000", "root", "");
	
	$comment = $_POST["comment"];

	$query = "Insert into channel_comments (channel_id, commentor_id, comment) values(?, ?, ?)";
	$stmt = mysqli_prepare($conn, $query) or die("Query Prepare failed: ".mysqli_error($conn));
	mysqli_stmt_bind_param($stmt, "sis", $comment["ch_id"], $comment["c_id"], $comment["c"]);
	mysqli_stmt_execute($stmt);

	if(mysqli_stmt_affected_rows($stmt) == 1)
	{
		echo "comment posted";
		updateChannelComments($comment["ch_id"]);
	}
	else 
		echo "error";

	$channelComment = array();
	$commentor = getUserInfo($comment["c_id"]);

	$channelComment["cid"] = $comment["ch_id"];
	$channelComment["commentor_id"] = $commentor["user"]["uid"];
	$channelComment["commentor_pi"] = $commentor["user"]["profile_image"];
	$channelComment["commentor_name"] = $commentor["user"]["first_name"]." ".$commentor["user"]["last_name"];
	$channelComment["comment"] = $comment["c"];
	
	$now = new DateTime("now", new DateTimeZone("UTC"));
	$current_ts = $now->format("Y-m-d H:i:s");
	$channelComment["comment_ts"] = $current_ts;

	sendChannelCommentNotification($channelComment);

	mysqli_close($conn)
?>