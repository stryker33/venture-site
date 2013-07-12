var channelSelected;
$(document).ready(function(e){
	initCILayout();

	// Init the start-broadcast-container overlay
	/*$("#btn-ci-start-live-broadcast").overlay({
		onBeforeLoad: function(e){
			$("#ci-broadcast-desc").css("line-height", "201px");
		},
	});*/

	$("#btn-ci-start-live-broadcast").overlay({
		onLoad: function(e){
			$("#lb-comments-header").css("line-height", $("#lb-comments-header").height().toString() + "px");
			$("#btn-lb-start-broadcast").css("line-height", $("#btn-lb-start-broadcast").height().toString() + "px");
			$("#btn-lb-capture").css("line-height", $("#btn-lb-capture").height().toString() + "px");
			$("#btn-lb-screencast").css("line-height", $("#btn-lb-screencast").height().toString() + "px");
			$("#btn-lb-switch-camera").css("line-height", $("#btn-lb-switch-camera").height().toString() + "px");
			$("#btn-lb-switch-screen").css("line-height", $("#btn-lb-switch-screen").height().toString() + "px");

			$("#lb-comments-container").css('visibility', 'visible');
			$("#lb-main-broadcast-container").css('visibility', 'visible');
		},
		mask:{
			color: '#CCE0FF',
			loadSpeed: 200,
			opacity: 0.55
		}
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
	});

	// Click handler for btn-ci-select-all and btn-ci-deselect-all
	$(document).on("click", "#btn-ci-select-all, #btn-ci-deselect-all",function(e){
		if($(this).attr("id") == "btn-ci-select-all")
		{
			$.each($(".ci-connection").get(), function(index, connectionContainer){
				var btn = $(connectionContainer).children("button");
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

	// Click handler for btn-ci-create-broadcast
	$(document).on("click", "#btn-ci-create-broadcast", function(e){
		var broadcastTitle = jQuery.trim($("#ci-broadcast-title").val());

		if(broadcastTitle == "")
		{
			displayMessage("error", "Broadcast Title cannot be empty");
			return;
		}

		var liveBroadcastDetails = {}, invitationsList = {};
		invitationsList["invitees"] = new Array();
		
		liveBroadcastDetails["channelOwnerUID"] = uid;
		liveBroadcastDetails["channelName"] = $("#ci-channel-name-container").text();
		liveBroadcastDetails["broadcastTitle"] = broadcastTitle;
		liveBroadcastDetails["broadcastVisibility"] = jQuery.trim($("#ci-broadcast-visibility-container select").val());
		liveBroadcastDetails["broadcastDesc"] = jQuery.trim($("#ci-broadcast-desc").val());
		liveBroadcastDetails["videoType"] = "live_broadcast";
		liveBroadcastDetails["broadcastMedium"] = "web_interface";

		$.each($(".ci-connection").get(), function(index, connectionContainer){
			var btn = $(connectionContainer).children("button");
			if($(btn).hasClass("btn-ci-connection-cancel-invite"))
				invitationsList["invitees"].push($(connectionContainer).attr("uid"));
		});

		$.ajaxq("channelInfoQueue", {
			url: "/php/newLiveBroadcast.php",
			type: "GET",
			data: {lbd: liveBroadcastDetails, il: invitationsList},
			success: function(data){
				var response = jQuery.parseJSON(data);
				if(response["message"] == "broadcast_created")
				{
					$("#btn-ci-create-broadcast").addClass("btn-success").text("Live Broadcast Created");
					setTimeout(function(e){
						$("#btn-ci-create-broadcast").removeClass("btn-success").text("Create Live Broadcast");
						//window.location = "https://" + hostAddress + "/liveBroadcast.php?uid=" + uid + "&rid=" + response["rid"] + "&bt=" + 
						//																								liveBroadcastDetails["broadcastTitle"];

					}, 1000);
				}
			}
		})
	});

	// Click handler for ci-tab-header
	$(".ci-tab-header").on("click", function(e){
		if($("#ci-comments-container").hasClass("channel-content-sub-container-active"))
			unsubscribeToChannelComments(channelSelected.channel_id);

		var tabHeaderText = jQuery.trim($(this).text());
		
		$(".channel-content-sub-container-active").fadeOut("fast").removeClass("channel-content-sub-container-active");
		$(".ci-tab-header-active").removeClass("ci-tab-header-active");
		switch(tabHeaderText)
		{
			case "Videos": $("#ci-videos-container").fadeIn("fast").addClass("channel-content-sub-container-active");
						   $("#ci-videos-tab").addClass("ci-tab-header-active");
						   break;

			case "Comments": $("#ci-comments-container").fadeIn("fast").addClass("channel-content-sub-container-active");
							 $("#ci-comments-tab").addClass("ci-tab-header-active");
							 populateComments();
							 subscribeToChannelComments(channelSelected.channel_id);
						   	 break;

			case "Description": $("#ci-desc-container").fadeIn("fast").addClass("channel-content-sub-container-active");
								$("#ci-desc-tab").addClass("ci-tab-header-active");
						   		break;
		}
	});

	// Click handler for btn-ci-post-comment
	$("#btn-ci-post-comment").on("click", function(e){
		comment = {};
		comment["c_id"] = uid;
		comment["ch_id"] = $("#channel-info-content").attr("channel_id");
		comment["c"] = $(".user-channel-comment .comment-textbox").val();
		$.ajaxq("channelInfoQueue", {
			url: "/php/postChannelComment.php",
			type: "POST",
			data: {comment: comment},
			beforeSend: function(jqXHR, settings){
				$("#btn-ci-post-comment").text("Loading...");
			},
			success: function(data){
				if(data == "comment posted")
				{
					$("#btn-ci-post-comment").addClass("btn-success").text("Comment Posted");

					var comment = {};
					comment["commentor_name"] = userInfo.user.first_name + " " + userInfo.user.last_name;
					comment["comment"] = $(".user-channel-comment textarea").val();
					addChannelComment(comment, true, true);
					populateUserImage(userInfo);

					setTimeout(function(){
						$("#btn-ci-post-comment").removeClass("btn-success").text("Post Comment");
					}, 1000);

				}
			}
		})
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
	channelSelected;
	$.each(channels, function(index, channel){
		if(channel.channel_name == channelName)
			channelSelected = channel;
	});

	$("#channel-info-content").attr("channel_id", channelSelected.channel_id);
	$("#ci-channel-name-container").text(channelSelected.channel_name);
	$("#ci-channel-visibility-container").text(channelSelected.channel_visibility);
	$("#ci-channel-desc-container").text(channelSelected.channel_desc);
	$("#ci-channel-header span").text(channelSelected.channel_name);

	displayContent("Channel Info");
	initChannelInfo();
	channelCommentServerConnect();
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


function initCILayout()
{
	initCBLiveBrodcastLayout();
}

function initCBLiveBrodcastLayout()
{
	$("#ci-live-broadcast-container").css({
		"width": (windowWidth * 0.9).toString() + "px",
		"height": (windowHeight * 0.97).toString() + "px",
		"top": (windowWidth * 0.01).toString() + "px !important",
		"left": (windowHeight * 0.05).toString() + "px !important",
	})
}

function populateComments()
{
	populateUserImage(userInfo);

	$.each($(".ci-comment").get(), function(index, value){
		$(comment).remove();
	});

	var channel_id = $("#channel-info-content").attr("channel_id");
	$.ajaxq("channelInfoQueue", {
		url: "/php/getChannelComments.php",
		type: "GET",
		data: {ch_id: channel_id},
		success: function(data){
			var channelComments = jQuery.parseJSON(data);
			$.each(channelComments, function(index, comment){
				if(comment.commentor_id == uid)
					addChannelComment(comment, true, false);
				else
					addChannelComment(comment, false, false);
			});
			populateUserImage(userInfo);
		}
	});
}

function addChannelComment(comment, isUserComment, isNewComment)
{
	if(isUserComment == true)
	{
		var commentContainer = "<div class='ci-comment' >" + 
									"<div class='ci-channel-comment-bubble image-container user-profile-image' ></div>" + 
									"<div class='ci-channel-comment-name-container' >" + comment.commentor_name + "</div>" + 
									"<div class='ci-channel-comment' >" + comment.comment + "</div>" + 
									"<div class='overlay-divider' style='position: absolute; bottom: 0px' ></div>" + 
							   "</div>";
	}
	else
	{
		var commentContainer = "<div class='ci-comment' >" + 
									"<div class='ci-channel-comment-bubble image-container' style='background-image: url(" + comment.commentor_pi + ")'></div>" + 
									"<div class='ci-channel-comment-name-container' >" + comment.commentor_name + "</div>" + 
									"<div class='ci-channel-comment' >" + comment.comment + "</div>" + 
									"<div class='overlay-divider' style='position: absolute; bottom: 0px' ></div>" + 
							   "</div>";

	}
	
	if(isNewComment == true)
	{
		var appendedElement = $(commentContainer).prependTo($("#ci-comments"));
		$(appendedElement).fadeIn("fast").css("background-color", "#E8F4FF").animate({"background-color": "#FFFFFF"}, 3000);
	}
	else
	{
		$(commentContainer).appendTo($("#ci-comments")).fadeIn("fast");
	}
}

function channelCommentHandler(topic, data)
{
	var channelComment = jQuery.parseJSON(data);
	console.log(channelComment);
	
	if(channelComment.commentor_id != uid)
		addChannelComment(channelComment, false, true);
}