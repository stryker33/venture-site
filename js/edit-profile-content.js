var newUserInfo = initNewUserInfo();
var epEduDescCount = 0, epWorkDescCount = 0;
var epProfileImage, epImageChanged = false, baseValuesChanged = false;;
/*************************************************************************************************************
*
* Handlers
*
*************************************************************************************************************/

$(document).ready(function(e){
	$("#btn-ep-save-changes").attr("disabled", "disabled");

	// Handler to remove the span and replace with an input-box and a button
	$(document).on("click", "#ep-first-name, #ep-last-name, .ep-institute-name, .ep-work-designation, .ep-work-place-name, #ep-email-id, #ep-id-url", function(e){
		var parent = $(this).parent();
		var clickedElement = $(this);
		var oldValue = $(this).text();

		$(this).remove();

		if($(clickedElement).attr("id") == "ep-first-name")
		{
			var inputContainer = "<div class='textbox-container ep-edit-input-container' oldValue='" + oldValue + "' >" + 
								 	"<input class='textbox cap' id='ep-first-name-input' type='text' placeholder='First Name' />" + 
								 	"<button class='btn btn-primary btn-mini ep-input-done' ><i class='icon-ok icon-white' ></i></button>" + 
							     "</div>";
			var appendedElement = $(inputContainer).appendTo(parent);
			var input = $(appendedElement).children()[0];
			$(input).focus();
			//$("#ep-first-name-input").focus();
		}

		if($(clickedElement).attr("id") == "ep-last-name")
		{
			var inputContainer = "<div class='textbox-container ep-edit-input-container' oldValue='" + oldValue + "' >" + 
								 	"<input class='textbox cap' id='ep-last-name-input' type='text' placeholder='Last Name' />" + 
								 	"<button class='btn btn-primary btn-mini ep-input-done' ><i class='icon-ok icon-white' ></i></button>" + 
							     "</div>";
			var appendedElement = $(inputContainer).appendTo(parent);
			var input = $(appendedElement).children()[0];
			$(input).focus();
		}
		if($(clickedElement).attr("class") == "ep-field-name ep-institute-name")
		{
			var inputContainer = "<div class='textbox-container ep-edit-input-container' oldValue='" + oldValue + "' >" + 
								 	"<input class='textbox ep-institute-name-input alpha cap' type='text' placeholder='Institute Name' />" + 
								 	"<button class='btn btn-primary btn-mini ep-input-done' ><i class='icon-ok icon-white' ></i></button>" + 
							     "</div>";
			var appendedElement = $(inputContainer).appendTo(parent);
			var input = $(appendedElement).children()[0];
			$(input).focus();
		}
		if($(clickedElement).attr("class") == "ep-field-name ep-work-designation")
		{
			var inputContainer = "<div class='textbox-container ep-edit-input-container' oldValue='" + oldValue + "' >" + 
								 	"<input class='textbox ep-work-designation-input alpha cap' type='text' placeholder='Work Designation' />" + 
								 	"<button class='btn btn-primary btn-mini ep-input-done' ><i class='icon-ok icon-white' ></i></button>" + 
							     "</div>";
			var appendedElement = $(inputContainer).appendTo(parent);
			var input = $(appendedElement).children()[0];
			$(input).focus();
		}
		if($(clickedElement).attr("class") == "ep-field-name ep-work-place-name")
		{
			var inputContainer = "<div class='textbox-container ep-edit-input-container' oldValue='" + oldValue + "' >" + 
								 	"<input class='textbox ep-work-place-name-input alpha cap' type='text' placeholder='Work Place Name' />" + 
								 	"<button class='btn btn-primary btn-mini ep-input-done' ><i class='icon-ok icon-white' ></i></button>" + 
							     "</div>";
			var appendedElement = $(inputContainer).appendTo(parent);
			var input = $(appendedElement).children()[0];
			$(input).focus();
		}
		if($(clickedElement).attr("id") == "ep-email-id")
		{
			var inputContainer = "<div class='textbox-container ep-edit-input-container' oldValue='" + oldValue + "' >" + 
								 	"<input class='textbox' id='ep-emailid-input' type='text' placeholder='Email ID' />" + 
								 	"<button class='btn btn-primary btn-mini ep-input-done' ><i class='icon-ok icon-white' ></i></button>" + 
							     "</div>";
			var appendedElement = $(inputContainer).appendTo(parent);
			var input = $(appendedElement).children()[0];
			$(input).focus();
		}
		if($(clickedElement).attr("id") == "ep-id-url")
		{
			var inputContainer = "<div class='textbox-container ep-edit-input-container' oldValue='" + oldValue + "' >" + 
								 	"<input class='textbox' id='ep-id-url-input' type='text' placeholder='Identifier URL' />" + 
								 	"<button class='btn btn-primary btn-mini ep-input-done' ><i class='icon-ok icon-white' ></i></button>" + 
							     "</div>";
			var appendedElement = $(inputContainer).appendTo(parent);
			var input = $(appendedElement).children()[0];
			$(input).focus();
		}
	});

	// Handler to replace the input-box and the button with a span containing the entered value
	$(document).on("click", ".ep-input-done", function(e){
		var mainParent = $(this).parent().parent().parent().parent().parent().parent();
		var td = $(this).parent().parent();
		var parent = $(this).parent();
		var input = $(this).prev();
		var inputValue = $(this).prev().val();

		if($(input).attr("id") == "ep-first-name-input")
		{
			if(inputValue.replace(/\s+/g, "") == "" || inputValue == $(this).parent().attr("oldValue"))
			{
				$(td).append("<span class='ep-field-name' id='ep-first-name' >" + $(this).parent().attr("oldValue") + "</span>");
				$(this).parent().remove();
				return;
			}
			$(td).append("<span class='ep-field-name' id='ep-first-name' >" + capitalize(inputValue) + "</span>");
			newUserInfo["user"]["first_name"] = $("#ep-first-name").text();
		}

		if($(input).attr("id") == "ep-last-name-input")
		{
			if(inputValue.replace(/\s+/g, "") == "" || inputValue == $(this).parent().attr("oldValue"))
			{
				$(td).append("<span class='ep-field-name' id='ep-last-name' >" + $(this).parent().attr("oldValue") + "</span>");
				$(this).parent().remove();
				return;
			}
			$(td).append("<span class='ep-field-name' id='ep-last-name' >" + capitalize(inputValue) + "</span>");
			newUserInfo["user"]["last_name"] = $("#ep-last-name").text();
		}

		if($(input).attr("class") == "textbox ep-institute-name-input alpha cap")
		{
			if(inputValue.replace(/\s+/g, "") == "" || inputValue == $(this).parent().attr("oldValue"))
			{
				$(td).append("<span class='ep-field-name ep-institute-name' >" + $(this).parent().attr("oldValue") + "</span>");
				$(this).parent().remove();
				return;
			}
			$(td).append("<span class='ep-field-name ep-institute-name'>" + capitalize(inputValue) + "</span>");
			newUserInfo["edu_desc"][parseInt($(mainParent).attr("position"))]["institute_name"] = capitalize(inputValue);
			newUserInfo["edu_desc"][parseInt($(mainParent).attr("position"))]["update_status"] = "changed";
		}

		if($(input).attr("class") == "textbox ep-work-designation-input alpha cap")
		{
			if(inputValue.replace(/\s+/g, "") == "" || inputValue == $(this).parent().attr("oldValue"))
			{
				$(td).append("<span class='ep-field-name ep-work-designation' >" + $(this).parent().attr("oldValue") + "</span>");
				$(this).parent().remove();
				return;
			}
			$(td).append("<span class='ep-field-name ep-work-designation'>" + capitalize(inputValue) + "</span>");
			newUserInfo["work_desc"][parseInt($(mainParent).attr("position"))]["work_designation"] = capitalize(inputValue);
			newUserInfo["work_desc"][parseInt($(mainParent).attr("position"))]["update_status"] = "changed";
		}

		if($(input).attr("class") == "textbox ep-work-place-name-input alpha cap")
		{
			if(inputValue.replace(/\s+/g, "") == "" || inputValue == $(this).parent().attr("oldValue"))
			{
				$(td).append("<span class='ep-field-name ep-work-place-name' >" + $(this).parent().attr("oldValue") + "</span>");
				$(this).parent().remove();
				return;
			}
			$(td).append("<span class='ep-field-name ep-work-place-name'>" + capitalize(inputValue) + "</span>");
			newUserInfo["work_desc"][parseInt($(mainParent).attr("position"))]["work_place_name"] = capitalize(inputValue);
			newUserInfo["work_desc"][parseInt($(mainParent).attr("position"))]["update_status"] = "changed";
		}

		if($(input).attr("id") == "ep-emailid-input")
		{
			if(inputValue.replace(/\s+/g, "") == "" || inputValue == $(this).parent().attr("oldValue"))
			{
				$(td).append("<span class='ep-field-name' id='ep-email-id' >" + $(this).parent().attr("oldValue") + "</span>");
				$(this).parent().remove();
				return;
			}

			var mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			if(!mailPattern.test($("#ep-emailid-input").val()))
			{
				$("#ep-email-id-error").fadeIn("fast");
				return;
			}
			$("#ep-email-id-error").fadeOut("fast");
			$(td).append("<span class='ep-field-name' id='ep-email-id' >" + inputValue + "</span>");
			//newUserInfo["user"]["first_name"] = $("#ep-first-name").text();
		}

		if($(input).attr("id") == "ep-id-url-input")
		{
			if(inputValue.replace(/\s+/g, "") == "" || inputValue == $(this).parent().attr("oldValue"))
			{
				$(td).append("<span class='ep-field-name' id='ep-id-url' >" + $(this).parent().attr("oldValue") + "</span>");
				$(this).parent().remove();
				return;
			}
			$(td).append("<span class='ep-field-name' id='ep-id-url' >" + inputValue + "</span>");
			//newUserInfo["user"]["first_name"] = $("#ep-first-name").text();
		}

		if($(input).attr("id") == "ep-current-home-input")
		{
			if(inputValue.replace(/\s+/g, "") == "" || inputValue == $(this).parent().attr("oldValue"))
			{
				$(td).append("<span class='ep-field-name' id='ep-current-home' >" + $(this).parent().attr("oldValue") + "</span>");
				$(this).parent().remove();
				return;
			}
			$(td).append("<span class='ep-field-name' id='ep-current-home' >" + inputValue + "</span>");
			newUserInfo["user"]["current_home"] = $("#ep-current-home").text();
		}

		if($(input).attr("id") == "ep-hometown-input")
		{
			if(inputValue.replace(/\s+/g, "") == "" || inputValue == $(this).parent().attr("oldValue"))
			{
				$(td).append("<span class='ep-field-name' id='ep-hometown' >" + $(this).parent().attr("oldValue") + "</span>");
				$(this).parent().remove();
				return;
			}
			$(td).append("<span class='ep-field-name' id='ep-hometown' >" + inputValue + "</span>");
			newUserInfo["user"]["hometown"] = $("#ep-hometown").text();
		}

		$("#btn-ep-save-changes").removeAttr("disabled");
		baseValuesChanged = true;
		$(this).parent().remove();
	});


	// Handler to replace span with select and a button
	$(document).on("click", "#ep-gender", function(e){
		var parent = $(this).parent();
		var oldValue = $(this).val();
		$(this).remove();

		var selectContainer = "<div class='textbox-container ep-edit-input-container' oldValue='" + oldValue + "'>" + 
								"<select id='ep-select-gender'>" + 
							  		"<option value='Male'>Male</option>" + 
							  		"<option value='Female'>Female</option>" + 
							    "</select>" + 	
								"<button class='btn btn-primary btn-mini ep-select-done' ><i class='icon-ok icon-white' ></i></button>" + 
							 "</div>";

		var appendedElement = $(selectContainer).appendTo(parent);
		$(appendedElement).children()[0].focus();
	});

	// Handler to replace the select and the button tag with a span
	$(document).on("click", ".ep-select-done", function(e){
		var td = $(this).parent().parent();
		var select = $(this).prev();
		var selectedValue = $(select).val();
		
		$(this).parent().remove();
		if($(select).attr("id") == "ep-select-gender")
		{
			if(selectedValue == $(this).parent().attr("oldValue"))
			{
				$(td).append("<span class='ep-field-name' id='ep-gender' >" + $(this).parent().attr("oldValue") + "</span>");
				$(this).parent().remove();
				return;
			}
			$(td).append("<span class='ep-field-name' id='ep-gender' >" + selectedValue + "</span>");
			newUserInfo["user"]["gender"] = $("#ep-gender").text();
			$("#btn-ep-save-changes").removeAttr("disabled");
			baseValuesChanged = true;
		}
	});

	// Handler to replace dob-span with a datepicker and a button
	$(document).on("click", "#ep-dob", function(e){
		var parent = $(this).parent();
		var clickedElement = $(this);
		var oldValue = $(this).text();
		$(this).remove();

		var datePickerContainer = "<div class='textbox-container ep-edit-input-container' oldValue='" + oldValue + "' >" + 
								 	"<input class='textbox restrict' id='ep-dob-input' type='text' placeholder='Date of Birth' />" + 
								 	"<button class='btn btn-primary btn-mini ep-date-done' ><i class='icon-ok icon-white' ></i></button>" + 
							      "</div>";

		var appendedElement = $(datePickerContainer).appendTo(parent);
		initDatepicker($("#ep-dob-input"));
		$("#ep-dob-input").datepicker("option", "autoSize", true);
		$(appendedElement).children()[0].focus();
	});

	// Handler to replace datepicker and the button with a span
	$(document).on("click", ".ep-date-done", function(e){
		var td = $(this).parent().parent();

		var datePicker = $(this).prev();
		$(this).parent().remove();

		if($(datePicker).attr("id") == "ep-dob-input")
		{
			if($(datePicker).val().replace(/\s+/g, "") == "" || $(datePicker).val() == $(this).parent().attr("oldValue"))
			{
				$(td).append("<span class='ep-field-name' id='ep-dob' >" + $(this).parent().attr("oldValue") + "</span>");
				$(this).parent().remove();
				return;
			}
			$(td).append("<span class='ep-field-name' id='ep-dob' >" + $(datePicker).val() + "</span>")
			newUserInfo["user"]["dob"] = $("#ep-dob").text();
			$("#btn-ep-save-changes").removeAttr("disabled");
			baseValuesChanged = true;
		}
	});

	// Handler to replace current-home and hometown span with a input-box and a button
	$(document).on("click", "#ep-current-home, #ep-hometown", function(e){
		var parent = $(this).parent();
		var clickedElement = $(this);
		var oldValue = $(this).text();
		$(this).remove();

		if($(clickedElement).attr("id") == "ep-current-home")
		{
			var inputContainer = "<div class='textbox-container ep-edit-input-container' oldValue='" + oldValue + "' >" + 
								 	"<input class='textbox' id='ep-current-home-input' type='text' placeholder='Current Home' />" + 
								 	"<button class='btn btn-primary btn-mini ep-input-done' ><i class='icon-ok icon-white' ></i></button>" + 
							     "</div>";

			var appendedElement = $(inputContainer).appendTo(parent);
			initLocationAutocomplete($("#ep-current-home-input"));
			$($(appendedElement).children()[0]).focus();
		}

		if($(clickedElement).attr("id") == "ep-hometown")
		{
			var inputContainer = "<div class='textbox-container ep-edit-input-container' oldValue='" + oldValue + "' >" + 
								 	"<input class='textbox' id='ep-hometown-input' type='text' placeholder='Hometown' />" + 
								 	"<button class='btn btn-primary btn-mini ep-input-done' ><i class='icon-ok icon-white' ></i></button>" + 
							     "</div>";

			var appendedElement = $(inputContainer).appendTo(parent);
			initLocationAutocomplete($("#ep-hometown-input"));
			$($(appendedElement).children()[0]).focus();
		}
	});

	// Adds the edu-info container to ep-edu-info-container
	$(document).on("click", ".btn-ep-add-info", function(e){
		var infoContainer = "";
		var parent;
		if($(this).attr("id") == "btn-ep-edu-info-add")
		{
			infoContainer = "<div class='ep-desc-info-container' position='" + epEduDescCount + "' >" + 
								"<table>" + 
									"<tr>" + 
										"<td><span class='ep-field-name' >Institute Name : </span></td>" + 
										"<td>" + 
											"<div class='textbox-container ep-edit-input-container' >" + 
								 				"<input class='textbox ep-institute-name-input alpha cap' type='text' placeholder='Institute Name' />" + 
								 				"<button class='btn btn-primary btn-mini ep-live-input-done' ><i class='icon-ok icon-white' ></i></button>" + 
							     			"</div>" + 
										"</td>" + 
									"</tr>" + 
									"<tr>" + 
										"<td><span class='ep-field-name' >From : </span></td>" + 
										"<td><span class='ep-field-name ep-edu-from' >31 August, 2008</span></td>" + 
										"<td><span class='ep-field-name' >To : </span></td>" + 
										"<td><span class='ep-field-name ep-edu-to' >16 June, 2012</span></td>" + 
									"</tr>" + 
								"</table>" +
								"<button class='btn btn-mini btn-ep-remove-info' >Remove</button>" + 
							"</div>";
			parent = $("#ep-edu-info-container");
			newUserInfo["edu_desc"][epEduDescCount] = {};
			newUserInfo["edu_desc"][epEduDescCount]["institute_name"] = "";
			newUserInfo["edu_desc"][epEduDescCount++]["update_status"] = "new";
		}

		if($(this).attr("id") == "btn-ep-work-info-add")
		{
			infoContainer = "<div class='ep-desc-info-container' position='" + epWorkDescCount + "' >" + 
								"<table>" + 
									"<tr>" + 
										"<td><span class='ep-field-name' >Work Designation : </span></td>" + 
										"<td>" + 
											"<div class='textbox-container ep-edit-input-container' >" + 
								 				"<input class='textbox ep-work-designation-input alpha cap' type='text' placeholder='Work Designation' />" + 
								 				"<button class='btn btn-primary btn-mini ep-live-input-done' ><i class='icon-ok icon-white' ></i></button>" + 
							     			"</div>" + 
										"</td>" + 
									"</tr>" + 
									"<tr>" + 
										"<td><span class='ep-field-name' >Work Place Name : </span></td>" + 
										"<td>" + 
											"<div class='textbox-container ep-edit-input-container' >" + 
								 				"<input class='textbox ep-work-place-name-input alpha cap' type='text' placeholder='Work Place Name' />" + 
								 				"<button class='btn btn-primary btn-mini ep-live-input-done' ><i class='icon-ok icon-white' ></i></button>" + 
							     			"</div>" + 
										"</td>" + 
									"</tr>" + 
									"<tr>" + 
										"<td><span class='ep-field-name' >From : </span></td>" + 
										"<td><span class='ep-field-name ep-work-from' >01 July, 2012</span></td>" + 
										"<td><span class='ep-field-name' >To : </span></td>" + 
										"<td><span class='ep-field-name ep-work-to' >31 March, 2013</span></td>" + 
									"</tr>" + 
								"</table>" + 
								"<button class='btn btn-mini btn-ep-remove-info' >Remove</button>" + 
							"</div>";

			parent = $("#ep-work-info-container");
			newUserInfo["work_desc"][epWorkDescCount] = {};
			newUserInfo["work_desc"][epWorkDescCount]["work_designation"] = "";
			newUserInfo["work_desc"][epWorkDescCount]["work_place_name"] = "";
			newUserInfo["work_desc"][epWorkDescCount++]["update_status"] =  "new";
		}

		var appendedElement = $(infoContainer).appendTo(parent);
	});

	$(document).on("click", ".ep-live-input-done", function(e){
		var td = $(this).parent().parent();
		var mainParent = $(this).parent().parent().parent().parent().parent().parent();
		var input = $(this).prev();
		var inputValue = $(input).val();
		if($(input).val().replace(/\s+/g, "") == "")
			return;

		$(this).parent().remove();
		if($(input).attr("class") == "textbox ep-institute-name-input alpha cap")
		{
			$(td).append("<span class='ep-field-name ep-institute-name'>" + capitalize(inputValue) + "</span>");
			newUserInfo["edu_desc"][parseInt($(mainParent).attr("position"))]["institute_name"] = capitalize(inputValue);
		}
			
		if($(input).attr("class") == "textbox ep-work-designation-input alpha cap")
		{
			$(td).append("<span class='ep-field-name ep-work-designation'>" + capitalize(inputValue) + "</span>");
			newUserInfo["work_desc"][parseInt($(mainParent).attr("position"))]["work_designation"] = capitalize(inputValue);
		}
		if($(input).attr("class") == "textbox ep-work-place-name-input alpha cap")
		{
			$(td).append("<span class='ep-field-name ep-work-place-name'>" + capitalize(inputValue) + "</span>");
			newUserInfo["work_desc"][parseInt($(mainParent).attr("position"))]["work_place_name"] = capitalize(inputValue);
		}

		$("#btn-ep-save-changes").removeAttr("disabled");
		baseValuesChanged = true;
	});

	$("#ep-change-image-container").click(function(e){
		$("#ep-profile-image-selector").click();
	});

	$("#ep-profile-image-selector").change(function(e) {
		var imageFile = e.target.files[0];
		if (imageFile) {
			if (!imageFile.type.match("image.*")) {
				alert("Not an Image File.");
				$(this).click();
				return false;
			}

			var reader = new FileReader();
			reader.onload = function(event) {
				$("#ep-image-container").css("background-image", "url('" + event.target.result + "')")
				//profileImage = event.target.result;
				imageSelected = true;
			};
			reader.readAsDataURL(imageFile);
		}
	});

	$("#ep-profile-image-selector").fileupload({
		//url: "php/upload_profile_image.php",
		add: function(e, data) {
			$("#ep-profile-image-selector").change();			
			epProfileImage = data;
			epImageChanged = true;
			$("#btn-ep-save-changes").removeAttr("disabled");
		}
	});

	// Click handler for btn-ep-save-changes
	$("#btn-ep-save-changes").click(function(e){
		
		if(baseValuesChanged == true)
		{
			$.ajax({
				url: "/php/updateProfile.php",
				type: "POST",
				async: false,
				data: {uid: uid, nui: newUserInfo},
				success: function(data){
					if(data == "updated")
					{
						$("#btn-ep-save-changes").css("width", "auto").addClass("btn-success").text("Profile Update Successful");
						setTimeout(function(e){
							$("#home-tab").click();
							$("#main-menu-control-container").click();
							}, 1500);
						loadUserInfo();
					}
				},
				error: function(jqXHR, textStatus, errorThrown){
			
				}
			});
		}
		
		if(epImageChanged == true)
		{
			$("#ep-profile-image-selector").fileupload("option", "url", "php/upload_profile_image.php?uid=" + uid);
			epProfileImage.submit();
			$("#btn-ep-save-changes").css("width", "auto").addClass("btn-success").text("Profile Update Successful");
			setTimeout(function(e){
				$("#home-tab").click();
				$("#main-menu-control-container").click();
			}, 1500);
		}
	});

});

