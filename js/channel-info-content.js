$(document).ready(function(e){
	
	//initChannelInfo();

	$(document).on("click", "#ci-channel-view-options-container li", function(e){
		var text = $(this).text();
		var btnText = $("#ci-channel-view-options-container").children(".btn-group").children(".btn").text();

		$("#ci-channel-view-options-container").children(".btn-group").children(".btn").text(text)
		.append("<span class='caret' style='position: absolute; right: 5%;' ></span>");

		$(this).parent().append("<li>" + btnText + "</li>");
		$(this).remove();
	});

	$(".ci-tab").click(function(e){
		console.log("Invoked");
		var activeTab = $(".ci-tab-active").get()[0];
		$(activeTab).removeClass("ci-tab-active").addClass("ci-tab");
		$(this).addClass("ci-tab-active");
	});

	$("#ci-tabs-content-container").on("slid", function(e){
		console.log("Invoked");
		// Pause the carousel from sliding
		$("#ci-tabs-content-container").carousel("pause");
	});

	// Scroll handler
	$(".content-container").on("scroll", function(e){
		var containerHeight = $(".content-container").height();
		var cContainerTop = containerHeight * 0.205;
		console.log($(this).scrollTop() + " " + cContainerTop);
		if($(this).scrollTop() >= cContainerTop)
		{
			$("#channel-info-container").hide();
			$("#ci-channel-header").fadeIn("fast");
		}
		else
		{
			$("#channel-info-container").show();
			$("#ci-channel-header").hide();	
		}
	})
});

function initChannelInfo()
{	
	// vertical align .user-profile-tab text
	$(".ci-tab").css("line-height", $('.ci-tab').css("height"));

	// vertical align .user-profile-tab-content-container text
	$(".ci-tab-content-container").css("line-height", $('.ci-tab-content-container').css("height"));

	// Pause the carousel from sliding
	$("#ci-tabs-content-container").carousel("pause");

	// Vertical align the text within channel-header
	$("#ci-channel-header").css("line-height", $("#ci-channel-header").height().toString() + "px");
}

function populateChannelInfo(channelName)
{
	var channelSelected;
	$.each(channels, function(index, channel){
		if(channel.channel_name == channelName)
			channelSelected = channel;
	});

	$("#ci-channel-name-container").text(channelSelected.channel_name);
	$("#ci-channel-visibility-container").text(channelSelected.channel_visibility);
	$("#ci-channel-desc-container").text(channelSelected.channel_desc);
	$("#ci-channel-header span").text(channelSelected.channel_name);

	displayContent("Channel Info");
	initChannelInfo();
}