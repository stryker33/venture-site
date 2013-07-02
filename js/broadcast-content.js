var uid, rid, broadcastTitle;
var hostAddress = "localhost";
$(document).ready(function(e){
	uid = $("#get-uid").val();
	rid = $("#get-rid").val();
	broadcastTitle = $("#get-bt").val();
	populatePage();

	$(".nav-menu-element").click(function(e){
		window.location = "https://" + hostAddress + "/home.php?uid=" + uid + "&c=" + jQuery.trim($(this).text()).toLowerCase();
	});
});

function populatePage()
{
	$("#content-desc-header").text(broadcastTitle);
	loadUserInfo();
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
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log("Error(getNotifications):: jqXHR: " + jqXHR.status + " " + jqXHR.responseText + " textStatus: " + textStatus + " errorThrown: " + errorThrown);
		}
	});
}
