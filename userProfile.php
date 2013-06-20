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
		<script type="text/javascript" src="/assets/js/bootstrap.min.js" ></script>
		<script src="/assets/js/autobahn.min.js"></script>

		<link href="/assets/css/jquery-ui.min.css" rel="stylesheet" type="text/css" >
		<link href="/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" >

		<link href="/css/common-elements.css" rel="stylesheet" type="text/css" >

		<script type="text/javascript" src="/js/common-js.js" ></script>
		<script type="text/javascript" src="/js/user-profile-base.js" ></script>
		<script type="text/javascript" src="/js/search-content.js" ></script>
		<script src="/js/ws-message-handler.js" type="text/javascript" ></script>
		<link href="/css/home-base.css" rel="stylesheet" type="text/css" >
		<link href="/css/user-profile-content.css" rel="stylesheet" type="text/css" >
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
								<div class="nav-menu-element" id="home-tab" ><i class="icon-home icon-white" ></i> Home</div>
								<div class="nav-menu-element" id="profile-tab" ><i class="icon-user icon-white" ></i> Profile</div>
								<div class="nav-menu-element" id="connections-tab" ><!-- <div class="notification-count" >10</div> --><i class="icon-star icon-white" ></i> Connections</div>
								<div class="nav-menu-element" id="channels-tab" ><i class="icon-film icon-white" ></i> Channels</div>
								<div class="nav-menu-element" id="settings-tab" ><i class="icon-wrench icon-white" ></i> Settings</div>
							</div>
						</div>
					<div>
				</div>
			</section> 
			<section>
				<div id="content-container-wrapper">
					<!-- Profile Content -->
					<div class="content-container" id="user-profile-content" style="display: block;">
						<div id="profile-banner-container" >
							<div id="profile-image-container" >
							</div>
							<div id="profile-info-container" >
								<div id="name-info-container" >Sagar Jadhav</div>
								<div id="dob-info-container" >3 January, 1991</div>
								<!-- <div id="gender-info-container" ></div> -->
								<div id="current-place-info-container">Palo Alto, California, US</div>
								<div id="from-info-container">Pune, Maharastra, IN</div>
							</div>
							<div id="edu-info-container" >
								<div id="edu-info-header">Education</div>
								<hr class="horizontal-divider" >
							</div>
							<div id="work-info-container" >
								<div id="work-info-header" >Work</div>
								<hr class="horizontal-divider" >
							</div>
						</div>

						<div id="user-profile-tabs-content-container" class="carousel slide">
							<div id="user-profile-tabs-container" >
								<div class="user-profile-tab user-profile-tab-active active" id="user-profile-tab-posts" 
								data-target="#user-profile-tabs-content-container" data-slide-to="0" ><span>Posts</span></div>
								<div class="user-profile-tab" id="user-profile-tab-connections" 
								data-target="#user-profile-tabs-content-container" data-slide-to="1" ><span>Connections</span></div>
								<div class="user-profile-tab" id="user-profile-tab-channels" 
								data-target="#user-profile-tabs-content-container" data-slide-to="2" ><span>Channels</span></div>
							</div>

							<div class="user-profile-carousel-container carousel-inner" >
								<div class="user-profile-tab-content-container item active" id="user-profile-posts" >Posts</div>
								<div class="user-profile-tab-content-container item" id="user-profile-connections" >Connections</div>
								<div class="user-profile-tab-content-container item" id="user-profile-channels" >Channels</div>
							</div>
						</div>
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
 
