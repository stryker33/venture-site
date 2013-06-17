// Global Variables
var action;
var imageSelected = false;
var RecaptchaOptions = {
	theme : "clean"
};

$(document).ready(function(e) {
	parseAction();

	// current-home, hometown autocomplete
	$("#current-home, #hometown").autocomplete({
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

	/******************************************************************************/
	/*
	*
	* Event Handlers
	*
	*/
	/******************************************************************************/

	// action-register click handler
	$("#action-register-container").click(function(e) {
		transformToActionResponse("register");
	});

	// action-login click handler
	$("#action-login-container").click(function(e) {
		transformToActionResponse("login");
	});

	// Changes the input-text-container box-shadow on focus
	$(".textbox").focusin(function(e) {
		$(this).parent().css('border', 'solid 1px #0000FF');

		$(this).parent().css('box-shadow', '0px 0px 1px #1E90FF');
		$(this).parent().css('-webkit-box-shadow', '0px 0px 1px #1E90FF');
		$(this).parent().css('-moz-box-shadow', '0px 0px 1px #1E90FF');
	}).focusout(function(e) {
		$(this).parent().css('border', 'solid 1px #000000');

		$(this).parent().css('box-shadow', 'none');
		$(this).parent().css('-webkit-box-shadow', 'none');
		$(this).parent().css('-moz-box-shadow', 'none');
	});

	// link-create-account click handler
	$("#link-create-account").click(function(e) {
		window.location.replace("?action=register");
	});

	// btn-login click handler
	$("#btn-login").click(function(e) {
		var loginForm = "<form action='/php/login.php' method='POST'>" + 
							"<input type='hidden' name='emailid' value='" + $("#login-emailid").val() + "' />" +
							"<input type='hidden' name='password' value='" + $("#login-password").val() + "' />" +
		  				"</form>";

		 console.log(loginForm);
		$(loginForm).appendTo($(document.body)).submit();
	});

	// link-login click handler
	$("#link-login").click(function(e) {
		window.location.replace("?action=login");
	});

	// btn-account-details-next click handler
	$("#btn-account-details-next").click(function(e) {

		performAccountDetailsValidations();

		if (accountDetailsError == 0) {
			user["first_name"] = $("#first-name").val();
			user["last_name"] = $("#last-name").val();
			user["dob"] = $("#dob").val();
			user["gender"] = $("input[type='radio'][name='gender']:checked").val()[0];
			user["emailid"] = $("#emailid").val();
			user["password"] = $("#password").val();

			// Hide account-details container
			$("#account-details-container-content").fadeOut("fast");

			// Resize the get-started container
			$("#get-started-container").animate({
				'width' : '45%',
				'height' : '53%',
				'left' : '27.5%'
			}, 500);

			// Show the personal-desc container
			$("#personal-desc-container-content").fadeIn("fast", function(e) {
				// Slide in the upload-prompt
				$("#upload-prompt").animate({
					'height' : '15%'
				}, 300);
			});
		}
	});

	// upload-prompt click handler
	$("#upload-prompt").click(function(e) {
		$("#profile-image-selector").click();
	});

	
	$("#profile-image-selector").change(function(e) {
		var imageFile = e.target.files[0];
		if (imageFile) {
			if (!imageFile.type.match("image.*")) {
				alert("Not an Image File.");
				return false;
			}

			var reader = new FileReader();
			reader.onload = function(event) {
				$("#preview-image").attr("src", event.target.result);
				//profileImage = event.target.result;
				imageSelected = true;
			};
			reader.readAsDataURL(imageFile);
		}
		$("#upload-prompt").fadeOut("fast");
		$("#upload-prompt").attr("title", "Click to change the Profile Image");
		$("#upload-prompt-text").text("Change Profile Image");
	});

	$("#profile-image-selector").fileupload({
		//url: "php/upload_profile_image.php",
		add: function(e, data) {
			console.log("Profile Image Added")
			
			$("#profile-image-selector").change();			
			profileImage = data;
		}
	});

	// preview-image-container hover handler
	$("#preview-image-container").hover(function(e) {
		// Show upload-prompt
		if (imageSelected == true)
			$("#upload-prompt").fadeIn("fast");
	}, function(e) {
		// Hide upload-prompt
		if (imageSelected == true)
			$("#upload-prompt").fadeOut("fast");
	});

	// btn-personal-desc-next click handler
	$("#btn-personal-desc-next").click(function(e) {

		//performPersonalDescValidations();

		if (personalDescError == 0) {
			//user["profile_image"] = profileImage;
			user["current_home"] = $("#current-home").val();
			user["hometown"] = $("#hometown").val();

			// Hide personal-desc container
			$("#personal-desc-container-content").fadeOut("fast");

			// Resize get-started container
			$("#get-started-container").animate({
				'width' : '40%',
				'height' : '80%',
				'top' : '8%',
				'left' : '30%'
			}, 300, function(e) {
				// Resize get-started container header
				$("#get-started-container-header").animate({
					'height' : '7%'
				}, 300);

				//Enable btn-add-edu-desc
				$("#btn-add-edu-desc").removeAttr("disabled");
				// Enable btn-add-word-desc
				$("#btn-add-work-desc").removeAttr("disabled");
				// Show conn-details container
				$("#conn-details-container-content").fadeIn("fast");

				// init the edu-desc datepickers
				initDurationDatepicker($(".inst-from"), $(".inst-to"));

				// init the work-desc datepickers
				initDurationDatepicker($(".work-from"), $(".work-to"));

				// Focus to school
				$("#school").focus();
			});
		}
	});

	//btn-add-edu-desc click handler
	var eduDescContainerCount = 1;
	$("#btn-add-edu-desc").click(function(e) {
		var eduDescContainer = '<div class="edu-desc-container" style="height: 13%;">' + '<div class="institute-name-container textbox-container" >' + '<input class="institute-name textbox alpha cap" type="text" placeholder="Institute Name" title="Enter your School Name" tabindex="1" />' + '</div>' + '<div class="inst-from-container textbox-container" >' + '<input class="inst-from textbox restrict" type="text" placeholder="From" tabindex="2" />' + '</div>' + '<div class="inst-to-container textbox-container" >' + '<input class="inst-to textbox restrict" type="text" placeholder="To" tabindex="3" />' + '</div>' + '<button class="btn-remove-edu-desc button" type="button" title="Remove this Education Info" tabindex="18">Remove</button>' + '</div>';

		$(eduDescContainer).insertAfter($(".edu-desc-container").get(eduDescContainerCount - 1));

		eduDescContainerCount++;
		if (eduDescContainerCount == 3)
			$(this).attr("disabled", "disabled");

		// init the edu-desc datepickers
		initDurationDatepicker($(".inst-from"), $(".inst-to"));
	});

	// btn-remove-work-desc click handler
	$("#conn-details-container-content").on("click", ".btn-remove-edu-desc", function(e) {
		$(e.target).parent().remove();
		eduDescContainerCount--;
		$("#btn-add-edu-desc").removeAttr("disabled");
	});

	// btn-add-work-desc click handler
	var workDescContainerCount = 1;
	$("#btn-add-work-desc").click(function(e) {

		var workDescContainer = '<div class="work-desc-container" style="top: 65%">' + '<div class="designation-container textbox-container" >' + '<input class="designation textbox alpha cap" type="text" placeholder="Designation" title="Enter your designation at the work place" tabindex="14" />' + '</div>' + '<div class="workplace-container textbox-container" >' + '<input class="workplace textbox alpha cap" type="text" placeholder="Work Place" title="Enter the name of the work place" tabindex="15" />' + '</div>' + '<div class="work-from-container textbox-container" >' + '<input class="work-from textbox restrict" type="text" placeholder="From" tabindex="16" />' + '</div>' + '<div class="work-to-container textbox-container" >' + '<input class="work-to textbox restrict" type="text" placeholder="To" tabindex="17" />' + '</div>' + '<button class="btn-remove-work-desc button" type="button" title="Remove this Workplace Info" tabindex="18">Remove</button>' + '</div>';

		$("#btn-next-conn-details").attr("tabindex", "19");
		$(workDescContainer).insertAfter(".work-desc-container");
		//$("#conn-details-container-content").append(workDescContainer);
		workDescContainerCount++;

		if (workDescContainerCount == 2)
			$("#btn-add-work-desc").attr("disabled", "disabled");

		// init the work-desc datepickers
		initDurationDatepicker($(".work-from"), $(".work-to"));
	});

	// btn-remove-work-desc click handler
	$("#conn-details-container-content").on("click", ".btn-remove-work-desc", function(e) {
		$(e.target).parent().remove();
		workDescContainerCount--;
		$("#btn-add-work-desc").removeAttr("disabled");
	});

	// btn-next-conn-details click handler
	$("#btn-next-conn-details").click(function(e) {
		user["edu_desc"] = {};
		for (var i = 0; i < eduDescContainerCount; i++) {
			user["edu_desc"][i] = {};
			user["edu_desc"][i]["institute_name"] = capitalize($($(".institute-name").get(i)).val());
			user["edu_desc"][i]["inst_from"] = $($(".inst-from").get(i)).val();
			user["edu_desc"][i]["inst_to"] = $($(".inst-to").get(i)).val();
		}

		user["work_desc"] = {};
		for (var i = 0; i < workDescContainerCount; i++) {
			user["work_desc"][i] = {};
			user["work_desc"][i]["designation"] = capitalize($($(".designation").get(i)).val());
			user["work_desc"][i]["workplace"] = $($(".workplace").get(i)).val();
			user["work_desc"][i]["work_from"] = $($(".work-from").get(i)).val();
			user["work_desc"][i]["work_to"] = $($(".work-to").get(i)).val();

			//alert(user["work_desc"][i]["designation"] + "\n" + user["work_desc"][i]["workplace"] + "\n" + user["work_desc"][i]["work-from"] + "\n" + user["work_desc"][i]["work-to"]);
		}
		
		// Hide conn-details container
		$("#conn-details-container-content").fadeOut("fast");

		// Resize get-started container
		$("#get-started-container").animate({
			"width" : "50%",
			"height" : "58%",
			"left" : "25%"
		}, 300);
		// Resize get-started-container-header
		$("#get-started-container-header").animate({
			"height" : "9%"
		}, 300);

		$.ajax({
			url: "php/send_conf_mail.php",
			type: "POST",
			data: {emailid: user["emailid"]},
			success: function(data){
				if(data == "Mail sent.")
				{
					// Show conf container
					$("#conf-container-content").fadeIn("fast");

					// Change the email address in email-conf-text-1
					$("#email-conf-text-1").text($("#email-conf-text-1").text() + user["emailid"] + ".");
		
					// Focus to password
					$("#passcode").focus();

					// Disable btn-finish
					$("#btn-finish").attr("disabled", "disabled");
				}	
			}
		});
	});

	// passcode focusout handler
	$("#passcode").focusout(function(e) {
		$.ajax({
			url: "php/confirm_mail_account.php",
			type: "POST",
			data: {confirmationCode: $(this).val()},
			success: function(data){
				if(data == "accepted")
				{
					$("#passcode").attr("disabled", true);
					$("#passcode-error").text("");
					Recaptcha.create("6LflDeESAAAAAIETxiGGNb7faJYkm7WnQ0I_i-sW", "captcha-container", {
						theme : "clean",
						callback : function(e) {
							$("#btn-submit-captcha").show();
							$("#recaptcha_privacy").hide();
							$("#recaptcha_response_field").addClass("textbox").css("font-size", "11px").focusin(function(e) {
								$(this).css("border", "solid 1px #1E90FF");
							}).focusout(function(e) {
								$(this).css("border", "solid 1px #000000");
							}).focus();
						}
					});
				}
				else if(data == "rejected")
					$("#passcode-error").text("Incorrect Passcode");
			}
		});
	});
	
	// btn-submit-captcha click handler
	$("#btn-submit-captcha").on("click", function(e) {
		$.ajax({
			url : "php/verify_captcha.php",
			type : "POST",
			data : {
				recaptcha_challenge_field : $("#recaptcha_challenge_field").val(),
				recaptcha_response_field : $("#recaptcha_response_field").val()
			},
			success : function(data) {
				alert(data);
				if (data == "accepted")
					$("#btn-finish").removeAttr("disabled");
			}
		});
	});
	
	//btn-finish click handler
	$("#btn-finish").click(function(e) {
		/*console.log(user["first-name"] + " " + user["last-name"] + "\n" +
		            user["dob"] + "\n" +
		 			user["gender"] + "\n" +
		 			user["emailid"] + "\n" +
		 			user["password"] + "\n" +
		 			user["current-home"] + "\n" +
		 			user["hometown"] + "\n");

		 for(var i = 0; i < eduDescContainerCount; i++)
		 {
		 	console.log(user["edu_desc"][i]["institute-name"] + "\n" +
		 	            user["edu_desc"][i]["inst-from"] + "\n" +
		 				user["edu_desc"][i]["inst-to"]);
		 }

		 for(var i = 0; i < workDescContainerCount; i++)
		 {
		 	console.log(user["work_desc"][i]["designation"] + "\n" +
		 			    user["work_desc"][i]["workplace"] + "\n" +
		 				user["work_desc"][i]["work-from"] + "\n" +
		 				user["work_desc"][i]["work-to"]);
		 }*/
		 
		console.log(JSON.stringify(user));
		
		$.ajax({
			url: "php/r_user.php",
			type: "POST",
			data: {user: user},
			success: function(data){
				console.log("\n" + data);
				response = jQuery.parseJSON(data);
				console.log("\nuid : " + response.uid);
				$("#profile-image-selector").fileupload("option", "url", "php/upload_profile_image.php?uid=" + response.uid);
				profileImage.submit();
			}
		});
	});
});

/******************************************************************************/
/*
*
* User-defined Functions
*
*/
/******************************************************************************/

// Parses the action parameter and displays the appropriate inner section
var user = {};

function parseAction() {
	var action = $("#get-action").val().split("/")[0].replace(/\s+/g, '');
	var response = $("#get-response").val().split("/")[0].replace(/\s+/g, '');
	var emailid = $("#get-emailid").val().split("/")[0].replace(/\s+/g, '');
	
	console.log("Action : " + action);
	console.log("Response: " + response);
	console.log("Email ID: " + emailid);
	
	if (action == "" || action == "<br") // Display the start-up section
	{
		$("#banner-container").show();
		setTimeout($("#banner-container").animate({
			'top' : '3%'
		}, 550, function(e) {
			$("#action-bar-container").fadeIn(300);
		}), 300);
	} else if (action == "login") // Display the login section
	{
		$("#banner-container").show();
		initChildSection();
		transformToActionResponse("login");

		if(response == "invalidUser")
			$("#login-error").text("Email ID does not exist");
		else if (response == "invalidPassword")
			$("#login-error").text("Invalid Password");
		else if(response == "" || response == "<br")
			$("#login-error").text("");

		if(emailid != "" && emailid != "<br")
			$("#login-emailid").val(emailid);
		else
			$("#login-emailid").val("");
				
	} else if (action == "register") // Display the register section
	{
		$("#banner-container").show();
		initChildSection();
		transformToActionResponse("register");
	}
}

function initChildSection() {
	$("#banner-container").css("top", "3%");
	//$(".wrapper").css("background-color", "#FFFFFF");
	$("#action-bar-container").hide();
	$("#welcome-text").hide();
	$("#banner-text-container").css("top", "3%");
	$("#banner-container").css("height", "18%");
}

// Transform to respond to action-request
function transformToActionResponse(actionRequest) {
	// Change the background-color
	$(".wrapper").css('background-color', '#FFFFFF');

	// Hide the actions-bar
	$("#action-bar-container").fadeOut("fast");

	// Hide the welcome-text
	$("#welcome-text").hide();

	// Move the logo
	$("#banner-text-container").animate({
		'top' : '3%'
	}, 300);

	// Shorten banner
	$("#banner-container").animate({
		'height' : '18%'
	}, 300, function(e) {
		if (actionRequest == "login") {
			$("#emailid").val("");
			$("#login-section").fadeIn("fast");
			$("#login-emailid").focus();
		} else if (actionRequest == "register") {
			// Clear all inputs
			$(".textbox").val("");

			// Init datepicker
			initDatepicker($("#dob"));

			$("#register-section").fadeIn("fast");
			$("#first-name").focus();
		}
	});
}

/******************************************************************************/
/*
*
* Validations
*
*/
/******************************************************************************/

/*
 *
 *
 * Account-Details Validations
 *
 */

var accountDetailsError = 0;

function performAccountDetailsValidations() {
	validatePassword();
	validateEmail();
	validateGender();
	validateDOB();
	validateName();

	if ($("#name-error").text() != "" || $("#dob-error").text() != "" || $("#gender-error").text() != "" || $("#emailid-error").text() != "" || $("#emailid-confirm-error").text() != "" || $("#password-error").text() != "" || $("#password-confirm-error").text() != "")
		accountDetailsError = 1;
	else
		accountDetailsError = 0;

	accountDetailsError = 0;
}

function validateName() {
	if ($("#first-name").val() == "") {
		$("#name-error").text("*First Name cannot be empty");
		$("#first-name").focus();
	} else if ($("#last-name").val() == "") {
		$("#name-error").text("*Last Name cannot be empty");
		$("#last-name").focus();
	} else
		$("#name-error").text("");
}

function validateDOB() {
	if ($("#dob").val() == "")
		$("#dob-error").text("*Date of Birth not selected");
	else
		$("#dob-error").text("");
}

function validateGender() {
	if (!$("#male").is(":checked") && !$("#female").is(":checked"))
		$("#gender-error").text("*Select Gender");
	else
		$("#gender-error").text("");
}

function validateEmail() {
	var mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	// Check whether the Email ID fields are empty
	if ($("#emailid").val() == "")
		$("#emailid-error").text("*Emaild ID cannot be empty");
	else
		$("#emailid-error").text("");

	if ($("#confirm-emailid").val() == "")
		$("#emailid-confirm-error").text("*Re-enter your Email ID");
	else
		$("#emailid-confirm-error").text("");

	if ($("#emailid-error").text() != "" || $("#emailid-confirm-error").text() != "")
		return;

	// Check weheter the Email ID fields match the pattern
	if (!mailPattern.test($("#emailid").val()))
		$("#emailid-error").text("*Invalid Email ID");
	else
		$("#emailid-error").text("");

	if (!mailPattern.test($("#confirm-emailid").val()))
		$("#emailid-confirm-error").text("*Invalid Email ID");
	else
		$("#emailid-confirm-error").text("");

	if ($("#emailid-error").text() != "" || $("#emailid-confirm-error").text() != "")
		return;

	// Check whether the Email ID's match
	if ($("#emailid").val() != $("#confirm-emailid").val())
		$("#emailid-confirm-error").text("*Email ID's do not match");
	else
		$("#emailid-confirm-error").text("");
}

function validatePassword() {
	// Check whether the Password fields are empty
	if ($("#password").val() == "")
		$("#password-error").text("*Password cannot be empty");
	else
		$("#password-error").text("");

	if ($("#confirm-password").val() == "")
		$("#password-confirm-error").text("*Re-enter the password");
	else
		$("#password-confirm-error").text("");

	if ($("#password-error").text() != "" || $("#password-confirm-error").text() != "")
		return;

	// Check whether the password's minimum length is 5
	if ($("#password").val().length < 5)
		$("#password-error").text("*Minimum 5 characters required");
	else
		$("#password-error").text("");

	if ($("#confirm-password").val().length < 5)
		$("#password-confirm-error").text("*Minimum 5 characters required");
	else
		$("#password-confirm-error").text("");

	if ($("#password-error").text() != "" || $("#password-confirm-error").text() != "")
		return;

	// Check whether the Password's match
	if ($("#password").val() != $("#confirm-password").val())
		$("#password-confirm-error").text("*Password's do not match");
	else
		$("#password-confirm-error").text("");
}

/*
 *
 * Personal Desc Validations
 *
 */
var personalDescError = 0;

function performPersonalDescValidations() {
	validatePersonalDesc();

	if ($("#personal-desc-error").text() != "")
		personalDescError = 1;
	else
		personalDescError = 0;

	personalDescError = 0;
}

function validatePersonalDesc() {
	if (imageSelected == false) {
		$("#personal-desc-error").text("*Select Profile Image");
		return;
	} else if ($("#current-home").val() == "") {
		$("#personal-desc-error").text("*Select Current Home");
		return;
	} else if ($("#hometown").val() == "") {
		$("#personal-desc-error").text("*Select Hometown");
		return;
	} else
		$("#personal-desc-error").text("");
}
