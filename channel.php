<!DOCTYPE html>
<html lang="en">
	<head>
		<!-- <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /> -->
		<meta http-equiv="Content-Type" content="text/html" >
		<meta charset="utf-8" />
		<title>Contineo</title>

		<meta id="viewport" name="viewport" content="initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,width=1280,height=768,target-densitydpi=device-dpi,user-scalable=yes" />
		<!-- <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" > -->

		<script type="text/javascript" src="/assets/js/jquery-1.9.1.min.js" ></script>
		<script type="text/javascript" src="/assets/js/jquery.ui.core.min.js" ></script>
		<script type="text/javascript" src="/assets/js/jquery-ui.min.js" ></script>
		<script type="text/javascript" src="/assets/js/jquery-migrate-1.0.0.js" ></script>
		<script type="text/javascript" src="/assets/js/jquery.tools.min.js" ></script>
		<script type="text/javascript" src="/assets/js/bootstrap.min.js" ></script>
		<script type="text/javascript" src="/assets/js/jquery.ajaxq-0.0.1.js" ></script>
		<script src="/assets/js/autobahn.min.js"></script>
		<script type="text/javascript" src="/assets/js/jquery.nicescroll.js"  ></script>
		<script type="text/javascript" src="/assets/js/jquery.tipsy.js"  ></script>

		<link href="/assets/css/ubuntu-font/ubuntu-font.css" rel="stylesheet" type="text/css" >
		<link href="/assets/css/jquery-ui.min.css" rel="stylesheet" type="text/css" >
		<link href="/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" >
		<link href="/assets/css/tipsy.css" rel="stylesheet" type="text/css" >

		<link href="/css/common-elements.css" rel="stylesheet" type="text/css" >

		<script type="text/javascript" src="/js/common-js.js" ></script>
		<script type="text/javascript" src="/js/home-util.js" ></script>
		<script type="text/javascript" src="/js/channel-base.js" ></script>
		<script type="text/javascript" src="/js/ws-channel-comment-handler.js" ></script>

		<link href="/css/home-base.css" rel="stylesheet" type="text/css" >
		<link href="/css/channel-base.css" rel="stylesheet" type="text/css" >
	</head>

	<body style="font-size: 100%" >
		<input type="hidden" id="get-cv" value="<?php echo $_GET["cv"]; ?>" />
		<input type="hidden" id="get-ch-id" value="<?php echo $_GET["cid"]; ?>" />
		<div class="wrapper" >
			<section>
				<div id="banner-container" >
					<div id="content-desc-header" title="Home" tip-gravity="ns" >Sample Channel</div>
					<div class="textbox-container" id="search-box-container" style="background: transparent; border: 0px !important;" >
						<input class="textbox" id="search-box" type="text" placeholder="Search Profiles and Channels" style="position: absolute; box-shadow: none !important; background: transparent;" />
					</div>
					<div id="user-info-container" >
						<!-- <div id="user-profile-image-container" ><img id="user-profile-image" /></div> -->
						<div id="username" tip-gravity="ns" ></div>
					</div>
					<div id="logo-container" title="Contineo Home" tip-gravity="ns" >contineo</div>
					<div id="navmenu-control-container" tip-gravity="ne" ><i class="icon-chevron-left" ></i><i class="icon-list" ></i></div>
				</div>
			</section>
			<section>
				<div id="navbar-container" >
					<div id="nav-container" >
						<div class="access-controls-container" >
							<div id="back-control-container" title="Back" tip-gravity="n" ><i class="icon-arrow-left icon-white"></i></div>
							<div id="sub-menu-header" tip-gravity="ns" ></div>
							<div id="main-menu-control-container" title="Jump to the Main Menu" tip-gravity="ne" ><i class="icon-list icon-white"></i></div>
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
					
					<!-- Channel Info Content -->
					<div class="content-container" id="channel-info-content" style="display: block" >
						<div id="channel-info-container" >
							<div class="image-container" id="c-channel-cover-container" ></div>
							<div id="c-channel-name-container" ></div>
							<div id="c-channel-owner-container" ></div>
							<div id="c-channel-desc-container" ><span></span></div>
						</div>
						<div id="c-channel-header" ><i class="icon-film" ></i><span>Sample</span></div>
						<div id="channel-content-container" style="height: 96%;" >
							<div id="c-tab-header-container" >
								<div class="c-tab-header" id="c-desc-tab" >Description</div>
								<div class="c-tab-header" id="c-comments-tab" >Comments</div>
								<div class="c-tab-header c-tab-header-active" id="c-videos-tab" >Videos</div>
							</div>
							<div class="channel-content-sub-container channel-content-sub-container-active" id="c-videos-container" style="display: block" >
								<div class="filters-container" style="height: 5%">
									<div class="search-container" id="search-videos" style="top: 18%">
	  									<div class="textbox-container" id="search-videos-text-container">
					 						<input class="textbox" id="search-videos" type="text" placeholder="Search Channel" />
										</div>
										<div class="search-icon-container"><i class="icon-search" ></i></div>
									</div>
								</div>
								<div class="content-sub-container" id="">
								</div>	
							</div>
							
							<div class="channel-content-sub-container" id="c-comments-container" >
								<div id="c-post-comment-container" >
									<div class="user-channel-comment-bubble image-container user-profile-image" >
										<!-- <div class="image-container user-profile-image" ></div> -->
									</div>
									<div class="user-channel-comment textbox-container" >
										<textarea class="comment-textbox" placeholder = "Post a Comment" ></textarea>
									</div>
									<button class="btn btn-mini" id="btn-c-post-comment">Post Comment</button>
								</div>
								<div class="overlay-divider" ></div>
								<div id="c-comments" >
									<!-- <div class="c-comment" >
										<div class="c-channel-comment-bubble image-container user-profile-image" ></div>
										<div class="c-channel-comment-name-container">Sebastien Vettel</div>
										<div class="c-channel-comment" >Your videos are awsome...</div>
										<div class="overlay-divider" style="position: absolute; bottom: 0px" ></div>
									</div> -->
								</div>
							</div>

							<div class="channel-content-sub-container" id="c-desc-container" >
							</div>
						</div>
					</div> 
				</div>
			</section>
		</div>
	</body>
</html>