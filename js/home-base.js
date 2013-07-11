var uid, contentRequest, userInfo, notifications, connections, connection_requests, connectionGroups, channels;
var hostAddress = "localhost";
var fadeDelay = 500;
var windowWidth, windowHeight;

$(document).ready(function(e){
	windowWidth = $(".wrapper").width();
	windowHeight = $(".wrapper").height();
	uid = $("#get-uid").val();
	contentRequest = $("#get-content").val();

	$(".content-container").niceScroll();
	$(".ci-tab-content-container").niceScroll();
	$(".channel-content-sub-container").niceScroll();
	$("#search-box").val("");

	initLayouts();
	populatePage();

	/*************************************************************************************************************
	*
	* Event Handlers
	*
	*************************************************************************************************************/	

	// Logo-container click handler
	$("#logo-container").on("click", function(e){
		$("#home-tab").click();
		$("#main-menu-control-container").click();
	});

	// sub-menu-header click handler
	$("#sub-menu-header").on("click", function(e){
		var headerText = jQuery.trim($(this).text());

		switch(headerText)
		{
			case "Profile": displayProfileContent();
							break;

			case "Connections": displayConnectionsContent();
								break;

			case "Channels": displayChannelsContent();
							 break;
		}
	});

	// Changes the color of navmenu-control-container icons on hover
	$("#navmenu-control-container").hover(function(e){
		$("#navmenu-control-container i").addClass("icon-white");
	}, function(e){
		$("#navmenu-control-container i").removeClass("icon-white");
	});

	// Click handler for navmenu-control-container
	$("#navmenu-control-container").on("click", function(e){
		if($(this).hasClass("show-menu"))
		{
			animateNavBar("show");
		}
		else if($(this).hasClass("affix-menu"))
		{
			animateNavBar("hide")
		}
	});

	// Changes the appearance of the search-box on focus events
	$("#search-box").focusin(function(e){
		$("#search-box-container").css("background", "").css("border", "solid 1px #000000 !important");
		$(this).css("background", "");
		
		$("#content-desc-header").text("Search");
		displayContent("Search");
		//displayMenu("Main");
		var activeElement = $(".nav-menu-element-active").get()[0];
		$(activeElement).addClass("nav-menu-element").removeClass("nav-menu-element-active");
	}).focusout(function(e){
		$("#search-box-container").css({"background": "transparent", "border": "none !important"});
		$(this).css("background", "transparent");
	});

	// Generate search results for query entered in search-box
	$("#search-box").keyup(function(e){
		if($(this).val().length != 0)
		{
			$.ajax({
				url: "/php/search.php",
				method: "GET",
				data: {uid: uid, q: $(this).val()},
				success: function(data){
					var searchResult = jQuery.parseJSON(data);
					populateSearchContent(searchResult); // search-content.js
				}
			})
		}
	});
});

/*************************************************************************************************************
*
* Functions
*
*************************************************************************************************************/
function initLayouts()
{	
	//scaleToFit();
	resizeImageContainers();
	initHomeLayout();
}

function initHomeLayout()
{
	//$(".wrapper").css({
	//	"min-width": windowWidth * 0.9,
	//	"min-height": windowHeight * 0.9
	//});
	$("#banner-container").css("line-height", $("#banner-container").height() + "px");
	$("#logo-container, #content-desc-header, #username").css("visibility", "visible");

	setTimeout(animateNavBar, 1000, "show");
}

function scaleToFit()
{
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) 
	{
  		var ww = ( $(window).width() < window.screen.width ) ? $(window).width() : window.screen.width;
  		var mw = 1280;
  		var ratio =  ww / mw;
  		if( ww < mw)
	   		$('#viewport').attr('content', 'initial-scale=' + ratio + '; maximum-scale=' + ratio + '; minimum-scale=' + ratio + '; user-scalable=yes, width=' + ww);
	  	else
	   		$('#viewport').attr('content', 'initial-scale=1.0; maximum-scale=2; minimum-scale=1.0; user-scalable=yes; width=' + ww);
	}
}

function resizeImageContainers()
{
	$.each($(".image-container:visible").get(), function(index, imageContainer){
		$(imageContainer).width($(imageContainer).height());
	});
}

function populateUserImage()
{
	var profileImages = $(".user-profile-image").get()
	$(".user-profile-image").filter(function(){
		return $(this).css("background-image") == "none";
	}).css("background-image", "url(" + userInfo.user.profile_image + ")")
	.attr("title", userInfo.user.first_name + " " + userInfo.user.last_name)
	.attr("tip-gravity", "ns");
}

