var channelID, channelViewer, channelInfo;

$(document).ready(function(e){
	channelID = $("#get-ch-id").val();
	channelViewer = $("#get-cv").val();

	$(".content-container").niceScroll();
	$(".c-tab-content-container").niceScroll();
	$(".channel-content-sub-container").niceScroll();

	initLayout();
	populatePage();
	channelCommentServerConnect();

	// Scroll handler
	$(".content-container").on("scroll", function(e){
		var containerHeight = $(".content-container").height();
		var cContainerTop = containerHeight * 0.21;

		if($(this).scrollTop() >= cContainerTop)
		{
			$("#channel-info-container").hide();
			$("#c-channel-header").fadeIn("fast");
		}
		else
		{
			$("#channel-info-container").show();
			$("#c-channel-header").hide();	
		}
	});

	// Click handler for c-tab-header
	$(".c-tab-header").on("click", function(e){
		if($("#c-comments-container").hasClass("channel-content-sub-container-active"))
			unsubscribeToChannelComments(channelID);
		
		var tabHeaderText = jQuery.trim($(this).text());
		
		$(".channel-content-sub-container-active").fadeOut("fast").removeClass("channel-content-sub-container-active");
		$(".c-tab-header-active").removeClass("c-tab-header-active");
		switch(tabHeaderText)
		{
			case "Videos": $("#c-videos-container").fadeIn("fast").addClass("channel-content-sub-container-active");
						   $("#c-videos-tab").addClass("c-tab-header-active");
						   break;

			case "Comments": $("#c-comments-container").fadeIn("fast").addClass("channel-content-sub-container-active");
							 $("#c-comments-tab").addClass("c-tab-header-active");
							 populateComments();
							 subscribeToChannelComments(channelID);
						   	 break;

			case "Description": $("#c-desc-container").fadeIn("fast").addClass("channel-content-sub-container-active");
								$("#c-desc-tab").addClass("c-tab-header-active");
						   		break;
		}
	});

	// Click handler for btn-c-post-comment
	$("#btn-c-post-comment").on("click", function(e){
		comment = {};
		comment["c_id"] = channelViewer.user.uid;
		comment["ch_id"] = channelID;
		comment["c"] = $(".user-channel-comment .comment-textbox").val();
		$.ajaxq("channelQueue", {
			url: "/php/postChannelComment.php",
			type: "POST",
			data: {comment: comment},
			beforeSend: function(jqXHR, settings){
				$("#btn-c-post-comment").text("Loading...");
			},
			success: function(data){
				if(data == "comment posted")
				{
					$("#btn-c-post-comment").addClass("btn-success").text("Comment Posted");

					var comment = {};
					comment["commentor_name"] = channelViewer.user.first_name + " " + channelViewer.user.last_name;
					comment["comment"] = $(".user-channel-comment textarea").val();
					addChannelComment(comment, true, true);
					populateUserImage(channelViewer);

					setTimeout(function(){
						$("#btn-c-post-comment").removeClass("btn-success").text("Post Comment");
					}, 1000);
				}
			}
		})
	});
});

function initLayout()
{
	resizeImageContainers();
	initChannelLayout();
}

function initChannelLayout()
{
	//$(".wrapper").css({
	//	"min-width": windowWidth * 0.9,
	//	"min-height": windowHeight * 0.9
	//});
	$("#banner-container").css("line-height", $("#banner-container").height() + "px");
	$("#logo-container, #content-desc-header, #username").css("visibility", "visible");

	setTimeout(animateNavBar, 1000, "show");
	$("#c-channel-header").css("line-height", $("#c-channel-header").height().toString() + "px");
}

function populatePage()
{
	loadUserInfo();
	loadChannelInfo();
}

function loadUserInfo()
{
	var userInfoRequest = $.ajaxq("loadQueue", {
		url: "/php/userInfo.php",
		type: "GET",
		data: {uid: channelViewer},
		dataType: "json",
		success: function(data){
			channelViewer = data;
			$("#username").text(channelViewer.user.first_name + " " + channelViewer.user.last_name);
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log("Error(getNotifications):: jqXHR: " + jqXHR.status + " " + jqXHR.responseText + " textStatus: " + textStatus + " errorThrown: " + errorThrown);
		}
	});
}

function loadChannelInfo()
{
	$.ajaxq("loadQueue", {
		url: "/php/getChannelInfo.php",
		type: "GET",
		data: {cid: channelID},
		success: function(data){
			channelInfo = jQuery.parseJSON(data);
			$("#c-channel-name-container").text(channelInfo.channel_name);
			$("#c-channel-owner-container").text(channelInfo.channel_owner_name);
			$("#c-channel-header span").text(channelInfo.channel_name);
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log("Error(getNotifications):: jqXHR: " + jqXHR.status + " " + jqXHR.responseText + " textStatus: " + textStatus + " errorThrown: " + errorThrown);
		}
	});
}

function populateComments()
{
	populateUserImage(channelViewer);

	$.each($(".c-comment").get(), function(index, value){
		$(comment).remove();
	});
	
	$.ajaxq("channelInfoQueue", {
		url: "/php/getChannelComments.php",
		type: "GET",
		data: {ch_id: channelID},
		success: function(data){
			var channelComments = jQuery.parseJSON(data);
			$.each(channelComments, function(index, comment){
				if(comment.commentor_id == channelViewer)
					addChannelComment(comment, true, false);
				else
					addChannelComment(comment, false, false);
			});
			populateUserImage(channelViewer);
		}
	});
}

function addChannelComment(comment, isUserComment, isNewComment)
{
	if(isUserComment == true)
	{
		var commentContainer = "<div class='c-comment' style='display: none' >" + 
									"<div class='c-channel-comment-bubble image-container user-profile-image' ></div>" + 
									"<div class='c-channel-comment-name-container' >" + comment.commentor_name + "</div>" + 
									"<div class='c-channel-comment wordwrap' >" + comment.comment + "</div>" + 
									"<div class='overlay-divider' style='position: absolute; bottom: 0px' ></div>" + 
							   "</div>";
	}
	else
	{
		var commentContainer = "<div class='c-comment' style='display: none' >" + 
									"<div class='c-channel-comment-bubble image-container' style='background-image: url(" + comment.commentor_pi + ")'></div>" + 
									"<div class='c-channel-comment-name-container' >" + comment.commentor_name + "</div>" + 
									"<div class='c-channel-comment wordwrap' >" + comment.comment + "</div>" + 
									"<div class='overlay-divider' style='position: absolute; bottom: 0px' ></div>" + 
							   "</div>";
	}
	
	if(isNewComment == true)
	{
		var appendedElement = $(commentContainer).prependTo($("#c-comments"));
		$(appendedElement).fadeIn("fast").css("background-color", "#E8F4FF").animate({"background-color": "#FFFFFF"}, 3000);
	}
	else
	{
		$(commentContainer).appendTo($("#c-comments")).fadeIn("fast");
	}
	
}

function channelCommentHandler(topic, data)
{
	var channelComment = jQuery.parseJSON(data);
	console.log(channelComment);
	
	if(channelComment.commentor_id != channelViewer.user.uid)
		addChannelComment(channelComment, false, true);
}