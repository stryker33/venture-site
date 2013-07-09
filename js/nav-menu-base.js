var menuStack = [];
$(document).ready(function(e){

	/*************************************************************************************************************
	*
	* Event Handlers
	*
	*************************************************************************************************************/

	$(document).on("click", ".nav-menu-element, .nav-menu-element-active", function(e){
		// Change the class of the previous active element
		//var activeElement = $(".nav-menu-container-active .nav-menu-element-active").get()[0];
		var activeElement = $(".nav-menu-element-active").get()[0];
		$(activeElement).addClass("nav-menu-element").removeClass("nav-menu-element-active");

		// Change the class of the clicked element
		$(this).addClass("nav-menu-element-active").removeClass("nav-menu-element");

		var contentHeader = $(this).text().replace(/[0-9]+\s*/g, "");
		$("#content-desc-header").text(contentHeader);

		var selectedTab = $(this).text().replace(/([0-9]+\s*|\s+)/g, "");
		
		switch(selectedTab)
		{
			case "Home": displayHomeContent();
						 break;

			case "Profile": displayProfileContent();
						 	break;

			case "EditProfile": displayContent("Edit Profile");
								break;

			case "Connections": displayConnectionsContent();
						 	 	break;

			case "ConnectionRequests": displayContent("Connection Requests");
										break;

			case "ConnectionGroups": displayContent("Connection Groups");
									 break;

			case "Channels": displayChannelsContent();
						 	break;

			case "Settings": displaySettingsContent();
						 	break;
		}

		if($(this).parent().parent().attr("id") == "channels-sub-menu" )
			populateChannelInfo($(this).text()); // channel-info-content.js

		if($("#" + $(this).attr("id") + " .notification-count").length > 0)
		{
			$("#" + $(this).attr("id") + " .notification-count").remove();
			if($(this).attr("id") == "connection-requests-tab")
				connectionRequestsSeen(); // connection-requests-content.js
		}
	});

	// Handle main-menu-control click
	$("#main-menu-control-container").click(function(e){
		$(".nav-menu-container-active").fadeOut("fast").removeClass("nav-menu-container-active").addClass("nav-menu-container");
		$("#main-menu").fadeIn("fast").removeClass("nav-menu-container").addClass("nav-menu-container-active");
		$("#sub-menu-header").text("");
	});

	// Handle back-control click
	$("#back-control-container").click(function(e){
		if(menuStack.length != 0)
		{
			var previousMenu = menuStack.pop();
			displayMenu(previousMenu);
		}
	});

	// Click handler for 
});

/*************************************************************************************************************
*
* Functions
*
*************************************************************************************************************/
function displayHomeContent()
{
	displayContent("Home");
}


function displayProfileContent()
{
	menuStack.push("Main");
	displayMenu("Profile");
}

function displayConnectionsContent()
{
	menuStack.push("Main");
	displayMenu("Connections");
}


function displayChannelsContent()
{
	menuStack.push("Main");
	displayContent("Channels");
	displayMenu("Channels");
}

function displaySettingsContent()
{
	console.log("Settings Content Displayed");
}

function animateMenu()
{
	$(".nav-menu-container-active .nav-menu-element-active, .nav-menu-container-active .nav-menu-element").css("display", "none")
	.each(function(index){
		$(this).delay(index * 50).fadeIn();
	});
}
function displayMenu(subMenu)
{
	$("#main-menu").fadeOut("fast").removeClass("nav-menu-container-active").addClass("nav-menu-container");

	$("#sub-menu-header").children("i").remove();
	$("#sub-menu-header").text("");

	switch(subMenu)
	{
		case "Main": $("#main-menu-control-container").click();
					 break;

		case "Profile": $("#profile-sub-menu").removeClass("nav-menu-container").addClass("nav-menu-container-active").css("display", "block");
						displayContent("Profile");
						$("#sub-menu-header").append('<i class="icon-user icon-white" ></i> Profile').css("left", "35%");
						break;

		case "Connections": $("#connections-sub-menu").removeClass("nav-menu-container").addClass("nav-menu-container-active").css("display", "block");
						    displayContent("Connections");
							$("#sub-menu-header").append('<i class="icon-star icon-white" ></i> Connections').css("left", "28%");
							break;

		case "Channels": $("#channels-sub-menu").removeClass("nav-menu-container").addClass("nav-menu-container-active").css("display", "block");
						 $("#sub-menu-header").append('<i class="icon-film icon-white" ></i> Channels').css("left", "33%");
						 break;
	}

	$("#sub-menu-header").attr("title", "Jump back to " + subMenu);
	animateMenu();
	resizeImageContainers();
}

function displayContent(content)
{
	$(".content-container-active").fadeOut("fast").removeClass("content-container-active").addClass("content-container");
	switch(content)
	{
		case "Home": $("#home-content").fadeIn().removeClass("content-container").addClass("content-container-active");
					 break;

		case "Profile": $("#profile-content").fadeIn().removeClass("content-container").addClass("content-container-active");
						break;

		case "Edit Profile": $("#edit-profile-content").fadeIn().removeClass("content-container").addClass("content-container-active");
							 $("#btn-ep-save-changes").css("width", "10%").removeClass("btn-success").text("Save Changes").attr("disabled", "disabled");
							 generateEditProfile();
							 break;
							 
		case "Connections": $("#connections-content").fadeIn().removeClass("content-container").addClass("content-container-active");
							break;

		case "Connection Requests": $("#connection-requests-content").fadeIn().removeClass("content-container").addClass("content-container-active");
									break;	

		case "Connection Groups": $("#connection-groups-content").fadeIn().removeClass("content-container").addClass("content-container-active");
								  break;
								  
		case "Search": $("#search-content").fadeIn().removeClass("content-container").addClass("content-container-active");
					   break;

		case "Channels": $("#channels-content").fadeIn().removeClass("content-container").addClass("content-container-active");
					   break;

		case "Channel Info": $("#channel-info-content").fadeIn().removeClass("content-container").addClass("content-container-active");
					   		 break;
	}
	resizeImageContainers();
}

function generateNotificationsIndicator()
{
	generateConnectionsNI();
}

function generateConnectionsNI()
{
	var newConnRequestsCount = 0;
	$.each(connection_requests, function(index, request){
		if(request.request_status == "pending_approval")
			newConnRequestsCount++;
	});
	if(newConnRequestsCount != 0)
	{
		showNI("Connections", newConnRequestsCount);
		showNI("Connection Requests", newConnRequestsCount);	
	}
}

function showNI(hostTab, notificationCount)
{
	switch(hostTab)
	{
		case "Connections": $("#connections-tab").prepend("<div class='notification-count'>" + notificationCount + "<div>");
							break;

		case "Connection Requests": $("#connection-requests-tab").prepend("<div class='notification-count'>" + notificationCount + "<div>"); 
									break;
	}
}