<?php
	include "libs/db_util.php";

	$uid = $_GET["uid"];

	echo json_encode(getConnectionGroups($uid));
?>