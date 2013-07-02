$(document).ready(function(e){

	// Click handler for btn-cr-accept
	$(document).on("click", ".btn-cr-accept", function(e){
		var from_user = $(this).parent().parent().attr("uid");
		$.ajax({
			url: "/php/respondConnectionRequest.php",
			method: "GET",
			async: false,
			data: {t: uid, f: from_user, r: "a", rel: "none"},
			success: function(data){
				if(data == "1 1")
				{
					$(".cr-user-container[uid=" + from_user + "] .cr-user-btn-group .btn-cr-accept").attr("disabled", "disabled")
																									.text("Connected");
					$(".cr-user-container[uid='" + from_user + "']").delay(1000).fadeOut("500", function(e){
						$(".cr-user-container[uid='" + from_user + "']").remove();
						loadConnections();
					});
				}
			}
		});
		loadConnections(); // home-base.js
	});

	// Click handler for btn-cr-reject
	$(document).on("click", ".btn-cr-reject", function(e){
		var from_user = $(this).parent().parent().parent().attr("uid");
		$.ajax({
			url: "/php/respondConnectionRequest.php",
			method: "GET",
			async: false,
			data: {t: uid, f: from_user, r: "r", rel: "none"},
			success: function(data){
				if(data == "1")
				{
					$(".cr-user-container[uid=" + from_user + "] .cr-user-btn-group .btn-cr-accept").attr("disabled", "disabled")
																									.text("Connection Request Rejected");
					$(".cr-user-container[uid='" + from_user + "']").delay(1000).fadeOut("500", function(e){
						$(".cr-user-container[uid='" + from_user + "']").remove();
					});
				}
			}
		});
	});

	// Click handler for btn-cr-rl
	$(document).on("click", ".btn-cr-rl", function(e){
		var from_user = $(this).parent().parent().parent().attr("uid");
		$.ajax({
			url: "/php/respondConnectionRequest.php",
			method: "GET",
			async: false,
			data: {t: uid, f: from_user, r: "rl", rel: "none"},
			success: function(data){
				if(data == "1")
				{
					$(".cr-user-container[uid=" + from_user + "] .cr-user-btn-group .btn-cr-accept").attr("disabled", "disabled")
																									.text("Blocked");
					$(".cr-user-container[uid='" + from_user + "']").delay(1000).fadeOut("500", function(e){
						$(".cr-user-container[uid='" + from_user + "']").remove();
					});
				}
			}
		});
	});

	// Key-up handler for search-connection-rqeuests
	$("#search-connection-requests").on("keyup", function(e){
		var searchQuery = $("#search-connection-requests").val();
		if(searchQuery != "")
		{
			$.each($(".cr-user-container").get(), function(index, value){
				$(value).remove();
			});
			$.each(connection_requests, function(index, request){
				var userName = request.user.user.first_name + " " + request.user.user.last_name;
				var searchPattern = new RegExp(searchQuery);
				if(searchPattern.test(userName.toLowerCase()))
				{
					$("#connection-requests-content").append(buildConnectionRequestUser(request));
				}
			});
		}
		else
		{
			$.each($(".cr-user-container").get(), function(index, value){
				$(value).remove();
			});
			loadConnectionRequests();
		}
	});
});

/*************************************************************************************************************
*
* Functions
*
*************************************************************************************************************/

// Loads the connection_requests
function loadConnectionRequests()
{
	generateNotificationsIndicator(); // nav-menu-base.js
	$.each(connection_requests, function(index, cr_user){
		$(buildConnectionRequestUser(cr_user)).hide().appendTo("#connection-requests-content").fadeIn("fast");
	});
}

function buildConnectionRequestUser(cr_user)
{
	var conn_request_user = "<div class='user-container cr-user-container' uid='" + cr_user.user.user.uid+ "'>" + 
							"<div class='uc-profile-image-container cr-profile-image-container' style='background-image: url(" + cr_user.user.user.profile_image + ")'>" + 
							"</div>" + 
							"<div class='uc-user-info-container cr-user-info-container' >" + 
								"<div class='uc-user-name-container cr-user-name-container' >" + cr_user.user.user.first_name + " " + cr_user.user.user.last_name + "</div>" + 
								"<div class='uc-user-dob-container cr-user-dob-container' >" + cr_user.user.user.dob + "</div>" + 
								"<div class='uc-user-current-home-container cr-user-current-home-container' >Currently at " + cr_user.user.user.current_home + "</div>" + 
								"<div class='uc-user-hometown-container cr-user-hometown-container' >From " + cr_user.user.user.hometown + "</div>" + 
							"</div>" + 
							"<div class='uc-edu-info-container cr-edu-info-container' >" + 
								"<div class='uc-edu-info-header cr-edu-info-header' >Education</div>" + 
								"<hr class='horizontal-divider' >" + 
								"<div class='uc-edu-desc-container cr-edu-desc-container' >" + cr_user.user.edu_desc[0].institute_name + "</div>" + 
							"</div>" + 
							"<div class='uc-work-info-container cr-work-info-container' >" + 
								"<div class='uc-work-info-header cr-work-info-header' >Work</div>" +
								"<hr class='horizontal-divider' >" + 
								"<div class='uc-work-desc-container cr-work-desc-container' >" + cr_user.user.work_desc[0].work_designation + " at " + 
								cr_user.user.work_desc[0].work_place_name + "</div>" + 
							"</div>" + 
							"<div class='btn-group uc-user-btn-group cr-user-btn-group' >" + 
								"<button class='btn btn-small btn-cr-accept' title='Accept Connection Request' >Accept Connection Request</button>" + 
								"<button class='btn btn-small dropdown-toggle' data-toggle='dropdown' ><span class='caret'></span></button>" + 
								"<ul class='dropdown-menu pull-right' >" + 
									"<li class='btn-cr-reject' >Reject Connection Request</li>" + 
									"<li class='btn-cr-rl' >Block</li>" + 
								"</ul>" + 
							"</div>" + 
						"</div>";

	return conn_request_user;
}

function connectionRequestsSeen()
{
	$.each(connection_requests, function(index, request){
		if(request.request_status == "pending_approval")
		{
			$.ajax({
				url: "/php/respondConnectionRequest.php",
				type: "GET",
				data: {t: uid, f: request.user.user.uid, r: "rl", rel: "none"},
				success: function(data){	
					request.request_status = "delayed_for_review";
				}	
			});
		}
	});
}