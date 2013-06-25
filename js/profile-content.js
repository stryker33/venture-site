$(document).ready(function(e){

});

/*************************************************************************************************************
*
* Functions
*
*************************************************************************************************************/

function generateProfile()
{
	$("#profile-image-container").css("background-image", "url('" + userInfo.user.profile_image + "')")
	$("#name-info-container").text(userInfo.user.first_name + " " + userInfo.user.last_name);
	$("#dob-info-container").text(userInfo.user.dob);
	$("#gender-info-container").text(userInfo.user.gender);
	$("#current-place-info-container").text("Currently at " + userInfo.user.current_home);
	$("#from-info-container").text("From " + userInfo.user.hometown);

	$.each(userInfo.edu_desc, function(index, value){
		$("#edu-info-container").append("<div class='edu-desc-info-container'>" + value.institute_name + "</div>");
	});
	$.each(userInfo.work_desc, function(index, value){
		$("#work-info-container").append("<div class='work-desc-info-container'>" + value.work_designation + " at " + value.work_place_name + "</div>");
	});
	
}