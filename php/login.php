<?php
	include "libs/hashGenerator.php";
	session_start();
	
	$conn = mysqli_connect("127.0.0.1", "root", "", "venture", "5000") or die("Unable to connect to MySQL Server");
	mysqli_set_charset($conn, "utf8");
	
	$memcached = new Memcached();
	$memcached->addServer("127.0.0.1", "11211");
	
	$emailid = $_POST["emailid"];
	$password = $_POST["password"];
	
	$query = "Select uid, first_name, last_name, password, gender, dob, current_home, hometown from user where emailid='$emailid'";
	echo $query;
	
	$result = mysqli_query($conn, $query) or die("Query Execution failed : ".mysqli_error());
	$row = mysqli_fetch_array($result, MYSQL_ASSOC);
	
	if(count($row) == 0)
	{
		header("Location: https://localhost/index.php?action=login&r=invalidUser");
		exit();
	}
	else 
	{
		$passwordHash = generateHash($password, $emailid, $row["first_name"]." ".$row["dob"]);
		if($passwordHash != $row["password"])
		{
			header("Location: https://localhost/index.php?action=login&r=invalidPassword&emailid=$emailid");
			exit();	
		}
		else
		{
			//unset($row["password"]);
			//$key = md5("Select first_name, last_name, gender, current_home, hometown from user where uid=".$row["uid"]);
			//$memcached->set($key, $row, 600);
			header("Location: https://localhost/home.php?uid=".$row["uid"]);
		}
	}
?>