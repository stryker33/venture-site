<?php

	include "libs/hashGenerator.php";

	$password = $_GET["p"];
	$emailid = $_GET["e"];
	$firstName = $_GET["fn"];
	$dob = $_GET["dob"];

	$passwordHash = generateHash($password, $emailid, $firstName." ".$dob);
	echo $passwordHash;
?>