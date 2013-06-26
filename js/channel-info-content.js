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
		var activeTab = $(".ci-tab-active").get()[0];
		$(activeTab).removeClass("ci-tab-active");
		$(this).addClass("ci-tab-active");
	});

	$("#ci-tabs-content-container").on("slid", function(e){
		console.log("Invoked");
		// Pause the carousel from sliding
		$("#ci-tabs-content-container").carousel("pause");
	});
});

function initChannelInfo()
{	
	// vertical align .user-profile-tab text
	$(".ci-tab").css("line-height", $('.ci-tab').css("height"));

	// vertical align .user-profile-tab-content-container text
	$(".ci-tab-content-container").css("line-height", $('.ci-tab-content-container').css("height"));

	// Pause the carousel from sliding
	$("#ci-tabs-content-container").carousel("pause");
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

	displayContent("Channel Info");
	initChannelInfo();
}