function animateNavBar(displayCommand)
{
	if(displayCommand == "show")
	{
		$("#content-container-wrapper").animate({width: "85%"}, 300);
		$("#navbar-container").animate({
			left: "85%"
		}, 300, function(e){
			$("#navmenu-control-container").removeClass("show-menu").addClass("affix-menu");
			$("#navmenu-control-container i").remove();
			$("#navmenu-control-container").hide().append("<i class='icon-list' ></i><i class='icon-chevron-right' ></i>").attr("title", "Hide the navigation menu");
			$("#navmenu-control-container").fadeIn("fast");
		});	
	}
	else if(displayCommand == "hide")
	{
		$("#content-container-wrapper").animate({width: "100%"}, 300);
		$("#navbar-container").animate({
			left: "100%"
		}, 300, function(e){
			$("#navmenu-control-container").removeClass("affix-menu").addClass("show-menu");
			$("#navmenu-control-container i").remove();
			$("#navmenu-control-container").hide().append("<i class='icon-chevron-left' ></i><i class='icon-list' ></i>").attr("title", "Show the navigation menu");
			$("#navmenu-control-container").fadeIn("fast");
		});	
	}
	
}
function populatePage()
{
	console.log(uid);
	switchContent();
	webSocketServerConnect(); //ws_message_handler.js
	loadUserInfo();
	loadNotifications();
	loadConnections();
	loadConnectionGroups();
	loadChannels();
}

// Switch to the requested content
function switchContent()
{
	switch(contentRequest)
	{
		case "home": 
					 break;

		case "profile": displayProfileContent();
					 	break;

		case "connections": displayConnectionsContent();
					 		break;

		case "channels": displayChannelsContent();
					 	 break;

		case "settings": displaySettingsContent();
					 	 break;
	}

}

// Retrieves and loads the userInfo into the profile section
function loadUserInfo()
{
	var userInfoRequest = $.ajaxq("loadQueue", {
		url: "/php/userInfo.php",
		type: "GET",
		//async: false,
		data: {uid: uid},
		dataType: "json",
		success: function(data){
			userInfo = data;
		
			$("#username").text(userInfo.user.first_name + " " + userInfo.user.last_name);
			generateProfile(); // profile-content.js
			generateEditProfile(); // edit-profile-content.js
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log("Error(getNotifications):: jqXHR: " + jqXHR.status + " " + jqXHR.responseText + " textStatus: " + textStatus + " errorThrown: " + errorThrown);
		}
	});
}

// Retrieves and loads the notifications
function loadNotifications()
{
	var notificationsRequest = $.ajaxq("loadQueue", {
		url: "/php/getNotifications.php",
		type: "GET",
		//async: false,
		data: {uid: uid, all: 1},
		dataType: "json",
		success: function(data){
			//notifications = jQuery.parseJSON(data);
			notifications = data;
			if(notifications.length != 0)
			{
				//generateNotificationsIndicator(); // nav-menu-base.js
				connection_requests = notifications.connection_requests;
				loadConnectionRequests();
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log("Error(getNotifications):: jqXHR: " + jqXHR.statusText + " " + jqXHR.responseText + " textStatus: " + textStatus + " errorThrown: " + errorThrown);
		}
	});
}

// Retrieves and loads the connection_requests
function loadConnections()
{
	var connectionsRequest = $.ajaxq("loadQueue", {
		url: "/php/getConnections.php",
		type: "GET",
		//async: false,
		data: {uid: uid},
		dataType: "json",
		success: function(data){
			//connections = jQuery.parseJSON(data);
			connections = data;
			loadConnectionsInfo(); // connections-content.js
			populateNewCGContainer(); // connection-groups-content.js
		},
			error: function(jqXHR, textStatus, errorThrown){
			console.log("Error(getConnections):: jqXHR: " + jqXHR.statusText + " " + jqXHR.responseText + " textStatus: " + textStatus + " errorThrown: " + errorThrown);
		}
	});
}

// Retrieves and loads the connection_groups
function loadConnectionGroups()
{
	var cgRequest = $.ajaxq("loadQueue", {
		url: "/php/getCG.php",
		type: "GET",
		data: {uid: uid},
		datatype: "json",
		success: function(data){
			connectionGroups = data;
			loadCGInfo(); // connection-groups-content.js
		}
	});
}

// Retrieves and loads the channels
function loadChannels()
{
	$.ajaxq("loadQueue", {
		url: "/php/getChannels.php",
		type: "GET",
		data: {uid: uid},
		dataType: "json",
		success: function(data){
			channels = data;
			loadChannelsInfo(); // channels-content.js
		}
	});
}

// Displays Message
function displayMessage(messageType, message, switchToHome)
{
	switchToHome = false;
	if(messageType == "success" )
		$("#message-container").addClass("alert-success");
	if(messageType == "info" )
		$("#message-container").addClass("alert-info");
	if(messageType == "error" )
		$("#message-container").addClass("alert-error");

	$("#message-container").text(message);

	if(switchToHome == true)
		$("#home-tab").click();

	var left = (($(".content-container").width() - $("#message-container").width()) / 2).toString() + "px";
	
	$("#message-container").css("left", left).fadeIn("fast").delay(3000).fadeOut("fast", function(){
		if(messageType == "success" )
			$("#message-container").removeClass("alert-success");
		if(messageType == "info" )
			$("#message-container").removeClass("alert-info");
		if(messageType == "error" )
			$("#message-container").removeClass("alert-error");
	});
}