<?php
  require_once($_SERVER["DOCUMENT_ROOT"].'/assets/php/recaptchalib.php');
  $privatekey = "6LflDeESAAAAAH042_S1FUhnDRwEDcKKEKUS4jR6";
  $resp = recaptcha_check_answer ($privatekey,
                                $_SERVER["REMOTE_ADDR"],
                                $_POST["recaptcha_challenge_field"],
                                $_POST["recaptcha_response_field"]);


  if (!$resp->is_valid)
	echo "rejected";
  else
	echo "accepted";
?>
