<?php session_start();
$access_key = session_id();
 ?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta name="viewport" content="width=device-width; initial-scale=1.0" />

		<title>Contineo</title>

		<!-- <link href='http://fonts.googleapis.com/css?family=Ubuntu:400,500,700' rel='stylesheet' type='text/css'> -->
		<script type="text/javascript" src="/assets/js/jquery-1.9.1.min.js" ></script>
		<script type="text/javascript" src="/assets/js/jquery.ui.core.min.js" ></script>
		<script type="text/javascript" src="/assets/js/jquery.ui.datepicker.min.js" ></script>
		<script type="text/javascript" src="/assets/js/jquery-ui.min.js" ></script>
		<script type="text/javascript" src="/assets/js/jquery.fileupload.js"  ></script>
		<script type="text/javascript" src="/assets/js/recaptcha_ajax.js" ></script>
		<script type="text/javascript" src="/assets/js/html5-ie.js"  ></script>
		<link href="/assets/css/jquery-ui.min.css" rel="stylesheet" type="text/css" >

		<link href="/css/index.css" rel="stylesheet" type="text/css" >
		<link href="/css/common-elements.css" rel="stylesheet" type="text/css" >
		<script src="/js/index.js" type="text/javascript" ></script>
		<script src="/js/common-js.js" type="text/javascript" ></script>
	</head>

	<body>
		<input id="get-action" type="hidden" value=<?php echo $_GET["action"]?>/>
		<input id="get-response" type="hidden" value=<?php echo $_GET["r"]?>/>
		<input id="get-emailid" type="hidden" value=<?php echo $_GET["emailid"]?>/>
		<div class="wrapper" >
			<section id="banner-section" >
				<div id="banner-container" class="section-container" >
					<div id="banner-text-container" >
						<div id="welcome-text" class="banner-text" >
							Welcome to
						</div>
						<div id="logo" class="banner-text" >
							contineo
						</div>
						<div id="tagline-text" class="banner-text" >
							Project your World
						</div>
					</div>
				</div>
			</section>
			<section id="action-bar-section" >
				<div id="action-bar-container" >
					<div id="action-register-container" class="action-container" >
						<div class="action-text-container">
							<div class="action-text" >
								Get Started
							</div>
							<div class="action-desc" >
								Create your account
							</div>
						</div>
					</div>
					<div id="action-login-container" class="action-container" >
						<div class="action-text-container" >
							<div class="action-text" >
								Sign In
							</div>
							<div class="action-desc" >
								Login to your account
							</div>
						</div>
					</div>
				</div>
			</section>
			<section id="login-section" >
				<div id="login-container" class="dialog-container" >
					<div id="login-container-header" class="dialog-container-header" >
						<div id="login-container-header-text" class="dialog-container-header-text" >
							Sign In
						</div>
					</div>
					<div id="login-container-content" class="dialog-container-content" >
						<div id="login-emailid-container" class="textbox-container" >
							<input id="login-emailid" class="textbox" type="text" placeholder="Email ID" title="Enter your Email ID" tabindex="1" />
						</div>
						<div id="login-password-container" class="textbox-container" >
							<input id="login-password" class="textbox" type="password" placeholder="Password" title="Enter your password" tabindex="2" />
						</div>
						<a id="link-forgot-password" class="url-link" title="Recover your password" tabindex="4" >Forgot Password ?</a>
						<button id="btn-login" class="button" type="button" title="Login to your account" tabindex="3" >
							Sign In
						</button>
						<span id="login-error" class="error-span"></span>
						<a id="link-create-account" class="url-link" title="Register" tabindex="5" >Create new account</a>
					</div>
				</div>
			</section>
			<section id="register-section" >
				<div id="get-started-container" class="dialog-container" >
					<div id="get-started-container-header" class="dialog-container-header" >
						<div id="get-started-container-header-text" class="dialog-container-header-text" >
							Get Started
						</div>
					</div>

					<!-- Account Details -->
					<div id="account-details-container-content" class="dialog-container-content" >
						<div id="first-name-container" class="textbox-container" >
							<input id="first-name" class="textbox" type="text" placeholder="First Name" title="Enter your First Name" tabindex="1" />
						</div>
						<div id="last-name-container" class="textbox-container" >
							<input id="last-name" class="textbox" type="text" placeholder="Last Name" title="Enter your Last Name" tabindex="2" />
						</div>
						<span id="name-error" class="error-span"></span>
						<div id="dob-container" class="textbox-container" >
							<input id="dob" class="textbox restrict" type="text" placeholder="Date of Birth" title="Select your Date of Birth" tabindex="3" />
						</div>
						<span id="dob-error" class="error-span"></span>
						<div id="gender-container" class="radiogroup-container" >
							<div id="gender-male-container" class="radio-button-container" >
								<input id="male" class="radio-button" type="radio" name="gender" value="Male" title="Male" tabindex="4" />
								<div class="radio-button-value-container" >
									Male
								</div>
							</div>
							<div id="gender-female-container" class="radio-button-container" >
								<input id="female" class="radio-button" type="radio" name="gender" value="Female" title="Female" tabindex="5" />
								<div class="radio-button-value-container" >
									Female
								</div>
							</div>
						</div>
						<span id="gender-error" class="error-span"></span>
						<div id="emailid-container" class="textbox-container" >
							<input id="emailid" class="textbox" type="text" placeholder="Email ID" title="Enter your Email ID" tabindex="6" />
						</div>
						<span id="emailid-error" class="error-span"></span>
						<div id="confirm-emailid-container" class="textbox-container" >
							<input id="confirm-emailid" class="textbox" type="text" placeholder="Re-enter Email ID" title="Re-enter your Email ID for confirmation" tabindex="7" />
						</div>
						<span id="emailid-confirm-error" class="error-span"></span>
						<div id="password-container" class="textbox-container" >
							<input id="password" class="textbox" type="password" placeholder="Password" title="Enter your Password" tabindex="8" />
						</div>
						<span id="password-error" class="error-span"></span>
						<div id="confirm-password-container" class="textbox-container" >
							<input id="confirm-password" class="textbox" type="password" placeholder="Confirm Password" title="Re-enter Password for confirmation" tabindex="9" />
						</div>
						<span id="password-confirm-error" class="error-span"></span>
						<button id="btn-account-details-next" class="button" type="button" title="Proceed to next step" tabindex="10" >
							Next
						</button>
						<a id="link-login" class="url-link" title="Login to an existing account" tabindex="11">Already have an account ?</a>
					</div>

					<!-- Personal Description -->
					<div id="personal-desc-container-content" class="dialog-container-content" >
						<input id="profile-image-selector" type="file" name="profile-image" style="display: none;" />
						<div id="preview-image-container">
							<img id="preview-image" />
							<div id="upload-prompt" title="Click to select Profile Image" >
								<div id="upload-prompt-text" >
									Upload Profile Image
								</div>
							</div>
						</div>
						<div id="current-home-container" class="textbox-container" >
							<input id="current-home" class="textbox" type="text" placeholder="Current Home" title="Enter the place currently residing at" tabindex="1" />
						</div>
						<div id="hometown-container" class="textbox-container" >
							<input id="hometown" class="textbox" type="text" placeholder="Hometown" title="Enter your Hometown" tabindex="2" />
						</div>
						<span id="personal-desc-error" class="error-span"></span>
						<button id="btn-personal-desc-next" class="button" type="button" title="Proceed to next step" tabindex="3" >
							Next
						</button>
					</div>

					<!-- Connection Details -->
					<div id="conn-details-container-content" class="dialog-container-content" >
						<div id="education-header" >
							Education
						</div>
						<button id="btn-add-edu-desc" class="button" type="button" title="Add Education Description" >
							Add
						</button>
						<div class="edu-desc-container" >
							<div class="institute-name-container textbox-container" >
								<input class="institute-name textbox alpha cap" type="text" placeholder="Institute Name" title="Enter your School Name" tabindex="1" />
							</div>
							<div class="inst-from-container textbox-container" >
								<input class="inst-from textbox restrict" type="text" placeholder="From" tabindex="2" />
							</div>
							<div class="inst-to-container textbox-container" >
								<input class="inst-to textbox restrict" type="text" placeholder="To" tabindex="3" />
							</div>
						</div>

						<hr style="top: 43%;" class="separator" >

						<div id="work-header" >
							Work
						</div>
						<button id="btn-add-work-desc" class="button" type="button" title="Add Workplace" >
							Add
						</button>
						<div class="work-desc-container" >
							<div class="designation-container textbox-container" >
								<input class="designation textbox alpha cap" type="text" placeholder="Designation" title="Enter your designation at the work place" tabindex="10" />
							</div>
							<div class="workplace-container textbox-container" >
								<input class="workplace textbox alpha cap" type="text" placeholder="Work Place" title="Enter the name of the work place" tabindex="11" />
							</div>
							<div class="work-from-container textbox-container" >
								<input class="work-from textbox restrict" type="text" placeholder="From" tabindex="12" />
							</div>
							<div class="work-to-container textbox-container" >
								<input class="work-to textbox restrict" type="text" placeholder="To" tabindex="13" />
							</div>
						</div>
						<button id="btn-next-conn-details" class="button" type="button" title="Proceed to next step" tabindex="14" >
							Next
						</button>
					</div>

					<!-- Confirmation -->
					<div id="conf-container-content" class="dialog-container-content" >
						<div id="email-conf-text-1" >
							An email has been sent to
						</div>
						<div id="email-conf-text-2" >
							Please, enter the passcode mentioned in the email to confirm your email account.
						</div>
						<div id="passcode-container" class="textbox-container" >
							<input id="passcode" class="textbox" type="text" placeholder="Passcode" title="Enter the passcode provided in the confirmation email" tabindex="1" />
						</div>
						<span id="passcode-error" class="error-span"></span>
						<div id="captcha-container"></div>
						<button id="btn-submit-captcha" class="button" type="button" title="Click to submit the captcha" tabindex="2" >
							Submit captcha
						</button>
						<button id="btn-finish" class="button" type="button" title="Click to proceed to your account" tabindex="3">
							Finish
						</button>
					</div>
				</div>
			</section>
		</div>
	</body>
</html>
