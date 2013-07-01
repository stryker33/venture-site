$(document).ready(function(e){
	// Init the start-broadcast-container overlay
	$("#btn-ci-start-live-broadcast").overlay({
		onBeforeLoad: function(e){
			$("#ci-broadcast-desc").css("line-height", "201px");
		},
	});

	$(document).on("click", "#ci-channel-view-options-container li", function(e){
		var text = $(this).text();
		var btnText = $("#ci-channel-view-options-container").children(".btn-group").children(".btn").text();

		$("#ci-channel-view-options-container").children(".btn-group").children(".btn").text(text)
		.append("<span class='caret' style='position: absolute; right: 5%;' ></span>");

		$(this).parent().append("<li>" + btnText + "</li>");
		$(this).remove();
	});

	// Scroll handler
	$(".content-container").on("scroll", function(e){
		var containerHeight = $(".content-container").height();
		var cContainerTop = containerHeight * 0.21;
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

	// Click handler for btn-ci-select-all and btn-ci-deselect-all
	$(document).on("click", "#btn-ci-select-all, #btn-ci-deselect-all",function(e){
		if($(this).attr("id") == "btn-ci-select-all")
		{
			$.each($(".ci-connection").get(), function(index, connectionContainer){
				var btn = $(connectionContainer).children("button");
				console.log($(btn).text());
				if($(btn).text() == "Send Invitation")
				{
					$(btn).removeClass("btn-ci-connection-invite").addClass("btn-ci-connection-cancel-invite").addClass("btn-success");
					$(btn).text("Added to the Invitation List");
					setTimeout(function(e){$(btn).removeClass("btn-success"); $(btn).text("Cancel Invitation");}, 800);				
				}
					
			});
		}
			
		if($(this).attr("id") == "btn-ci-deselect-all")
		{
			$.each($(".ci-connection").get(), function(index, connectionContainer){
				var btn = $(connectionContainer).children("button");
				console.log($(btn).text());
				if($(btn).text() == "Cancel Invitation")
				{
					$(btn).removeClass("btn-ci-connection-cancel-invite").addClass("btn-ci-connection-invite").addClass("btn-danger");
					$(btn).text("Removed from the Invitation List");
					setTimeout(function(e){$(btn).removeClass("btn-danger"); $(btn).text("Send Invitation");}, 800);				
				}
			});
		}
	});

	// Click handler for .btn-ci-connection-action	 
	$(document).on("click", ".btn-ci-connection-action", function(e){
		var clickedElement = $(this);
		var clickedElementUID = parseInt($(this).parent().attr("uid"));

		if($(this).hasClass("btn-ci-connection-invite"))
		{
			$(this).removeClass("btn-ci-connection-invite").addClass("btn-ci-connection-cancel-invite").addClass("btn-success");
			$(this).text("Added to the Invitation List");
			setTimeout(function(e){$(clickedElement).removeClass("btn-success"); $(clickedElement).text("Cancel Invitation");}, 800);
			return;
		}

		if($(this).hasClass("btn-ci-connection-cancel-invite"))
		{
			$(this).removeClass("btn-ci-connection-cancel-invite").addClass("btn-ci-connection-invite").addClass("btn-danger");
			$(this).text("Removed from the Invitition List");
			setTimeout(function(e){$(clickedElement).removeClass("btn-danger"); $(clickedElement).text("Send Invitation");}, 800);
			return;
		}
	});

	// Key up handler for ci-search-connections
	$(document).on("keyup", "#ci-search-connections", function(e){
		var searchQuery = jQuery.trim($(this).val()).toLowerCase();

		if(searchQuery != "")
		{
			$.each($(".ci-connection").get(), function(index, connectionContainer){
				$(connectionContainer).show();;
			});
		}

		$.each($(".ci-connection").get(), function(index, connectionContainer){
			$(connectionContainer).hide();;
		});

		$.each($(".ci-connection"), function(index, connectionContainer){
			var userName = $($(connectionContainer).children()[1]).text();
			var searchPattern = new RegExp(searchQuery);
			if(searchPattern.test(userName.toLowerCase()))
				$(connectionContainer).show();
		});
	});

	// Change handler for ci-broadcast-visibility-container select
	$(document).on("change", "#ci-broadcast-visibility-container select", function(e){
		var context = $(this).val();
		populateBroadcastContainer(context);
	});
});

function initChannelInfo()
{	
	// Vertical align the text within channel-header
	$("#ci-channel-header").css("line-height", $("#ci-channel-header").height().toString() + "px");
	populateBroadcastContainer("Public");
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

function populateBroadcastContainer(context)
{	
	$.each($(".ci-connection").get(), function(index, value){
		$(value).remove();
	});

	if(context == "Public" || context == "All Connections")
	{
		$.each(connections, function(index, connection){
			var connectionContainer = "<div class='ci-connection' uid=" + connection.user.uid + " >" + 
										"<div class='image-container ci-connection-image-container' style='background-image: url(" + connection.user.profile_image + ")' ></div>" + 
										"<div class='ci-connection-name' >" + connection.user.first_name + " " + connection.user.last_name + "</div>" + 
										"<button class='btn btn-mini btn-ci-connection-invite btn-ci-connection-action' >Send Invitation</button>" + 
									  "</div>";

			$("#ci-connections-container").append(connectionContainer);
		});	
		return;
	}

	var groupMembers = {};
	var cg = jQuery.parseJSON(connectionGroups);
	$.each(cg.groups, function(index, connectionGroup){
		if(connectionGroup.group_name == context)
			groupMembers = connectionGroup.group_members
	});

	$.each(connections, function(index, connection){
		console.log(jQuery.inArray(connection.user.uid, groupMembers) != -1);
		if(jQuery.inArray(connection.user.uid, groupMembers) != -1)
		{
			var connectionContainer = "<div class='ci-connection' uid=" + connection.user.uid + " >" + 
										"<div class='image-container ci-connection-image-container' style='background-image: url(" + connection.user.profile_image + ")' ></div>" + 
										"<div class='ci-connection-name' >" + connection.user.first_name + " " + connection.user.last_name + "</div>" + 
										"<button class='btn btn-mini btn-ci-connection-invite btn-ci-connection-action' >Send Invitation</button>" + 
									  "</div>";	

			$("#ci-connections-container").append(connectionContainer);
		}
	});
}
