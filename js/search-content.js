$(document).ready(function(e){
	$(document).on("click", ".sc-user-btn-connect", function(e){
		var to_uid = $(this).parent().parent().attr("uid")
		$.ajax({
			url: "/php/sendConnectionRequest.php",
			method: "POST",
			data: {from: uid, to: to_uid},
			success: function(data){
				if(data == "1")
				{
					$(".sc-user-container[uid=" + to_uid + "] .sc-user-btn-group .sc-user-btn-connect").attr("disabled", "disabled")
						                                                                               .text("Connection Request Send");

					console.log($(".sc-user-container[uid=" + to_uid + "] .sc-user-btn-group ul li:last-child").before("<li>Cancel Connection Request</li>"));
				}
					
			}
		});
	});
});

/*************************************************************************************************************
*
* Functions
*
*************************************************************************************************************/

function populateSearchContent(searchResult)
{
	$(".sc-user-container").remove();
	$.each(searchResult, function(index, value){
		$(buildSearchResultUser(value)).hide().appendTo("#search-content").fadeIn("fast");
		resizeImageContainers();
	});
}

function buildSearchResultUser(searchUserInfo)
{
	var scUserContainer = "<div class='user-container sc-user-container' uid=" + searchUserInfo.uid + ">" + 
							"<div class='image-container uc-profile-image-container sc-profile-image-container' style='background-image: url(" + searchUserInfo.profile_image + ")'>" + 
							"</div>" + 
							"<div class='uc-user-info-container sc-user-info-container' >" + 
								"<div class='uc-user-name-container sc-user-name-container' >" + searchUserInfo.first_name + " " + searchUserInfo.last_name + "</div>" + 
								"<div class='uc-user-dob-container sc-user-dob-container' >" + searchUserInfo.dob + "</div>" + 
								"<div class='uc-user-current-home-container sc-user-current-home-container' >Currently at " + searchUserInfo.current_home + "</div>" + 
								"<div class='uc-user-hometown-container sc-user-hometown-container' >From " + searchUserInfo.hometown + "</div>" + 
							"</div>" + 
							"<div class='uc-edu-info-container sc-edu-info-container' >" + 
								"<div class='uc-edu-info-header sc-edu-info-header' >Education</div>" + 
								"<hr class='horizontal-divider'>" + 
								"<div class='uc-edu-desc-container sc-edu-desc-container' >" + searchUserInfo.institute_name+ "</div>" + 
							"</div>" + 
							"<div class='uc-work-info-container sc-work-info-container' >" + 
								"<div class='uc-work-info-header sc-work-info-header' >Work</div>" + 
								"<hr class='horizontal-divider'>" + 
								"<div class='uc-work-desc-container sc-work-desc-container' >" + searchUserInfo.work_designation + " at " + searchUserInfo.work_place_name + "</div>" + 
							"</div>";

	var scUserBtnConnect = "";
	if(searchUserInfo.connection_status == "")
	{
		scUserBtnConnect = "<div class='btn-group uc-user-btn-group sc-user-btn-group' >" + 
								"<button class='btn btn-small sc-user-btn-connect' title='Send Connection Request' >Connect</button>" + 
								"<button class='btn btn-small dropdown-toggle' data-toggle='dropdown' ><span class='caret' ></span></button>" + 
								"<ul class='dropdown-menu pull-right' >" + 
									"<li>View Profile</li>" + 
									"<li>Block</li>" + 
								"</ul>" + 
							   "</div>";
	}
	else if(searchUserInfo.connection_status == "connected")
	{
		scUserBtnConnect = "<div class='btn-group uc-user-btn-group sc-user-btn-group' >" + 
								"<button class='btn btn-small sc-user-btn-connect' title='Send Connection Request' disabled='disabled'>Connected</button>" + 
								"<button class='btn btn-small dropdown-toggle' data-toggle='dropdown' ><span class='caret' ></span></button>" + 
								"<ul class='dropdown-menu pull-right' >" + 
									"<li>View Profile</li>" + 
									"<li>Disconnect</li>" + 
									"<li>Block</li>" + 
								"</ul>" + 
							   "</div>";
	}
	else if(searchUserInfo.connection_status == "pending_approval" || searchUserInfo.connection_status == "delayed_for_review")
	{
		scUserBtnConnect = "<div class='btn-group uc-user-btn-group sc-user-btn-group' >" + 
								"<button class='btn btn-small sc-user-btn-connect' title='Send Connection Request' disabled='disabled' >Connection Request Send</button>" + 
								"<button class='btn btn-small dropdown-toggle' data-toggle='dropdown' ><span class='caret' ></span></button>" + 
								"<ul class='dropdown-menu pull-right' >" + 
									"<li>View Profile</li>" + 
									"<li>Cancel Connection Request</li>" + 
									"<li>Block</li>" + 
								"</ul>" + 
							   "</div>";
	}

	scUserContainer = scUserContainer + scUserBtnConnect + "</div>";

	return scUserContainer;
}