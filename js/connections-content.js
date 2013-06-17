$(document).ready(function(e){
	$("#search-connections").val("");

	// search-connections key-up handler
	$("#search-connections").on("keyup", function(e){
		var searchQuery = $("#search-connections").val();
		if(searchQuery != "")
		{
			$.each($(".c-user-container").get(), function(index, value){
				$(value).remove();
			});
			$.each(connections, function(index, connection){
				var userName = connection.user.first_name + " " + connection.user.last_name;
				var searchPattern = new RegExp(searchQuery);
				if(searchPattern.test(userName.toLowerCase()))
				{
					$("#connections-content").append(buildConnectedUser(connection));
				}
			});
		}
		else
		{
			$.each($(".c-user-container").get(), function(index, value){
				$(value).remove();
			});
			loadConnectionsInfo();
		}
	});

	// Click handler for link view-profile
	$(document).on("click", ".btn-c-view-profile", function(e){
		var u2 = $(this).parent().parent().parent().attr("uid");
		console.log(u2);
	});

	// Click handler for link disconnect
	$(document).on("click", ".btn-c-disconnect", function(e){
		var u2 = $(this).parent().parent().parent().attr("uid");
		
		$.ajax({
			url: "/php/disconnectUsers.php",
			type: "POST",
			data: {u1: uid, u2: u2},
			success: function(data){
				if(data == "1")
				{
					$(".c-user-container[uid=" + u2 + "] .c-user-btn-group .c-user-btn-connected").text("Disconnected");
					$(".c-user-container[uid='" + u2 + "']").delay(1000).fadeOut("500", function(e){
						$(".c-user-container[uid='" + u2 + "']").remove();
					});
				}
			}
		});
	});

	// Click handler for link block
	$(document).on("click", ".btn-c-block-user", function(e){
		var u2 = $(this).parent().parent().parent().attr("uid");
		console.log(u2);
	});
	
});
/*************************************************************************************************************
*
* Functions
*
*************************************************************************************************************/

function loadConnectionsInfo()
{
	$.each($(".c-user-container").get(), function(index, value){
		$(value).remove();
	});
	$.each(connections, function(index, value){
		$("#connections-content").append(buildConnectedUser(value));
	});
}

function buildConnectedUser(c_user)
{
	var conn_request_user = "<div class='user-container c-user-container' uid='" + c_user.user.uid+ "'>" + 
							"<div class='uc-profile-image-container c-profile-image-container' style='background-image: url(" + c_user.user.profile_image + ")'>" + 
							"</div>" + 
							"<div class='uc-user-info-container c-user-info-container' >" + 
								"<div class='uc-user-name-container c-user-name-container' >" + c_user.user.first_name + " " + c_user.user.last_name + "</div>" + 
								"<div class='uc-user-dob-container c-user-dob-container' >" + c_user.user.dob + "</div>" + 
								"<div class='uc-user-current-home-container c-user-current-home-container' >Currently at " + c_user.user.current_home + "</div>" + 
								"<div class='uc-user-hometown-container c-user-hometown-container' >From " + c_user.user.hometown + "</div>" + 
							"</div>" + 
							"<div class='uc-edu-info-container c-edu-info-container' >" + 
								"<div class='uc-edu-info-header c-edu-info-header' >Education</div>" + 
								"<hr class='horizontal-divider' >" + 
								"<div class='uc-edu-desc-container c-edu-desc-container' >" + c_user.edu_desc[0].institute_name + "</div>" + 
							"</div>" + 
							"<div class='uc-work-info-container c-work-info-container' >" + 
								"<div class='uc-work-info-header c-work-info-header' >Work</div>" +
								"<hr class='horizontal-divider' >" + 
								"<div class='uc-work-desc-container c-work-desc-container' >" +  c_user.work_desc[0].work_designation + " at " + 
								c_user.work_desc[0].work_place_name + "</div>" + 
							"</div>" + 
							"<div class='btn-group uc-user-btn-group c-user-btn-group' >" + 
								"<button class='btn btn-small c-user-btn-connected' disabled='disabled'>Connected</button>" + 
								"<button class='btn btn-small dropdown-toggle' data-toggle='dropdown' ><span class='caret' ></span></button>" + 
								"<ul class='dropdown-menu pull-right' >" + 
									"<li class='btn-c-view-profile' >View Profile</li>" + 
									"<li class='btn-c-disconnect' >Disconnect</li>" + 
									"<li class='btn-c-block-user' >Block</li>" + 
								"</ul>" + 
							"</div>" + 
						"</div>";

	return conn_request_user;
}