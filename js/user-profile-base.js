var uid = $("#get-uid").val();

$(document).ready(function(e){
	uid = $("#get-uid").val();
	console.log(uid);	
	initUserProfile();
	/*************************************************************************************************************
	*
	* Event Handlers
	*
	*************************************************************************************************************/
	
	$(".user-profile-tab").click(function(e){
		var activeTab = $(".user-profile-tab-active").get()[0];
		$(activeTab).removeClass("user-profile-tab-active");
		$(this).addClass("user-profile-tab-active");
	});

	$("#user-profile-tabs-content-container").on("slid", function(e){
		console.log("Invoked");
		// Pause the carousel from sliding
		$("#user-profile-tabs-content-container").carousel("pause");
	});

	$(".nav-menu-element").click(function(e){
		var requestedTab = $(this).text().replace(/\s+/g, "").toLowerCase();
		window.location = "https://localhost/home.php?uid=" + uid + "&c=" + requestedTab;
	});
});

/*************************************************************************************************************
*
* Functions
*
*************************************************************************************************************/

function initUserProfile()
{	
	// vertical align .user-profile-tab text
	$(".user-profile-tab").css("line-height", $('.user-profile-tab').css("height"));

	// vertical align .user-profile-tab-content-container text
	$(".user-profile-tab-content-container").css("line-height", $('.user-profile-tab-content-container').css("height"));

	// Pause the carousel from sliding
	$("#user-profile-tabs-content-container").carousel("pause");
}
	