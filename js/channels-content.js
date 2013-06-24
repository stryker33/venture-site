$(document).ready(function(e){

	// Init the c-new-channel-container overlay
	$("#btn-c-create-new-channel").overlay({fixed: false});

	// Init the c-edit-channel-container overlay
	$(".btn-c-channel-edit").overlay({fixed: false});

	// Click handler for btn-c-new-channel-create
	$(document).on("click", "#btn-c-new-channel-create", function(e){
		var newChannel = {};
		newChannel["channel_name"] = $("#c-new-channel-name").val();
		newChannel["channel_visibility"] = $("#c-new-channel-visibility-select select option:selected").val();
		newChannel["channel_desc"] = $("#c-new-channel-desc").val();

		$.ajaxq("channelsQueue", {
			url: "/php/createChannel.php",
			type: "GET",
			data: {uid: uid, c_n: newChannel["channel_name"], c_v: newChannel["channel_visibility"], c_d: newChannel["channel_desc"]},
			beforeSend: function(jqXHR, settings){
				$("#btn-c-new-channel-create").text("Loading...");
			},
			success: function(data){
				if(data == "channel_created")
				{
					$("#btn-c-new-channel-create").css("width", "auto").addClass("btn-success");
					$("#btn-c-new-channel-create").text("Channel Created");
					setTimeout(appendChannel, 1000, newChannel, true, channels.length);
					setTimeout(loadChannels, 5000);
				}
			}
		})
	});

	// Click handler for btn-c-channel-edit
	$(document).on("click", ".btn-c-channel-edit", function(e){
		var position = $(this).parent().attr("position");
		populateEditChannelContainer(parseInt(position));
		console.log("Invoked");
		$("#c-edit-channel-container").overlay().load();
	});

	// Click handler for btn-c-edit-channel-done
	$(document).on("click", "#btn-c-edit-channel-done", function(e){
		var editedChannel = {};
		editedChannel["old_channel_name"] = jQuery.trim($("#c-edit-channel-container").attr("old_channel_name"))
		editedChannel["new_channel_name"] = jQuery.trim($("#c-edit-channel-name").val());
		editedChannel["channel_visibility"] = jQuery.trim($("#c-edit-channel-visibility-select select").val());
		editedChannel["channel_desc"] = jQuery.trim($("#c-edit-channel-desc").val());

		if(editedChannel["new_channel_name"] == "")
		{
			displayMessage("error", "Channel Name cannot be empty");
			return;
		}

		console.log(channelNameExists(editedChannel["new_channel_name"]))		
		if(channelNameExists(editedChannel["new_channel_name"]))
		{
			displayMessage("error","Channel with the same name already exists");
			return;
		}
		
		$.ajaxq("channelsQueue", {
			url: "/php/editChannel.php",
			type: "GET",
			data: {uid: uid, a: "edit", o_c_n: editedChannel["old_channel_name"], n_c_n: editedChannel["new_channel_name"], c_v: editedChannel["channel_visibility"], c_d: editedChannel["channel_desc"]},
			beforeSend: function(jqXHR, settings){
				$("#btn-c-edit-channel-done").text("Loading...");
			},
			success: function(data){
				if(data == "success")
				{	
					$("#btn-c-edit-channel-done").addClass("btn-success").text("Changes Saved");
					setTimeout(function(){
						loadChannels();
						$("#c-edit-channel-container").overlay().close();
						$("#btn-c-edit--channel-done").removeClass("btn-success").text("Done");
					}, fadeDelay);
				}
			}
		})
	});

	// Click handler for btn-c-channel-remove
	$(document).on("click", ".btn-c-channel-remove", function(e){
		var clickedElement = $(this);
		var parent = $(this).parent();
		var channel = {};

		channel["old_channel_name"] = $(this).parent().children(".channel-name-container").children("span").text();
	
		$.ajaxq("connectionGroupsQueue", {
			url: "/php/editChannel.php",
			type: "GET",
			data: {uid: uid, o_c_n: channel["old_channel_name"], a: ""},
			beforeSend: function(jqXHR, settings){
				$(clickedElement).text("Loading...");
			},
			success: function(data){
				if(data == "success")
				{
					$(clickedElement).addClass("btn-danger").text("Channel Removed");
					setTimeout(function(){
						$(parent).fadeOut("fast").remove();
						loadChannels();
					}, fadeDelay);
				}
			}
		})
	});

	// Keyup handler for 
	$(document).on("keyup", "#search-channels", function(e){
		var searchQuery = jQuery.trim($(this).val()).toLowerCase();

		if(searchQuery != "")
		{
			$.each($(".channel-container").get(), function(index, channel){
				$(channel).show();;
			});
		}

		$.each($(".channel-container").get(), function(index, channel){
			$(channel).hide();;
		});

		$.each($(".channel-container"), function(index, channelContainer){
			//var userName = connection.user.first_name + " " + connection.user.last_name;
			var channelName = $($(channelContainer).children()[1]).text();
			var searchPattern = new RegExp(searchQuery);
			if(searchPattern.test(channelName.toLowerCase()))
				$(channelContainer).show();
		});
	});

});

