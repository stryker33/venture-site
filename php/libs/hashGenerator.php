<?php

	function generateHash($pass, $key, $salt)
	{
		$finalAsciiOdd = 0;
		$finalAsciiEven = 0;

		for($i = 0; $i < strlen($key); $i++)
		{
			if($i % 2 == 0)
				$finalAsciiEven += ord($key[$i]);
			else
				$finalAsciiOdd += ord($key[$i]);
		}

		$finalAscii = $finalAsciiOdd + $finalAsciiEven;
		$finalBinaryAscii = decbin($finalAscii);

		$hash = $key;
		for($i = 0; $i < strlen($finalBinaryAscii); $i++)
		{
			if($finalBinaryAscii[$i] == "1")
				$hash = sha1($hash);
			else if($finalBinaryAscii[$i] == "0")
				$hash = md5($hash);
		}

		$finalHash = sha1($pass.sha1($hash.sha1($salt)));

		return $finalHash;
	}
?>