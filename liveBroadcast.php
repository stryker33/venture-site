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
		<script type="text/javascript" src="/assets/js/jquery-migrate-1.0.0.js" ></script>
		<script type="text/javascript" src="/assets/js/jquery.tools.min.js" ></script>
		<script type="text/javascript" src="/assets/js/bootstrap.min.js" ></script>
		<script type="text/javascript" src="/assets/js/jquery.ajaxq-0.0.1.js" ></script>
		<script src="/assets/js/autobahn.min.js"></script>
		<script type="text/javascript" src="/assets/js/jquery.nicescroll.js"  ></script>

		<link href="/assets/css/ubuntu-font/ubuntu-font.css" rel="stylesheet" type="text/css" >
		<link href="/assets/css/jquery-ui.min.css" rel="stylesheet" type="text/css" >
		<link href="/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" >
		<link href="/css/common-elements.css" rel="stylesheet" type="text/css" >

		<script type="text/javascript" src="/js/home-util.js" ></script>
		<script type="text/javascript" src="/js/common-js.js" ></script>
		<script type="text/javascript" src="/js/broadcast-content.js" ></script>
		<link href="/css/home-base.css" rel="stylesheet" type="text/css" >
		<link href="/css/broadcast-content.css" rel="stylesheet" type="text/css" >
	</head>

	<body>
		<input type="hidden" id="get-uid" value="<?php echo $_GET["uid"]; ?>" />
		<input type="hidden" id="get-rid" value="<?php echo $_GET["rid"]; ?>" />
		<input type="hidden" id="get-bt" value="<?php echo $_GET["bt"]; ?>" />
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
								<div class="nav-menu-element" id="home-tab" ><i class="icon-home icon-white" ></i> Home</div>
								<div class="nav-menu-element" id="profile-tab" ><i class="icon-user icon-white" ></i> Profile</div>
								<div class="nav-menu-element" id="connections-tab" ><!-- <div class="notification-count" >10</div> --><i class="icon-star icon-white" ></i> Connections</div>
								<div class="nav-menu-element" id="channels-tab" ><i class="icon-film icon-white" ></i> Channels</div>
								<div class="nav-menu-element" id="settings-tab" ><i class="icon-wrench icon-white" ></i> Settings</div>
								<div class="nav-menu-element" id="settings-tab" ><i class="icon-globe icon-white" ></i> Notifications</div>
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
								<div class="nav-menu-element" id="connection-requests-tab" >Connection Groups</div>
							</div>
						</div>
						<div class="nav-menu-container sub-menu" id="channels-sub-menu" >
							<div class="nav-menu">
							</div>
						</div>
					<div>
				</div>
			</section> 
			<section>
				<div id="content-container-wrapper">
					<div class="alert" id="message-container" ></div> 

					<!-- Broadcast Content -->
					<div class="content-container" id="broadcast-content" style="display: block" >

					</div>
				</div>
			</section>
		</div>
	</body>
</html>