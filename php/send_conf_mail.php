<?php
	if(!$_SERVER["HTTP_X_REQUESTED_WITH"] == "XMLHttpRequest")
	{
		echo "Invalid Access";
		header("HTTP/1.1 403 Forbidden");
		die();
	}
		
	require_once($_SERVER["DOCUMENT_ROOT"]."/assets/php/swift_mailer/swift_required.php");
	
	session_start();
	
	$memcached = new Memcached();
	$memcached->addServer("127.0.0.1", "11211");
	
	$from = "sjstryker77@gmail.com";
	$fromName = "Sagar Jadhav";
	$to = $_POST["emailid"];
	
	// Generate Confirmation Code
	$confirmationCode = rand(10000, 99999);
	
	// Initialize swift mailer
	$transport = Swift_SmtpTransport::newInstance("smtp.gmail.com", 465, "ssl")
	->setUsername("sjstryker77@gmail.com")
	->setPassword("Stryker33");
	
	$mailer = Swift_Mailer::newInstance($transport);
	
	// Create message
	$message = Swift_Message::newInstance("Email Confirmation")
	->setFrom(array($from => $fromName))
	->setTo(array($to))
	->setBody("Confirmation Code : ".$confirmationCode);
	
	if($result = $mailer->send($message))
	{
		// Store the key and the corresponding confirmation code in memcached
		$key = $_SERVER["REMOTE_ADDR"].":".$_SERVER["REMOTE_PORT"].session_id();
		$memcached->set(md5($key), $confirmationCode, 300); 
		echo "Mail sent.";
	}
		
	else
		echo $result;
?>