function loadChannelsInfo()
{	
	$.each($(".channel-container").get(), function(index, value){
		$(value).remove();
	});

	$.each($("#channels-sub-menu .nav-menu .nav-menu-element, #channels-sub-menu .nav-menu .nav-menu-element-active").get(), function(index, value){
		$(value).remove();
	});

	if(channels.length == 0)
	{
		$("#empty-channel-content-indicator").show();
		return;
	}
	else
		$("#empty-channel-content-indicator").hide();

	$.each(channels, function(index, channel){
		appendChannel(channel, false, index);
	});

	if($(".channel-container").get().length == 0)
		$("#empty-channel-content-indicator").show();

}

function appendChannel(channel, isNew, position)
{
	$("#c-new-channel-name").val("");
	$("#btn-cg-create-group").css("width", "159px").removeClass("btn-success");
	$("#btn-cg-create-group").text("Create Connection Group");
	$("#empty-cg-indicator").hide();
	$("#btn-c-create-new-channel").overlay().close();

	var channelContainer = "<div class='channel-container' position='" + position + "'>" + 
								"<div class='image-container channel-cover-container' ></div>" + 
								"<div class='channel-name-container' ><span>" + channel.channel_name + "</span></div>" + 
								"<div class='channel-visibility-container' ><span>" + channel.channel_visibility +  "</span></div>" + 
								"<div class='channel-desc-container' ><span>" + channel.channel_desc + "</span></div>" + 
								"<button class='btn btn-mini btn-c-channel-edit' ><i class='icon-cog' ></i> Edit Channel</button>" + 
								"<button class='btn btn-mini btn-c-channel-remove' ><i class='icon-minus' ></i> Remove Channel</button>" + 
							"</div>";

	var appendedElement = $(channelContainer).prependTo("#channels-container").fadeIn("fast");
	$("#channels-sub-menu .nav-menu").prepend("<div class='nav-menu-element' >" + channel.channel_name + "</div>").fadeIn("fast");	
	if(isNew)
		$(appendedElement).css("background-color", "#E8F4FF").animate({"background-color": "#FFFFFF"}, 3000);
		
}

function populateEditChannelContainer(position)
{	
	$("#btn-c-edit-channel-done").removeClass("btn-success").text("Done");
	var channel = channels[position];
	$("#c-edit-channel-container .overlay-dialog-container-header span").text(channel.channel_name);
	$("#c-edit-channel-container").attr("old_channel_name", channel.channel_name);
	$("#c-edit-channel-name").val(channel.channel_name);
	$("#c-edit-channel-visibility-select select").val(channel.channel_visibility);
	$("#c-edit-channel-desc").val(channel.channel_desc);
}

function channelNameExists(channelName)
{
	var exists = false;
	$.each(channels, function(index, channel){
		if(channel.channel_name == channelName)
		{
			exists = true;
			return;
		}
	});

	return exists;
}
