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
		<script type="text/javascript" src="/assets/js/jquery.ui.datepicker.min.js" ></script>
		<script type="text/javascript" src="/assets/js/bootstrap.min.js" ></script>
		<script type="text/javascript" src="/assets/js/jquery.ajaxq-0.0.1.js" ></script>
		<script src="/assets/js/autobahn.min.js"></script>
		<script type="text/javascript" src="/assets/js/jquery.fileupload.js"  ></script>
		<script type="text/javascript" src="/assets/js/jquery.nicescroll.js"  ></script>

		<link href="/assets/css/ubuntu-font/ubuntu-font.css" rel="stylesheet" type="text/css" >
		<link href="/assets/css/jquery-ui.min.css" rel="stylesheet" type="text/css" >
		<link href="/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" >

		<link href="/css/common-elements.css" rel="stylesheet" type="text/css" >

		<script type="text/javascript" src="/js/home-base.js" ></script>
		<script type="text/javascript" src="/js/home-util.js" ></script>
		<script type="text/javascript" src="/js/common-js.js" ></script>
		<script type="text/javascript" src="/js/nav-menu-base.js" ></script>
		<script type="text/javascript" src="/js/home-content.js" ></script>
		<script type="text/javascript" src="/js/search-content.js" ></script>
		<script type="text/javascript" src="/js/profile-content.js" ></script>
		<script type="text/javascript" src="/js/edit-profile-content.js" ></script>
		<script type="text/javascript" src="/js/connections-content.js" ></script>
		<script type="text/javascript" src="/js/connection-requests-content.js" ></script>
		<script type="text/javascript" src="/js/connection-groups-content.js" ></script>
		<script type="text/javascript" src="/js/channels-content.js" ></script>
		<script type="text/javascript" src="/js/channel-info-content.js" ></script>
		<script src="/js/ws-message-handler.js" type="text/javascript" ></script>
		<link href="/css/home-base.css" rel="stylesheet" type="text/css" >
		<link href="/css/home-content.css" rel="stylesheet" type="text/css" >
		<link href="/css/edit-profile-content.css" rel="stylesheet" type="text/css" >
		<link href="/css/user-container.css" rel="stylesheet" type="text/css" >
		<link href="/css/profile-content.css" rel="stylesheet" type="text/css" >
		<link href="/css/connections-content.css" rel="stylesheet" type="text/css" >
		<link href="/css/connection-groups-content.css" rel="stylesheet" type="text/css" >
		<link href="/css/channels-content.css" rel="stylesheet" type="text/css" >
		<link href="/css/channel-info-content.css" rel="stylesheet" type="text/css" >
	</head>

	<body>
		<input type="hidden" id="get-uid" value="<?php echo $_GET["uid"]; ?>" />
		<input type="hidden" id="get-content" value="<?php echo $_GET["c"]; ?>" />
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
								<!-- <div class="nav-menu-element-active" >Item 1</div>
								<div class="nav-menu-element" >Item 2</div>
								<div class="nav-menu-element" >Item 3</div>
								<div class="nav-menu-element" >Item 4</div>
								<div class="nav-menu-element" >Item 5</div>
								<div class="nav-menu-element" >Item 6</div>
								<div class="nav-menu-element" >Item 7</div>
								<div class="nav-menu-element" >Item 8</div>
								<div class="nav-menu-element" >Item 9</div>
								<div class="nav-menu-element" >Item 10</div>
								<div class="nav-menu-element" >Item 11</div>
								<div class="nav-menu-element" >Item 12</div>
								<div class="nav-menu-element" >Item 13</div> -->
							</div>
						</div>
					<div>
				</div>
			</section> 
			<section>
				<div id="content-container-wrapper">
					<div class="alert" id="message-container" ></div>

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

					<!-- Edit Profile Content -->
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

					<!-- Connection Groups Content -->
					<div class="content-container" id="connection-groups-content" >
						<div class="filters-container">
							<div class="search-container" id="search-connection-groups-container" >
								<div class="textbox-container" id="search-connection-groups-text-container">
									<input class="textbox" id="search-connection-groups" type="text" placeholder="Search Connection Groups" />
								</div>
								<div class="search-icon-container"><i class="icon-search" ></i></div>
							</div>
							<button class="btn btn-mini" id="btn-cg-create-new-cg" rel="#cg-new-cg-container" ><icon class="icon-plus" ></icon> Create New Connection Group</button>
						</div>
						<div class="content-sub-container" id="connection-groups-container" >
							<div class="status-indicators" id="empty-cg-indicator" >
								<span>No connection groups have been created.</span><br/>
								<span>Create a new connection group to start with.</span>
							</div>
							<!--<div class="connection-group-container">
								<div class="cg-connection-group-name" >Work Buddies</div>
								<div class="cg-member-images-container" >
									<div class="cg-member-image" ></div>
									<div class="cg-member-image" ></div>
								</div>
								<button class="btn btn-mini btn-cg-edit-cg" ><i class="icon-cog" ></i> Edit Connection Group</button>
								<button class="btn btn-mini btn-cg-remove-cg" ><i class="icon-minus" ></i> Remove Connection Group</button>
							</div>-->
						</div>

						<!-- New Connection Group Overlay -->
						<div class="overlay-dialog-container" id="cg-new-cg-container">
							<div class="overlay-dialog-container-header" ><span class="overlay-dialog-container-header-text" >New Connection Group</span></div>
							<div class="overlay-divider" style="top: 7%;" ></div>
							<div style="position: absolute; width: 100%; height: 93%; top: 7%;" >
								<div class="textbox-container" id="cg-new-group-name-container" >
									<input class="textbox" id="cg-new-group-name" type="text" placeholder="Connection Group Name" />
								</div>
								<button class="btn btn-small" id="btn-cg-create-group" >Create the Connection Group</button>
								<button class="btn btn-mini" id="btn-cg-select-all" >Select All</button>
								<button class="btn btn-mini" id="btn-cg-deselect-all" >Deselect All</button>
								<div id="cg-main-connections-container">
									<div class="textbox-container" id="cg-search-connections-container" >
										<input class="textbox" id="cg-search-connections" type="text" placeholder="Search Connections" />
									</div>
									<div id="cg-connections-container">
									</div>										
									<!--<div class="cg-new-cg-connection">
										<div class="cg-new-connection-image-container" ></div>
										<div class="cg-new-connection-name" >Sagar Jadhav</div>
										<button class="btn btn-mini btn-cg-new-connection-add btn-new-cg-action" >Add to the Group</button>
									</div>-->
								</div>
							</div>
						</div>

						<!-- Edit Connection Group Overlay-->
						<div class="overlay-dialog-container" id="cg-edit-cg-container" >
							<div class="overlay-dialog-container-header" ><span class="overlay-dialog-container-header-text" ></span></div>
							<div class="overlay-divider" style="top: 7%;" ></div>
							<div style="position: absolute; width: 100%; height: 93%; top: 7%;" >
								<div class="textbox-container" id="cg-edit-group-name-container" >
									<input class="textbox" id="cg-edit-group-name" type="text" placeholder="Connection Group Name" />
								</div>
								<button class="btn btn-small" id="btn-cg-edit-done" >Done</button>
								<button class="btn btn-mini" id="btn-cg-select-all" >Select All</button>
								<button class="btn btn-mini" id="btn-cg-deselect-all" >Deselect All</button>
								<div id="cg-main-connections-container">
									<div class="textbox-container" id="cg-search-connections-container" >
										<input class="textbox" id="cg-search-connections" type="text" placeholder="Search Connections" />
									</div>
									<div id="cg-connections-container">
									</div>										
									<!--<div class="cg-edit-cg-connection">
										<div class="cg-new-connection-image-container" ></div>
										<div class="cg-new-connection-name" >Sagar Jadhav</div>
										<button class="btn btn-mini btn-cg-new-connection-add btn-new-cg-action" >Add to the Group</button>
									</div>-->
								</div>
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

					<!-- Channels Content -->
					<div class="content-container" id="channels-content" >
						<div class="filters-container">
							<div class="search-container" id="search-channels-container" >
								<div class="textbox-container" id="search-channels-text-container">
									<input class="textbox" id="search-channels" type="text" placeholder="Search Channels" />
								</div>
								<div class="search-icon-container"><i class="icon-search" ></i></div>
							</div>
							<button class="btn btn-mini" id="btn-c-create-new-channel" rel="#c-new-channel-container" ><icon class="icon-plus" ></icon> Create New Channel</button>
						</div>
						<div class="content-sub-container" id="channels-container" >
							<div class="status-indicators" id="empty-channel-content-indicator" style="top: 35%; display: none;">
								<span>No Channels have been created.</span><br/>
								<span>Create a new Channel to start with.</span>
							</div>
							<!-- <div class="channel-container" >
								<div class="image-container channel-cover-container" ></div>
								<div class="channel-name-container" ><span>Sample Channel</span></div>
								<div class="channel-visibility-container" ><span>Public</span></div>
								<div class="channel-desc-container" ><span>It's just a sample channel</span></div>
								<button class="btn btn-mini btn-c-channel-edit" ><i class="icon-cog"></i> Edit Channel</button>
								<button class="btn btn-mini btn-c-channel-remove" ><i class="icon-minus"></i> Remove Channel</button>
							</div> -->
						</div>

						<!-- New Channel Overlay -->
						<div class="overlay-dialog-container" id="c-new-channel-container">
							<div class="overlay-dialog-container-header" ><span class="overlay-dialog-container-header-text" >New Channel</span></div>
							<div class="overlay-divider" style="top: 7%;" ></div>
							<div style="position: absolute; width: 100%; height: 93%; top: 7%;" >
								<div class="image-container" id="new-channel-cover-container" >
									<div class="image-prompt" id="c-new-channel-cover-prompt" >Select Channel Cover</div>
								</div>
								<div class="textbox-container" id="c-new-channel-name-container" >
									<input class="textbox" id="c-new-channel-name" type="text" placeholder="Channel Name" />
								</div>
								<button class="btn btn-small" id="btn-c-new-channel-create" >Create Channel</button>
								<div id="c-new-channel-visibility-select" >
									<span>Channel Visibility: </span>
									<select>
										<option>Public</option>
										<option>Connections Only</option>
									</select>
								</div>
								<div class="textbox-container" id="c-new-channel-desc-container" >
									<textarea class="textbox" id="c-new-channel-desc" placeholder = "Describe the purpose of the Channel" 
									style="text-align: left ! important; padding-left: 1% ! important; width: 98.9% ! important;" ></textarea>
								</div>
							</div>
						</div>

						<!-- Edit Channel Overlay -->
						<div class="overlay-dialog-container" id="c-edit-channel-container">
							<div class="overlay-dialog-container-header" ><span class="overlay-dialog-container-header-text" ></span></div>
							<div class="overlay-divider" style="top: 7%;" ></div>
							<div style="position: absolute; width: 100%; height: 93%; top: 7%;" >
								<div class="image-container" id="edit-channel-cover-container" >
									<div class="image-prompt" id="c-edit-channel-cover-prompt" >Select Channel Cover</div>
								</div>
								<div class="textbox-container" id="c-edit-channel-name-container" >
									<input class="textbox" id="c-edit-channel-name" type="text" placeholder="Channel Name" />
								</div>
								<button class="btn btn-small" id="btn-c-edit-channel-done" >Done</button>
								<div id="c-edit-channel-visibility-select" >
									<span>Channel Visibility: </span>
									<select>
										<option>Public</option>
										<option>Connections Only</option>
									</select>
								</div>
								<div class="textbox-container" id="c-edit-channel-desc-container" >
									<textarea class="textbox" id="c-edit-channel-desc" placeholder = "Describe the purpose of the Channel" 
									style="text-align: left ! important; padding-left: 1% ! important; width: 98.9% ! important;" ></textarea>
								</div>
							</div>
						</div>
					</div>

					<!-- Channel Info Content -->
					<div class="content-container" id="channel-info-content">
						<div id="channel-info-container" >
							<div class="image-container" id="ci-channel-cover-container" ></div>
							<div id="ci-channel-name-container" ></div>
							<div id="ci-channel-visibility-container" ></div>
							<div id="ci-channel-desc-container" ><span></span></div>
							<button class="btn btn-mini" id="btn-ci-edit-channel" ><i class="icon-cog" ></i> Edit Channel</button>
							<button class="btn btn-mini" id="btn-ci-remove-channel" ><i class="icon-minus" ></i> Remove Channel</button>
							<div id="ci-channel-view-options-container" >
								<span>View Channel as: </span>
								<div class="btn-group" >
									<a class="btn btn-mini dropdown-toggle" data-toggle="dropdown" href="#" style="width: 11em;">
									Self
										<span class="caret" style="position: absolute; right: 5%;" ></span>
									</a>
									<ul class="dropdown-menu pull-right" >
									 <li>Connections</li>
									</ul>
								</div>
							</div>
						</div>
						<div id="ci-channel-header" ><i class="icon-film" ></i><span></span></div>
						<div id="channel-content-container" style="height: 95.5%" >
							<div id="ci-tabs-content-container" class="carousel slide">
							<div id="ci-tabs-container" >
								<div class="ci-tab ci-tab-active active" id="ci-tab-live-broadcasts" 
								data-target="#ci-tabs-content-container" data-slide-to="0" ><span>Live Broadcasts</span></div>
								<div class="ci-tab" id="ci-tab-uploaded" 
								data-target="#ci-tabs-content-container" data-slide-to="1" ><span>Uploaded</span></div>
							</div>
							<div class="ci-carousel-container carousel-inner" >
								<!-- <div class="ci-tab-content-container item active" id="ci-live-broadcasts-content" ><div style="width: 100%; height: 10px; overflow: visible;" >Live Broadcasts</div></div> -->
								<div class="ci-tab-content-container item active" id="ci-live-broadcasts-content" >Live Broadcasts</div>
								<div class="ci-tab-content-container item" id="ci-uploaded-content" >Uploaded</div>
							</div>
						</div>
						</div>
					</div> 

				</div>
			</section>
		</div>
	</body>
</html>