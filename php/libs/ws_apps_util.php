<?php
	
	$notificationServer = "tcp://localhost:5555";

	function sendConnRequestNotification($to, $from)
	{
		$connRequest = array();
		$connRequest["uid"] = $to;
		$connRequest["notificationType"] = "connRequest";
		$connRequest["from"]["user"] = getUserInfo($from);
		
		$context = new ZMQContext();
		$socket = $context->getSocket(ZMQ::SOCKET_PUSH, "connRequest");
		$socket->connect("tcp://localhost:5555");
		$socket->send(json_encode($connRequest));
	}
?>