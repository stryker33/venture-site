<?php
	include "libs/db_util.php";

	$channel_id = $_GET["cid"];
	echo json_encode(getChannelInfo($channel_id));

?>