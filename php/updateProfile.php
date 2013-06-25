<?php
	require "libs/db_util.php";

	$conn = connect("127.0.0.1", "5000", "root", "");

	$uid = $_POST["uid"];
	$newUserInfo = $_POST["nui"];
	$oldUserInfo = getUserInfo($uid);

	if(!isset($newUserInfo))
		exit;

	// Update user table
	$userUpdateQuery = "Update user set ";
	$userBindTypeString = "";
	$userBinds = array();

	if(isset($newUserInfo["user"]["first_name"]))
	{
		if($newUserInfo["user"]["first_name"] != $oldUserInfo["user"]["first_name"])
		{
			$userUpdateQuery = $userUpdateQuery."first_name = ?";
			$userBindTypeString = $userBindTypeString."s";
			$userBinds[] = &$newUserInfo["user"]["first_name"];
		}
	}

	if(isset($newUserInfo["user"]["last_name"]))
	{
		if($newUserInfo["user"]["last_name"] != $oldUserInfo["user"]["last_name"])
		{
			$userUpdateQuery = $userUpdateQuery.", last_name = ?";
			$userBindTypeString = $userBindTypeString."s";
			$userBinds[] = &$newUserInfo["user"]["last_name"];
		}
	}

	if(isset($newUserInfo["user"]["gender"]))
	{
		if($newUserInfo["user"]["gender"] != $oldUserInfo["user"]["gender"])
		{
			$userUpdateQuery = $userUpdateQuery.", gender = ?";
			$userBindTypeString = $userBindTypeString."s";
			$userBinds[] = &$newUserInfo["user"]["gender"];
		}
	}

	if(isset($newUserInfo["user"]["dob"]))
	{
		if($newUserInfo["user"]["dob"] != $oldUserInfo["user"]["dob"])
		{
			$userUpdateQuery = $userUpdateQuery.", dob = ?";
			$userBindTypeString = $userBindTypeString."s";
			$userBinds[] = &$newUserInfo["user"]["dob"];
		}
	}

	if(isset($newUserInfo["user"]["current_home"]))
	{
		if($newUserInfo["user"]["current_home"] != $oldUserInfo["user"]["current_home"])
		{
			$userUpdateQuery = $userUpdateQuery.", current_home = ?";
			$userBindTypeString = $userBindTypeString."s";
			$userBinds[] = &$newUserInfo["user"]["current_home"];
		}
	}

	if(isset($newUserInfo["user"]["hometown"]))
	{
		if($newUserInfo["user"]["hometown"] != $oldUserInfo["user"]["hometown"])
		{
			$userUpdateQuery = $userUpdateQuery.", hometown = ?";
			$userBindTypeString = $userBindTypeString."s";
			$userBinds[] = &$newUserInfo["user"]["hometown"];
		}
	}

	$userUpdateQuery = $userUpdateQuery." where uid=?";
	$userBindTypeString = $userBindTypeString."i";
	$userBinds[] = &$uid;

	//echo $userUpdateQuery." ".$userBindTypeString." ".json_encode($userBinds);

	$user_update_stmt = mysqli_prepare($conn, $userUpdateQuery) or die("Query Prepare Failed(userUpdateQuery): ".$mysqli_stmt_error($user_update_stmt));
	call_user_func_array("mysqli_stmt_bind_param", array_merge(array($user_update_stmt, $userBindTypeString), $userBinds)) or die();
	mysqli_stmt_execute($user_update_stmt);

	//echo mysqli_stmt_affected_rows($user_update_stmt);

	// Update and insert new values in edu_desc table
	$eduDescUpdateQuery = "Update edu_desc set institute_name = ? where uid = ? and institute_name = ?";
	$eduDescUpdateBindTypeString = "sis";

	$eduDescInsertQuery = "Insert into edu_desc (uid, institute_name) values(?, ?)";
	$eduDescInsertBindTypeString = "is";

	$oldEduDesc = $oldUserInfo["edu_desc"];
	foreach($newUserInfo["edu_desc"] as $index => $newEduDesc)
	{
		if($newEduDesc["update_status"] == "changed")
		{
			$eduDescBinds = array();
			$eduDescBinds[] = &$newEduDesc["institute_name"];
			$eduDescBinds[] = &$uid;
			$eduDescBinds[] = &$oldEduDesc[$index]["institute_name"];

			$eduDescUpdateStmt = mysqli_prepare($conn, $eduDescUpdateQuery) or die("Query Prepare Failed(eduDescUpdateQuery): ".mysqli_stmt_error($eduDescUpdateStmt));
			call_user_func_array("mysqli_stmt_bind_param", array_merge(array($eduDescUpdateStmt, $eduDescUpdateBindTypeString), $eduDescBinds)) or die("Query Bind failed.");
			mysqli_stmt_execute($eduDescUpdateStmt);

			//echo "uid: ".$uid." changed: ".mysqli_stmt_affected_rows($eduDescUpdateStmt)." eduDescBinds: ".json_encode($eduDescBinds);
		}
		if($newEduDesc["update_status"] == "new")
		{
			$eduDescBinds = array();
			$eduDescBinds[] = &$uid;
			$eduDescBinds[] = &$newEduDesc["institute_name"];

			$eduDescInsertStmt = mysqli_prepare($conn, $eduDescInsertQuery) or die("Query Prepare Failed(eduDescUpdateQuery): ".mysqli_stmt_error($eduDescInsertStmt));
			call_user_func_array("mysqli_stmt_bind_param", array_merge(array($eduDescInsertStmt, $eduDescInsertBindTypeString), $eduDescBinds))  or die("Query Bind failed.");;
			mysqli_stmt_execute($eduDescInsertStmt);

			//echo "uid: ".$uid." new: ".mysqli_stmt_affected_rows($eduDescInsertStmt)." eduDescBinds: ".json_encode($eduDescBinds);
		}
	}

	// Update and insert new values in work_desc table
	$workDescUpdateQuery = "Update work_desc set work_designation = ?, work_place_name = ? where uid = ? and work_designation = ? and work_place_name = ?";
	$workDescUpdateBindTypeString = "ssiss";

	$workDescInsertQuery = "Insert into work_desc (uid, work_designation, work_place_name) values(?, ?, ?)";
	$workDescInsertBindTypeString = "iss";

	$oldWorkDesc = $oldUserInfo["work_desc"];
	foreach($newUserInfo["work_desc"] as $index => $newWorkDesc)
	{
		if($newWorkDesc["update_status"] == "changed")
		{
			$workDescBinds = array();
			$workDescBinds[] = &$newWorkDesc["work_designation"];
			$workDescBinds[] = &$newWorkDesc["work_place_name"];
			$workDescBinds[] = &$uid;
			$workDescBinds[] = &$oldWorkDesc[$index]["work_designation"];
			$workDescBinds[] = &$oldWorkDesc[$index]["work_place_name"];

			$workDescUpdateStmt = mysqli_prepare($conn, $workDescUpdateQuery);
			if(!$workDescUpdateQuery)
				 die("Query Prepare Failed(workDescUpdateQuery): ".mysqli_stmt_error($workDescUpdateStmt));
			call_user_func_array("mysqli_stmt_bind_param", array_merge(array($workDescUpdateStmt, $workDescUpdateBindTypeString), $workDescBinds)) or die("Query Bind failed.");
			mysqli_stmt_execute($workDescUpdateStmt);

			//echo "uid: ".$uid." changed: ".mysqli_stmt_affected_rows($workDescUpdateStmt)." eduDescBinds: ".json_encode($workDescBinds);
		}
		if($newWorkDesc["update_status"] == "new")
		{
			$workDescBinds = array();
			$workDescBinds[] = &$uid;
			$workDescBinds[] = &$newWorkDesc["work_designation"];
			$workDescBinds[] = &$newWorkDesc["work_place_name"];

			$workDescInsertStmt = mysqli_prepare($conn, $workDescInsertQuery) or die("Query Prepare Failed(workDescUpdateQuery): ".mysqli_stmt_error($workDescInsertStmt));
			call_user_func_array("mysqli_stmt_bind_param", array_merge(array($workDescInsertStmt, $workDescInsertBindTypeString), $workDescBinds))  or die("Query Bind failed.");;
			mysqli_stmt_execute($workDescInsertStmt);

			//echo "uid: ".$uid." new: ".mysqli_stmt_affected_rows($workDescInsertStmt)." eduDescBinds: ".json_encode($workDescBinds);
		}
	}

	updateUserInfo($uid);
	mysqli_close($conn);

	echo "updated";
?>