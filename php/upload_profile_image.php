<?php
	//echo json_encode($_SERVER);
	//echo json_encode($_FILES);
	$uid = $_REQUEST["uid"];

	if(isset($_FILES["profile-image"]) && $_FILES["profile-image"]["error"] == 0)
	{
			
		$extension = pathinfo($_FILES["profile-image"]["name"], PATHINFO_EXTENSION);
		$destination = $_SERVER["DOCUMENT_ROOT"]."/images/profile_images/".$uid."_pi.".$extension;
		
		if(file_exists($destination)) unlink($destination);

		if(move_uploaded_file($_FILES["profile-image"]["tmp_name"], $destination))
			echo "\nProfile Image uploaded : ".$destination;
	}
?>