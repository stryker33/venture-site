<?php
	include "libs/db_util.php";

	$channel_id = $_GET["ch_id"];
	echo json_encode(getChannelComments($channel_id));	
?>