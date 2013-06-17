var uid, userInfo, notifications, connections, connection_requests;
$(document).ready(function(e){
	uid = $("#get-uid").val();
	$("#search-box").val("");
	populatePage();

	/*************************************************************************************************************
	*
	* Event Handlers
	*
	*************************************************************************************************************/	

	// Changes the appearance of the search-box on focus events
	$("#search-box").focusin(function(e){
		$("#search-box-container").css("background", "").css("border", "solid 1px #000000 !important");
		$(this).css("background", "");
		
		$("#content-desc-header").text("Search");
		displayContent("Search");
		displayMenu("Main");
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
function populatePage()
{
	console.log(uid);
	webSocketServerConnect(); //ws_message_handler.js
	loadUserInfo();
	loadNotifications();
	loadConnections(); 
}

// Retrieves and loads the userInfo into the profile section
function loadUserInfo()
{
	var userInfoRequest = $.ajax({
		url: "/php/userInfo.php",
		type: "GET",
		async: false,
		data: {uid: uid},
		dataType: "json",
		success: function(data){
			userInfo = data;
			//userInfo = jQuery.parseJSON(data);
			//$("#user-profile-image").attr("src", "https://localhost/images/profile_images/" + uid + "_pi.jpg");
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
	var notificationsRequest = $.ajax({
		url: "/php/getNotifications.php",
		type: "GET",
		async: false,
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
	var connectionsRequest = $.ajax({
		url: "/php/getConnections.php",
		type: "GET",
		async: false,
		data: {uid: uid},
		dataType: "json",
		success: function(data){
			//connections = jQuery.parseJSON(data);
			connections = data;
			loadConnectionsInfo(); // connections-content.js
		},
			error: function(jqXHR, textStatus, errorThrown){
			console.log("Error(getConnections):: jqXHR: " + jqXHR.statusText + " " + jqXHR.responseText + " textStatus: " + textStatus + " errorThrown: " + errorThrown);
		}
	});
}