<?php
	require "libs/db_util.php";

	$uid = $_GET["uid"];
	$userConnections = getConnections($uid);

	echo json_encode($userConnections);
?>