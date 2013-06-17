<?php
	session_start();
	
	$memcached = new Memcached();
	$memcached->addServer("127.0.0.1", "11211");
	
	$confCode = $_POST["confirmationCode"];
	$key = $_SERVER["REMOTE_ADDR"].":".$_SERVER["REMOTE_PORT"].session_id();
	$confirmationCode = $memcached->get(md5($key));

	if($confCode == $confirmationCode)
		echo "accepted";
	else
		echo "rejected";
?>