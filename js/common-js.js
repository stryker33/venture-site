$(document).ready(function(e){
	
	// Init the tooltip
	$("div, span, button").tipsy({
		gravity: function(){
			var tipGravity = $(this).attr("tip-gravity");
			if(tipGravity == "ns")
				return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';	
			if(tipGravity == "we")
				return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
		
			return tipGravity;
		},
		live: true
	});

	// Only allow the entry of alphabets for class "alpha"
	$(".alpha").on("keypress", function(event) {
		console.log("alpha-keypress invoked");
		var alphaFormat = /[A-Za-z0-9 \.,\(\)]/g;
		var key = String.fromCharCode(event.which);
	
		if (event.keyCode == 8 || event.keyCode == 37 || event.keyCode == 39 || alphaFormat.test(key))
			return true;
		else if (event.keyCode == 9)// Detect TAB
		{
			var nextElement = parseInt($(this).attr("tabindex")) + 1;
			$("input[tabindex=" + nextElement + "]").focus();
		}

		return false;
	}).on("paste", function(event) {
		event.preventDefault();
	});

	// Restrict manually entrying characters for class "restrict"
	$(document).on("keypress", ".restrict", function(e){
		console.log(e.keyCode);
		if(e.keyCode == 8)
			return true;
		e.preventDefault();
	});

	// Change the text-align for textbox on focusout and focusin 
	$(document).on("focusin", "textarea.textbox", function(e){
		$(this).css("text-align", "left");
		$(this).css({"text-align": "left", "line-height": "normal"});
	});

	$(document).on("focusout", "textarea.textbox", function(e){
		if($(this).val().length == 0)
		{
			$(this).css({"text-align": "center", "line-height": $(this).height().toString() + "px"});	
		}
		
	});
});

// Capitalize the first letter
function capitalize(string)
{
	return string.toLowerCase().replace(/\b[a-z]/g, function(letter){ return letter.toUpperCase(); });
}

// init datepickers
function initDatepicker(selector)
{
	selector.datepicker({
		dateFormat : 'dd MM, yy',
		changeMonth : true,
		changeYear : true,		
		minDate : new Date(1930, 1, 1),
		maxDate : '+0D',
		yearRange : "1930:" + new Date().getFullYear(),
		beforeShow : function(e) {
			$(".ui-datepicker").css({
				'font-size' : '0.88em',
				'font-family' : "'Ubuntu', sans-serif"
			});
		}
	});	
}

function initDurationDatepicker(fromSelector, toSelector)
{	
	var minMonth = 0, minYear = 0;
	fromSelector.datepicker({
		dateFormat : 'MM yy',
		changeMonth : true,
		changeYear : true,
		showButtonPanel : true,
		minDate : new Date(1930, 1, 1),
		maxDate : '+0D',
		yearRange : "1930:" + new Date().getFullYear(),
		beforeShow : function(input, inst) {
			$(inst.dpDiv).addClass("calendar-hidden");
			$(".ui-datepicker").css({
				'font-size' : '0.88em',
				'font-family' : "'Ubuntu', sans-serif"
			});
		},
		onClose : function(e) {
			var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
			var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
			minMonth = month;
			minYear = year;
			
			$(this).datepicker("setDate", new Date(year, month, 1));
		}
	});

	toSelector.datepicker({
		dateFormat : 'MM yy',
		changeMonth : true,
		changeYear : true,
		showButtonPanel : true,
		maxDate : "+0D",
		yearRange: "1930:" + new Date().getFullYear(),
		beforeShow : function(input, inst) {
			$(inst.dpDiv).addClass("calendar-hidden");
			$(".ui-datepicker").css({
				'font-size' : '0.88em',
				'font-family' : "'Ubuntu', sans-serif"
			});
			var newMonth = parseInt(minMonth) + 1;
			$(this).datepicker("option", "minDate", new Date(minYear, newMonth, 1));
		},
		onClose : function(e) {
			var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
			var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
			$(this).datepicker("setDate", new Date(year, month, 1));
		}
	});
}

function resizeImageContainers()
{
	$.each($(".image-container:visible").get(), function(index, imageContainer){
		$(imageContainer).width($(imageContainer).height());
	});
}

function populateUserImage(user)
{
	var profileImages = $(".user-profile-image").get()
	$(".user-profile-image").filter(function(){
		return $(this).css("background-image") == "none";
	}).css("background-image", "url(" + user.user.profile_image + ")")
	.attr("title", user.user.first_name + " " + user.user.last_name)
	.attr("tip-gravity", "ns");
}

function animateNavBar(displayCommand)
{
	if(displayCommand == "show")
	{
		$("#content-container-wrapper").animate({width: "85%"}, 300);
		$("#navbar-container").animate({
			left: "85%"
		}, 300, function(e){
			$("#navmenu-control-container").removeClass("show-menu").addClass("affix-menu");
			$("#navmenu-control-container i").remove();
			$("#navmenu-control-container").hide().append("<i class='icon-list' ></i><i class='icon-chevron-right' ></i>").attr("title", "Hide the navigation menu");
			$("#navmenu-control-container").fadeIn("fast");
		});
	}
	else if(displayCommand == "hide")
	{
		$("#content-container-wrapper").animate({width: "100%"}, 300);
		$("#navbar-container").animate({
			left: "100%"
		}, 300, function(e){
			$("#navmenu-control-container").removeClass("affix-menu").addClass("show-menu");
			$("#navmenu-control-container i").remove();
			$("#navmenu-control-container").hide().append("<i class='icon-chevron-left' ></i><i class='icon-list' ></i>").attr("title", "Show the navigation menu");
			$("#navmenu-control-container").fadeIn("fast");
		});
	}
}
