	<?php
	include "libs/db_util.php";

	$uid = $_GET["uid"];
	$query = $_GET["q"];

	$searchResult = array();
	$searchDomain = getSearchDomain($uid);
	foreach($searchDomain as $searchUser)
	{
		if(stristr($searchUser["first_name"]." ".$searchUser["last_name"], $query) || stristr($searchUser["last_name"]." ".$searchUser["first_name"], $query))
			$searchResult[] = $searchUser;
	}

	echo json_encode($searchResult);
?>