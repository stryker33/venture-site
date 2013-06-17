<?php
	// Script to register user
	
	include "libs/hashGenerator.php";

 	// Init connection to mysql-cluster
 	$conn = mysqli_connect("127.0.0.1", "root", "", "venture", "5000") or die("Unable to connect to the mysql server");
	mysqli_set_charset($conn, 'utf8');
	
	$user = $_POST["user"];
	
	// Format date
	//$user["dob"] = date_create_from_format("d M Y", $user["dob"]);
	//$user["dob"] = date_format($user["dob"], "Y-m-d");
	
	$passwordHash = generateHash($user["password"], $user["emailid"], $user["first_name"]." ".$user["dob"]);

	// print_r($user);
	$query1 = "Insert into user(emailid, password, first_name, last_name, dob, gender, current_home, hometown) 
			  values (?, ?, ?, ?, ? ,? , ?, ?)";
	$query2 = "Insert into edu_desc values (?, ?, ?, ?)";
	$query3 = "Insert into work_desc values (?, ?, ?, ?, ?)";
	$query4 = "Select uid, profile_image, first_name, last_name from user where emailid = '".$user['emailid']."'";
	// echo $query4."\n";
	
	// Insert into user
	$stmt = mysqli_prepare($conn, $query1) or die("Prepare Query(query1) failed : ".mysqli_stmt_error());
	mysqli_stmt_bind_param($stmt, "ssssssss", $user["emailid"], $passwordHash, $user["first_name"], $user["last_name"], 
						   $user["dob"], $user["gender"], $user["current_home"], $user["hometown"]);
	
	mysqli_stmt_execute($stmt) or die("Statement(query1) Execution failed : ".mysqli_stmt_error($stmt));
	
	if(mysqli_stmt_affected_rows($stmt) == 1)
	{
		$result = mysqli_query($conn, $query4) or die("Query Execution(query4) failed : ".mysqli_error());
		$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
	}
	// print_r($row)."\n";

	// Insert into edu_desc
	$stmt = mysqli_prepare($conn, $query2) or die("Prepare Query(query2) failed : ".mysqli_stmt_error($stmt));
	foreach($user["edu_desc"] as $edu_desc)
	{
		// Format dates
		//$edu_desc["inst_from"] = date_create_from_format("M Y", $edu_desc["inst_from"]);
		//$edu_desc["inst_from"] = date_format($edu_desc["inst_from"], "Y-m-01");
		//$edu_desc["inst_to"] = date_create_from_format("M Y", $edu_desc["inst_to"]);
		//$edu_desc["inst_to"] = date_format($edu_desc["inst_to"], "Y-m-01");
		// print_r($edu_desc)."\n";
		
		mysqli_stmt_bind_param($stmt, "isss", $row["uid"], $edu_desc["institute_name"], $edu_desc["inst_from"], $edu_desc["inst_to"]);
		mysqli_stmt_execute($stmt) or die("Statement(query2) Execution failed : ".mysqli_stmt_error($stmt));
		// echo "edu_desc : ".mysqli_stmt_affected_rows($stmt)."\n";
	}
	
	// Insert into work_desc
	$stmt = mysqli_prepare($conn, $query3) or die("Prepare Query(query3) failed : ".mysqli_stmt_error($stmt)." ".mysqli_error($conn));
	foreach($user["work_desc"] as $work_desc)
	{
		// Format dates
		//$work_desc["work_from"] = date_create_from_format("M Y", $work_desc["work_from"]);
		//$work_desc["work_from"] = date_format($work_desc["work_from"], "Y-m-01");
		//$work_desc["work_to"] = date_create_from_format("M Y", $work_desc["work_to"]);
		//$work_desc["work_to"] = date_format($work_desc["work_to"], "Y-m-01");
		
		mysqli_stmt_bind_param($stmt, "issss", $row["uid"], $work_desc["designation"], $work_desc["workplace"], $work_desc["work_from"], $work_desc["work_to"]);
		mysqli_stmt_execute($stmt) or die("Statement(query3) Execution failed : ".mysqli_stmt_error($stmt));
		//echo "work_desc : ".mysqli_stmt_affected_rows($stmt)."\n";
	}
	
	echo json_encode($row);
	
	mysqli_stmt_close($stmt);
	
	mysqli_close($conn);
?>