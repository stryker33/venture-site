<?php
	include "libs/db_util.php";

	$conn = connect("127.0.0.1", "5000", "root", "");

	$liveBroadcastDetails = $_GET["lbd"];
	$invitationsList = $_GET["il"];
	$uid = $liveBroadcastDetails["channelOwnerUID"];
	$resourceID = "lb_".md5($uid.$liveBroadcastDetails["channelName"].$liveBroadcastDetails["broadcastTitle"]);

	$query1 = "Insert into videos values(?, ?, ?, ?, ?, ?, ?, ?)";
	$stmt = mysqli_prepare($conn, $query1) or die("Query (query1) Prepare failed: ".mysqli_error($conn));
	mysqli_stmt_bind_param($stmt, "sissssss", $resourceID, $liveBroadcastDetails["channelOwnerUID"], $liveBroadcastDetails["channelName"], 
		$liveBroadcastDetails["broadcastTitle"], $liveBroadcastDetails["broadcastVisibility"], $liveBroadcastDetails["broadcastDesc"],
		$liveBroadcastDetails["videoType"], $liveBroadcastDetails["broadcastMedium"]);
	mysqli_stmt_execute($stmt) or die("Query (query1) Execution Failed: ".mysqli_error($conn));
	
	foreach($invitationsList["invitees"] as $index => $invitee)
	{
		$query2 = "Insert into invitations(from_uid, to_uid, for_resource) values(?, ?, ?)";
		$stmt = mysqli_prepare($conn, $query2) or die("Query (query2) Prepare failed: ".mysqli_error($conn));
		mysqli_stmt_bind_param($stmt, "iis", $uid, intval($invitee), $resourceID);
		mysqli_stmt_execute($stmt) or die("Query (query1) Execution Failed: ".mysqli_error($conn));	
	}

	$response = array();
	$response["message"] = "broadcast_created";
	$response["rid"] = $resourceID;
	
	echo json_encode($response);

	mysqli_close($conn);
?>