/*************************************************************************************************************
*
* Functions
*
*************************************************************************************************************/

function generateEditProfile()
{
	//newUserInfo = initNewUserInfo();
	$("#ep-image-container").css("background-image", "url('" + userInfo.user.profile_image + "')")
	$("#ep-first-name").text(userInfo.user.first_name);
	$("#ep-last-name").text(userInfo.user.last_name);
	if(userInfo.user.gender == "M")
		$("#ep-gender").text("Male");
	else if(userInfo.user.gender == "F")
		$("#ep-gender").text("Female");
	$("#ep-dob").text(userInfo.user.dob);
	$("#ep-current-home").text(userInfo.user.current_home);
	$("#ep-hometown").text(userInfo.user.hometown);

	$.each(userInfo.edu_desc, function(index, edu_desc){
		var desc = "<div class='ep-desc-info-container' position='" + epEduDescCount + "'>" + 
						"<table>" + 
							"<tr>" + 
								"<td><span class='ep-field-name' >Institute Name : </span></td>" + 
								"<td><span class='ep-field-name ep-institute-name' >" + edu_desc.institute_name + "</span></td>" + 
							"</tr>" + 
							"<tr>" + 
								"<td><span class='ep-field-name' >From : </span></td>" + 
								"<td><span class='ep-field-name ep-edu-from' >31 August, 2008</span></td>" + 
								"<td><span class='ep-field-name' >To : </span></td>" + 
								"<td><span class='ep-field-name ep-edu-to' >16 June, 2012</span></td>" +
							"</tr>" + 
						"</table>" + 
						"<button class='btn btn-mini btn-ep-remove-info' >Remove</button>" + 
					"</div>";

		$("#ep-edu-info-container").append(desc);
		newUserInfo["edu_desc"][epEduDescCount] = {};
		newUserInfo["edu_desc"][epEduDescCount]["institute_name"] = edu_desc.institute_name;
		newUserInfo["edu_desc"][epEduDescCount++]["update_status"] = "unchanged";
	});

	$.each(userInfo.work_desc, function(index, work_desc){
		var desc = "<div class='ep-desc-info-container' position='" + epWorkDescCount + "'>" + 
						"<table>" + 
							"<tr>" + 
								"<td><span class='ep-field-name' >Work Designation : </span></td>" + 
								"<td><span class='ep-field-name ep-work-designation' >" + work_desc.work_designation + "</span></td>" + 
							"</tr>" + 
							"<tr>" + 
								"<td><span class='ep-field-name' >Work Place Name : </span></td>" + 
								"<td><span class='ep-field-name ep-work-place-name' >" + work_desc.work_place_name + "</span></td>" + 
							"</tr>" + 
							"<tr>" + 
								"<td><span class='ep-field-name' >From : </span></td>" + 
								"<td><span class='ep-field-name ep-work-from' >31 August, 2008</span></td>" + 
								"<td><span class='ep-field-name' >To : </span></td>" + 
								"<td><span class='ep-field-name ep-work-to' >16 June, 2012</span></td>" +
							"</tr>" + 
						"</table>" + 
						"<button class='btn btn-mini btn-ep-remove-info' >Remove</button>" + 
					"</div>";

		$("#ep-work-info-container").append(desc);
		newUserInfo["work_desc"][epWorkDescCount] = {};
		newUserInfo["work_desc"][epWorkDescCount]["work_designation"] = work_desc.work_designation;
		newUserInfo["work_desc"][epWorkDescCount]["work_place_name"] = work_desc.work_place_name;
		newUserInfo["work_desc"][epWorkDescCount++]["update_status"] =  "unchanged";
	}); 
}

function initLocationAutocomplete(selector)
{
	selector.autocomplete({
		create : function(event, ui) {
			$(".ui-autocomplete").css({
				"font-family" : "'Ubuntu', sans-serif",
				"font-size" : "11px",
				"font-weight" : "700"
			});
		},
		source : function(request, response) {
			$.ajax({
				url : "http://ws.geonames.org/searchJSON",
				dataType : "jsonp",
				data : {
					featureClass : "P",
					style : "full",
					maxRows : 15,
					name_startsWith : request.term
				},
				success : function(data) {
					response($.map(data.geonames, function(item) {
						return {
							label : item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryCode,
							value : item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryCode
						}
					}));
				}
			});
		},
		minLength : 1
	});
}

function initNewUserInfo()
{
	var newUserInfo = {};
	newUserInfo["user"] = {};
	newUserInfo["edu_desc"] = {};
	newUserInfo["work_desc"] = {};

	return newUserInfo;
}