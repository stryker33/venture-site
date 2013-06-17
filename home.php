<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

		<title>Contineo</title>

		<meta name="viewport" content="width=device-width; initial-scale=1.0" />

		<script type="text/javascript" src="/assets/js/jquery-1.9.1.min.js" ></script>
		<script type="text/javascript" src="/assets/js/jquery.ui.core.min.js" ></script>
		<script type="text/javascript" src="/assets/js/jquery-ui.min.js" ></script>
		<script type="text/javascript" src="/assets/js/jquery.ui.datepicker.min.js" ></script>
		<script type="text/javascript" src="/assets/js/bootstrap.min.js" ></script>
		<script src="/assets/js/autobahn.min.js"></script>
		<script type="text/javascript" src="/assets/js/jquery.fileupload.js"  ></script>

		<link href="/assets/css/jquery-ui.min.css" rel="stylesheet" type="text/css" >
		<link href="/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" >

		<link href="/css/common-elements.css" rel="stylesheet" type="text/css" >

		<script type="text/javascript" src="/js/home-base.js" ></script>
		<script type="text/javascript" src="/js/common-js.js" ></script>
		<script type="text/javascript" src="/js/nav-menu-base.js" ></script>
		<script type="text/javascript" src="/js/home-content.js" ></script>
		<script type="text/javascript" src="/js/search-content.js" ></script>
		<script type="text/javascript" src="/js/profile-content.js" ></script>
		<script type="text/javascript" src="/js/edit-profile-content.js" ></script>
		<script type="text/javascript" src="/js/connection-requests-content.js" ></script>
		<script type="text/javascript" src="/js/connections-content.js" ></script>
		<script src="/js/ws-message-handler.js" type="text/javascript" ></script>
		<link href="/css/home-base.css" rel="stylesheet" type="text/css" >
		<link href="/css/home-content.css" rel="stylesheet" type="text/css" >
		<link href="/css/edit-profile-content.css" rel="stylesheet" type="text/css" >
		<link href="/css/user-container.css" rel="stylesheet" type="text/css" >
		<link href="/css/profile-content.css" rel="stylesheet" type="text/css" >
		<link href="/css/connections-content.css" rel="stylesheet" type="text/css" >
	</head>

	<body>
		<input type="hidden" id="get-uid" value="<?php echo $_GET["uid"]; ?>" />
		<div class="wrapper" >
			<section>
				<div id="banner-container" >
					<div id="logo-container">contineo</div>
					<div id="content-desc-header">Home</div>
					<div id="user-info-container" >
						<!-- <div id="user-profile-image-container" ><img id="user-profile-image" /></div> -->
						<div id="username"></div>
					</div>
					<div class="textbox-container" id="search-box-container" style="background: transparent; border: 0px !important;">
						<input class="textbox" id="search-box" type="text" placeholder="Search Profiles and Channels" style="box-shadow: none !important; background: transparent;" />
					</div>
				</div>
			</section>
			<section>
				<div id="navbar-container" >
					<div id="nav-container" >
						<div class="access-controls-container" >
							<div id="back-control-container" ><i class="icon-arrow-left icon-white"></i></div>
							<div id="sub-menu-header" ></div>
							<div id="main-menu-control-container" ><i class="icon-list icon-white"></i></div>
						</div>
						<div class="nav-menu-container-active" id="main-menu" >
							<div class="nav-menu">
								<div class="nav-menu-element-active" id="home-tab" ><i class="icon-home icon-white" ></i> Home</div>
								<div class="nav-menu-element" id="profile-tab" ><i class="icon-user icon-white" ></i> Profile</div>
								<div class="nav-menu-element" id="connections-tab" ><!-- <div class="notification-count" >10</div> --><i class="icon-star icon-white" ></i> Connections</div>
								<div class="nav-menu-element" id="channels-tab" ><i class="icon-film icon-white" ></i> Channels</div>
								<div class="nav-menu-element" id="settings-tab" ><i class="icon-wrench icon-white" ></i> Settings</div>
							</div>
						</div>
						<div class="nav-menu-container sub-menu" id="profile-sub-menu" >
							<div class="nav-menu">
								<div class="nav-menu-element" >Edit Profile</div>
							</div>
						</div>
						<div class="nav-menu-container sub-menu" id="connections-sub-menu" >
							<div class="nav-menu">
								<div class="nav-menu-element" id="connection-requests-tab" >Connection Requests</div>
							</div>
						</div>
						<div class="nav-menu-container sub-menu" id="channels-sub-menu" >
							<div class="nav-menu">
								<div class="nav-menu-element-active" >Item 1</div>
								<div class="nav-menu-element" >Item 2</div>
								<div class="nav-menu-element" >Item 3</div>
								<div class="nav-menu-element" >Item 4</div>
								<div class="nav-menu-element" >Item 5</div>
								<div class="nav-menu-element" >Item 5</div>
								<div class="nav-menu-element" >Item 5</div>
								<div class="nav-menu-element" >Item 5</div>
								<div class="nav-menu-element" >Item 5</div>
								<div class="nav-menu-element" >Item 5</div>
								<div class="nav-menu-element" >Item 5</div>
								<div class="nav-menu-element" >Item 5</div>
								<div class="nav-menu-element" >Item 5</div>
								<div class="nav-menu-element" >Item 5</div>
							</div>
						</div>
					<div>
				</div>
			</section> 
			<section>
				<div id="content-container-wrapper">
					<!-- Home Content -->
					<div class="content-container-active" id="home-content" >
					</div>
					
					<!-- Profile Content -->
					<div class="content-container" id="profile-content" >
						<div id="profile-banner-container" >
							<div id="profile-image-container" >
							</div>
							<div id="profile-info-container" >
								<div id="name-info-container" ></div>
								<div id="dob-info-container" ></div>
								<!-- <div id="gender-info-container" ></div> -->
								<div id="current-place-info-container"></div>
								<div id="from-info-container"></div>
							</div>
							<div id="edu-info-container" >
								<div id="edu-info-header">Education</div>
								<hr class="horizontal-divider" >
								<!-- <div class="edu-desc-info-container" ></div> -->
							</div>
							<div id="work-info-container" >
								<div id="work-info-header" >Work</div>
								<hr class="horizontal-divider" >
								<!-- <div class="work-desc-info-container" ></div> -->
							</div>
						</div>
					</div>

					<div class="content-container" id="edit-profile-content" >
						<div id="ep-image-container" >
							<div id="ep-change-image-container"><span>Change Profile Image</span></div>
							<input id="ep-profile-image-selector" type="file" name="profile-image" style="display: none;" />
						</div>
						<div id="ep-personal-info-container" >
							<div class= "ep-info-header" >Personal Information</div>
							<hr class="horizontal-divider" style="margin-top: 0px;" >
							<table>
								<tr>
									<td><span class="ep-field-name" >First Name : </span></td>
									<td><span class="ep-field-name" id="ep-first-name" >Sagar</span></td>
								</tr>
								<tr>
									<td><span class="ep-field-name" >Last Name : </span></td>
									<td><span class="ep-field-name" id="ep-last-name" >Jadhav</span></td>
								</tr>
								<tr>
									<td><span class="ep-field-name" >Gender : </span></td>
									<td><span class="ep-field-name" id="ep-gender" >Male</span></td>
								</tr>
								<tr>
									<td><span class="ep-field-name" >Date of Birth : </span></td>
									<td><span class="ep-field-name" id="ep-dob" >3 January, 1991</span></td>
								</tr>
								<tr>
									<td><span class="ep-field-name" >Current Home : </span></td>
									<td><span class="ep-field-name" id="ep-current-home" >Palo Alto, California, US</span></td>
								</tr>
								<tr>
									<td><span class="ep-field-name" >Hometown : </span></td>
									<td><span class="ep-field-name" id="ep-hometown" >Pune, Maharashtra, IN</span></td>
								</tr>
							</table>
						</div>
						<div id="ep-edu-info-container" >
							<div class="ep-info-header" >Educational Information</div>
							<button class="btn btn-mini btn-ep-add-info" id="btn-ep-edu-info-add" type="button" >Add Educational Information</button>
							<hr class="horizontal-divider" style="margin-top: 0px;" >
							<!-- <div class="ep-desc-info-container" >
								<table>
									<tr>
										<td><span class="ep-field-name" >Institute Name : </span></td>
										<td><span class="ep-field-name ep-institute-name" >University of Pune</span></td>
									</tr>
									<tr>
										<td><span class="ep-field-name" >From : </span></td>
										<td><span class="ep-field-name ep-edu-from" >31 August, 2008</span></td>
										<td><span class="ep-field-name" >To : </span></td>
										<td><span class="ep-field-name ep-edu-to" >16 June, 2012</span></td>
									</tr>
								</table>
								<button class="btn btn-mini btn-ep-remove-info" >Remove</button>
							</div> -->
						</div>
						<div id="ep-work-info-container" >
							<div class="ep-info-header" >Work Information</div>
							<button class="btn btn-mini btn-ep-add-info" id="btn-ep-work-info-add" type="button" >Add Work Information</button>
							<hr class="horizontal-divider" style="margin-top: 0px;" >
							<!--<div class="ep-desc-info-container" >
								<table>
									<tr>
										<td><span class="ep-field-name" >Work Designation : </span></td>
										<td><span class="ep-field-name ep-work-designation" >Engineering Head</span></td>
									</tr>
									<tr>
										<td><span class="ep-field-name" >Work Place Name : </span></td>
										<td><span class="ep-field-name ep-work-place-name" >DevOps</span></td>
									</tr>
									<tr>
										<td><span class="ep-field-name" >From : </span></td>
										<td><span class="ep-field-name ep-work-from" >01 July, 2012</span></td>
										<td><span class="ep-field-name" >To : </span></td>
										<td><span class="ep-field-name ep-work-to" >31 March, 2013</span></td>
									</tr>
								</table>
							</div>-->
						</div>
						<div id="ep-contact-info-container" >
							<div class="ep-info-header" >Contact Information</div>
							<hr class="horizontal-divider" style="margin-top: 0px;" >
							<div class="ep-desc-info-container" >
								<table>
									<tr>
										<td><span class="ep-field-name" >Email ID : </span></td>
										<td><span class="ep-field-name" id="ep-email-id" >sjstryker77@gmail.com</span></td>
									</tr>
									<tr>
										<td><span class="ep-field-name" >Identifier URL : </span></td>
										<td><span class="ep-field-name" id="ep-id-url" >Sagar.Jadhav.03</span></td>
									</tr>
								</table>
							</div>
						</div>
						<div class="alert alert-error" id="ep-email-id-error" ><span>Invalid Email ID</span></div>
						<button class="btn btn-small" id="btn-ep-save-changes" disabled="disabled" >Save Changes</button>
					</div>

					<!-- Connections Content -->
					<div class="content-container" id="connections-content" >
						<div class="filters-container">
							<div class="search-container" id="search-connections-container">
								<div class="textbox-container" id="search-connections-text-container">
									<input class="textbox" id="search-connections" type="text" placeholder="Search Connections" />
								</div>
								<div class="search-icon-container"><i class="icon-search" ></i></div>
							</div>
						</div>
					</div>

					<!-- Connections Requests Content -->
					<div class="content-container" id="connection-requests-content" >
						<div class="filters-container">
							<div class="search-container" id="search-connection-requests-container">
								<div class="textbox-container" id="search-connection-requests-text-container">
									<input class="textbox" id="search-connection-requests" type="text" placeholder="Search Connection Requests" />
								</div>
								<div class="search-icon-container"><i class="icon-search" ></i></div>
							</div>
						</div>
						<!-- <div class="user-container cr-user-container" >
							<div class="uc-profile-image-container cr-profile-image-container" >
							</div>
							<div class="uc-user-info-container cr-user-info-container" >
								<div class="uc-user-name-container cr-user-name-container" >Fernando Alonso</div>
								<div class="uc-user-dob-container cr-user-dob-container" >3 January 1991</div>
								<div class="uc-user-current-home-container cr-user-current-home-container" >Currently at Montreal, Quebec, CA</div>
								<div class="uc-user-hometown-container cr-user-hometown-container" >From Barcelona, Catalonia, ES</div>
							</div>
							<div class="uc-edu-info-container cr-edu-info-container" >
								<div class="uc-edu-info-header cr-edu-info-header" >Education</div>
								<hr class="horizontal-divider">
								<div class="uc-edu-desc-container cr-edu-desc-container" >University of Pune</div>
							</div>
							<div class="uc-work-info-container cr-work-info-container" >
								<div class="uc-work-info-header cr-work-info-header" >Work</div>
								<hr class="horizontal-divider">
								<div class="uc-work-desc-container cr-work-desc-container" >Engineering Head at DevOps</div>
							</div>
							<div class="btn-group uc-user-btn-group cr-user-btn-group" >
								<button class="btn btn-small" title="Send Connection Request" >Accept Connection Request</button>
								<button class="btn btn-small dropdown-toggle" data-toggle="dropdown" ><span class="caret"></span></button>
								<ul class="dropdown-menu pull-right" >
									<li>Reject Connection Request</li>
									<li>Review Later</li>
								</ul>
							</div>
						</div> -->
					</div>

					<!-- Search Content-->
					<div class="content-container" id="search-content" >
						<!-- <div class="sc-user-container" >
							<div class="sc-profile-image-container" >
							</div>
							<div class="sc-user-info-container" >
								<div class="sc-user-name-container" >Fernando Alonso</div>
								<div class="sc-user-dob-container" >3 January 1991</div>
								<div class="sc-user-current-home-container" >Currently at Montreal, Quebec, CA</div>
								<div class="sc-user-hometown-container" >From Barcelona, Catalonia, ES</div>
							</div>
							<div class="sc-edu-info-container" >
								<div class="sc-edu-info-header" >Education</div>
								<hr class="horizontal-divider">
								<div class="sc-edu-desc-container" >University of Pune</div>
							</div>
							<div class="sc-work-info-container" >
								<div class="sc-work-info-header" >Work</div>
								<hr class="horizontal-divider">
								<div class="sc-work-desc-container" >Engineering Head at DevOps</div>
							</div>
							<div class="btn-group sc-user-btn-group" >
								<button class="btn" title="Send Connection Request" >Connect</button>
								<button class="btn dropdown-toggle" data-toggle="dropdown" ><span class="caret"></span></button>
								<ul class="dropdown-menu" >
									<li>View Profile</li>
									<li>Block</li>
								</ul>
							</div>
						</div> -->
					</div>

				</div>
			</section>
		</div>
	</body>
</html>
 
