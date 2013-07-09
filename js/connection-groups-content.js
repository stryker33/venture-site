var newConnectionGroup;

$(document).ready(function(e){
	// Init the new-cg-container overlay
	$("#btn-cg-create-new-cg").overlay({
		fixed: false,
		mask:{
			color: '#CCE0FF',
			loadSpeed: 200,
			opacity: 0.55
		},
		onLoad: function(e){
			resizeImageContainers();
		}
	});

	// Init the edit-cg-container overlay
	$("#cg-edit-cg-container").overlay({
		fixed: false,
		mask:{
			color: '#CCE0FF',
			loadSpeed: 200,
			opacity: 0.55
		},
		onLoad: function(e){
			resizeImageContainers();
		}
	});

	$("#btn-cg-create-new-cg").on("click", function(e){
		populateNewCGContainer(); 
		newConnectionGroup = {}; 
		newConnectionGroup["group_name"] = "";
		newConnectionGroup["group_members"] = new Array();
	});

	$(document).on("keyup", "#cg-new-cg-container #cg-search-connections", function(e){
		var searchQuery = jQuery.trim($(this).val()).toLowerCase();

		if(searchQuery != "")
		{
			$.each($(".cg-new-cg-connection").get(), function(index, connection){
				$(connection).show();;
			});
		}

		$.each($(".cg-new-cg-connection").get(), function(index, connection){
			$(connection).hide();;
		});

		$.each($(".cg-new-cg-connection"), function(index, connection){
			//var userName = connection.user.first_name + " " + connection.user.last_name;
			var userName = $($(connection).children()[1]).text();
			var searchPattern = new RegExp(searchQuery);
			if(searchPattern.test(userName.toLowerCase()))
				$(connection).show();
		});
	});

	$(document).on("keyup", "#cg-edit-cg-container #cg-search-connections", function(e){
		var searchQuery = jQuery.trim($(this).val()).toLowerCase();

		if(searchQuery != "")
		{
			$.each($(".cg-edit-cg-connection").get(), function(index, connection){
				$(connection).show();;
			});
		}

		$.each($(".cg-edit-cg-connection").get(), function(index, connection){
			$(connection).hide();;
		});

		$.each($(".cg-edit-cg-connection"), function(index, connection){
			//var userName = connection.user.first_name + " " + connection.user.last_name;
			var userName = $($(connection).children()[1]).text();
			var searchPattern = new RegExp(searchQuery);
			if(searchPattern.test(userName.toLowerCase()))
				$(connection).show();
		});
	});
	
	$(document).on("click", ".btn-cg-new-connection-action", function(e){
		var clickedElement = $(this);
		var clickedElementUID = parseInt($(this).parent().attr("uid"));

		if($(this).hasClass("btn-cg-new-connection-add"))
		{
			$(this).removeClass("btn-cg-new-connection-add").addClass("btn-cg-new-connection-remove").addClass("btn-success");
			$(this).text("Added to the Group");
			setTimeout(function(e){$(clickedElement).removeClass("btn-success"); $(clickedElement).text("Remove from the Group");}, fadeDelay);
			return;
		}

		if($(this).hasClass("btn-cg-new-connection-remove"))
		{
			$(this).removeClass("btn-cg-new-connection-remove").addClass("btn-cg-new-connection-add").addClass("btn-danger");
			$(this).text("Removed from the Group");
			setTimeout(function(e){$(clickedElement).removeClass("btn-danger"); $(clickedElement).text("Add to the Group");}, fadeDelay);
			return;
		}
	});

	$(document).on("click", "#btn-cg-create-group", function(e){
		var group_name = $("#cg-new-group-name").val();

		newConnectionGroup["group_name"] = group_name;
		$.each($(".cg-new-cg-connection"), function(e){
			if($($(this).children("button")).text() == "Remove from the Group")
				newConnectionGroup["group_members"].push($(this).attr("uid"));
		});

		if(group_name.replace(/\s+/g, "") == "")
		{
			displayMessage("error", "Group Name cannot be empty")
			return;
		}

		if(groupNameExists(group_name))
		{
			displayMessage("error", "Connection Group with the same name already exists");
			return;
		}

		if(newConnectionGroup.group_members.length == 0)
		{
			displayMessage("error", "No Connections added to the Connection Group");
			return;
		}

		newConnectionGroup["group_name"] = group_name;
		$.ajaxq("connectionGroupsQueue", {
			url: "/php/createNewCG.php",
			type: "GET",
			data: {uid: uid, cg: newConnectionGroup},
			beforeSend: function(jqXHR, settings){
				$("#btn-cg-create-group").text("Loading...");
			},
			success: function(data){
				if(data == "cg_created")
				{
					$("#btn-cg-create-group").css("width", "auto").addClass("btn-success");
					$("#btn-cg-create-group").text("Connection Group Created");
					var cg = jQuery.parseJSON(connectionGroups);
					setTimeout(appendCG, 1000, newConnectionGroup, true, cg.groups.length);
					setTimeout(loadConnectionGroups, 5000);
				}
			}
		});
	});

	$(document).on("keyup", "#search-connection-groups", function(e){
		var searchQuery = jQuery.trim($(this).val()).toLowerCase();

		if(searchQuery != "")
		{
			$.each($(".connection-group-container").get(), function(index, connectionGroup){
				$(connectionGroup).show();;
			});
		}

		$.each($(".connection-group-container").get(), function(index, connectionGroup){
			$(connectionGroup).hide();;
		});

		$.each($(".connection-group-container"), function(index, connectionGroup){
			//var userName = connection.user.first_name + " " + connection.user.last_name;
			var userName = $($(connectionGroup).children()[0]).text();
			var searchPattern = new RegExp(searchQuery);
			if(searchPattern.test(userName.toLowerCase()))
				$(connectionGroup).show();
		});
	});

	$(document).on("click", ".btn-cg-edit-cg", function(e){
		var position = $($(this).parent()).attr("position");
		$("#cg-edit-group-name").val("");
		populateEditCGContainer(parseInt(position));
		$("#cg-edit-cg-container").overlay().load();
	});

	$(document).on("click", ".btn-cg-edit-connection-action", function(e){
		var clickedElement = $(this);
		if($(this).hasClass("btn-cg-edit-connection-add"))
		{
			$(this).removeClass("btn-cg-edit-connection-add").addClass("btn-cg-edit-connection-remove").addClass("btn-success");
			$(this).text("Added to the Group");
			setTimeout(function(e){$(clickedElement).removeClass("btn-success"); $(clickedElement).text("Remove from the Group");}, fadeDelay);
			return;
		}

		if($(this).hasClass("btn-cg-edit-connection-remove"))
		{
			$(this).removeClass("btn-cg-edit-connection-remove").addClass("btn-cg-edit-connection-add").addClass("btn-danger");
			$(this).text("Removed from the Group");
			setTimeout(function(e){$(clickedElement).removeClass("btn-danger"); $(clickedElement).text("Add to the Group");}, fadeDelay);
			return;
		}
	});

	$(document).on("click", "#btn-cg-edit-done", function(e){
		var groupName = jQuery.trim($(this).prev().children("input").val());
		if(groupName == "")
		{
			displayMessage("error", "Connection Group Name cannot be empty");
			return;
		}

		var connectionGroup = {};
		connectionGroup["old_group_name"] = $(this).parent().parent().attr("old_group_name");
		connectionGroup["new_group_name"] = jQuery.trim($("#cg-edit-group-name").val());

		if(groupNameExists(connectionGroup["new_group_name"], connectionGroup["old_group_name"]))
		{
			displayMessage("error", "Connection Group with the same name already exists");
			return;
		}
		

		connectionGroup["group_members"] = new Array();		

		$.each($(".cg-edit-cg-connection"), function(e){
			if($($(this).children("button")).text() == "Remove from the Group")
				connectionGroup["group_members"].push($(this).attr("uid"));
		});

		if(connectionGroup["group_members"].length == 0)
		{
			displayMessage("error", "No Connections added to the Connection Group");
			return;
		}

		$.ajaxq("connectionGroupsQueue", {
			url: "/php/editCG.php",
			type: "GET",
			data: {uid: uid, cg: connectionGroup, a: "edit"},
			beforeSend: function(jqXHR, settings){
				$("#btn-cg-edit-done").text("Loading...");
			},
			success: function(data){
				if(data == "success")
				{	
					$("#btn-cg-edit-done").addClass("btn-success").text("Changes Saved");
					setTimeout(function(){
						loadConnectionGroups();
						$("#cg-edit-cg-container").overlay().close();
						$("#btn-cg-edit-done").removeClass("btn-success").text("Done");
					}, fadeDelay);
				}
			}
		})
	});

	$(document).on("click", ".btn-cg-remove-cg", function(e){
		var clickedElement = $(this);
		var parent = $(this).parent();
		var connectionGroup = {};
		connectionGroup["old_group_name"] = $(parent).children(".cg-connection-group-name").text();

		$.ajaxq("connectionGroupsQueue", {
			url: "/php/editCG.php",
			type: "GET",
			data: {uid: uid, cg: connectionGroup, a: ""},
			beforeSend: function(jqXHR, settings){
				$(clickedElement).text("Loading...");
			},
			success: function(data){
				if(data == "success")
				{
					$(clickedElement).addClass("btn-danger").text("Connection Group Removed");
					setTimeout(function(){
						$(parent).fadeOut("fast").remove();
						loadConnectionGroups();
					}, fadeDelay);
				}
			}
		})
	});

	$(document).on("click", "#btn-cg-select-all, #btn-cg-deselect-all",function(e){
		var parent = $(this).parent().parent();
		var newContainer, editContainer;
		if($(parent).attr("id") == "cg-new-cg-container")
			newContainer = parent;
		if($(parent).attr("id") == "cg-edit-cg-container")
			editContainer = parent;

		if($(this).attr("id") == "btn-cg-select-all")
		{
			if(newContainer)
			{
				$.each($(".cg-new-cg-connection").get(), function(index, connectionContainer){
					var btn = $(connectionContainer).children("button");
					if($(btn).text() == "Add to the Group")
					{
						$(btn).removeClass("btn-cg-new-connection-add").addClass("btn-cg-new-connection-remove").addClass("btn-success");
						$(btn).text("Added to the Group");
						setTimeout(function(e){$(btn).removeClass("btn-success"); $(btn).text("Remove from the Group");}, fadeDelay);				
					}
					
				});
			}
			if(editContainer)
			{
				$.each($(".cg-edit-cg-connection").get(), function(index, connectionContainer){
					var btn = $(connectionContainer).children("button");
					if($(btn).text() == "Add to the Group")
					{
						$(btn).removeClass("btn-cg-edit-connection-add").addClass("btn-cg-edit-connection-remove").addClass("btn-success");
						$(btn).text("Added to the Group");
						setTimeout(function(e){$(btn).removeClass("btn-success"); $(btn).text("Remove from the Group");}, fadeDelay);				
					}
				});
			}
		}

		if($(this).attr("id") == "btn-cg-deselect-all")
		{
			if(newContainer)
			{
				$.each($(".cg-new-cg-connection").get(), function(index, connectionContainer){
					var btn = $(connectionContainer).children("button");
					if($(btn).text() == "Remove from the Group")
					{
						$(btn).removeClass("btn-cg-new-connection-remove").addClass("btn-cg-new-connection-add").addClass("btn-danger");
						$(btn).text("Removed from the Group");
						setTimeout(function(e){$(btn).removeClass("btn-danger"); $(btn).text("Add to the Group");}, fadeDelay);				
					}
				});
			}
			if(editContainer)
			{
				$.each($(".cg-edit-cg-connection").get(), function(index, connectionContainer){
					var btn = $(connectionContainer).children("button");
					if($(btn).text() == "Remove from the Group")
					{
						$(btn).removeClass("btn-cg-edit-connection-remove").addClass("btn-cg-edit-connection-add").addClass("btn-danger");
						$(btn).text("Remove from the Group");
						setTimeout(function(e){$(btn).removeClass("btn-danger"); $(btn).text("Add to the Group");}, fadeDelay);				
					}
				});
			}	
		}
	});
});


function loadCGInfo()
{
	$.each($(".connection-group-container").get(), function(index, value){
		$(value).remove();
	});

	var cg = jQuery.parseJSON(connectionGroups)
	$.each(cg.groups, function(index, connectionGroup){
		appendCG(connectionGroup, false, index);
	});

	if($(".connection-group-container").get().length == 0)
		$("#empty-cg-indicator").show();

	loadCGAsOption();
}

function populateNewCGContainer()
{	
	$.each($(".cg-new-cg-connection").get(), function(index, connection){
		$(connection).remove();
	});

	$.each(connections, function(index, connection){
		var connectionContainer = "<div class='cg-new-cg-connection' uid='" + connection.user.uid + "' >"	+	
									"<div class='image-container cg-new-connection-image-container' style='background-image: url(" + connection.user.profile_image + ")' ></div>" + 
									"<div class='cg-new-connection-name' >" + connection.user.first_name + " " + connection.user.last_name + "</div>" + 
									"<button class='btn btn-mini btn-cg-new-connection-action btn-cg-new-connection-add' >Add to the Group</button>" + 
								  "</div>";

		$("#cg-new-cg-container div#cg-main-connections-container #cg-connections-container").append(connectionContainer);
	});
}

function appendCG(connectionGroup, isNew, position)
{
	$("#cg-new-group-name").val("");
	$("#btn-cg-create-group").css("width", "159px").removeClass("btn-success");
	$("#btn-cg-create-group").text("Create Connection Group");
	$("#empty-cg-indicator").hide();
	$("#btn-cg-create-new-cg").overlay().close();

	var groupMembers = connectionGroup["group_members"];
	var connectionGroup = "<div class='connection-group-container' style='display:none' position='" + position + "'>" + 
							"<div class='cg-connection-group-name' >" + connectionGroup["group_name"] + "</div>" + 
							"<div class='cg-member-images-container' >";

								//"<div class='cg-member-image' ></div>" + 
								//"<div class='cg-member-image' ></div>" + 

	var memberImage;
	$.each(groupMembers, function(index, member){
		member = getUser(parseInt(member)).user;
		connectionGroup += "<div class='image-container cg-member-image' style='background-image: url(" + member.profile_image + ")' " +  
							"title='" + member.first_name + " " + member.last_name + "' tip-gravity='ns' ></div>";
	});

	connectionGroup +=      "</div>" + 
							"<button class='btn btn-mini btn-cg-edit-cg' rel='#cg-edit-cg-container' ><i class='icon-cog' ></i> Edit Connection Group</button>" + 
							"<button class='btn btn-mini btn-cg-remove-cg' ><i class='icon-minus' ></i> Remove Connection Group</button>" + 
						  "</div>";

	var appendedElement = $(connectionGroup).prependTo("#connection-groups-container").fadeIn("fast");

	if(isNew)
		$(appendedElement).css("background-color", "#E8F4FF").animate({"background-color": "#FFFFFF"}, 3000);
}

function populateEditCGContainer(position)
{	
	$.each($(".cg-edit-cg-connection").get(), function(index, connection){
		$(connection).remove();
	});

	var cg = jQuery.parseJSON(connectionGroups);
	var connectionGroup = cg.groups[parseInt(position)];
	$("#cg-edit-cg-container .overlay-dialog-container-header span").text(connectionGroup.group_name);
	$("#cg-edit-cg-container").attr("old_group_name", connectionGroup.group_name);
	$("#cg-edit-group-name").val(connectionGroup.group_name);

	var groupMembers = new Array();
	$.each(connectionGroup["group_members"], function(index, member){
		groupMembers.push(parseInt(member));
	});

	$.each(connections, function(index, connection){
		if($.inArray(parseInt(connection.user.uid), groupMembers) != -1)
		{
			var connectionContainer = "<div class='cg-edit-cg-connection' uid='" + connection.user.uid + "' >"	+	
										"<div class='image-container cg-edit-connection-image-container' style='background-image: url(" + connection.user.profile_image + ")' ></div>" + 
										"<div class='cg-edit-connection-name' >" + connection.user.first_name + " " + connection.user.last_name + "</div>" + 
										"<button class='btn btn-mini btn-cg-edit-connection-action btn-cg-edit-connection-remove' >Remove from the Group</button>" + 
							  		  "</div>";
		}
		else
		{
			var connectionContainer = "<div class='cg-edit-cg-connection' uid='" + connection.user.uid + "' >"	+	
										"<div class='image-container cg-edit-connection-image-container' style='background-image: url(" + connection.user.profile_image + ")' ></div>" + 
										"<div class='cg-edit-connection-name' >" + connection.user.first_name + " " + connection.user.last_name + "</div>" + 
										"<button class='btn btn-mini btn-cg-edit-connection-action btn-cg-edit-connection-add' >Add to the Group</button>" + 
							  		  "</div>";
	
		}
	
		$("#cg-edit-cg-container div#cg-main-connections-container #cg-connections-container").append(connectionContainer)
	});
}

function groupNameExists(groupName, oldGroupName)
{
	var exists = false;
	var cg = jQuery.parseJSON(connectionGroups);
	$.each(cg.groups, function(index, connectionGroup){
		if(connectionGroup.group_name == groupName && connectionGroup.group_name != oldGroupName)
		{
			exists = true;
			return;
		}
	});

	return exists;
}

// loads the Connection Groups within the selectors
function loadCGAsOption()
{
	$.each($("#c-new-channel-visibility-select select option").get(), function(index, value){
		if(index > 1)
			$(value).remove();
	});

	$.each($("#c-edit-channel-visibility-select select option").get(), function(index, value){
		if(index > 1)
			$(value).remove();
	});
	
	$.each($("#ci-broadcast-visibility-container select option").get(), function(index, value){
		if(index > 1)
			$(value).remove();
	});
	
	var cg = jQuery.parseJSON(connectionGroups);
	$.each(cg.groups, function(index, connectionGroup){
		$("#c-new-channel-visibility-select select").append("<option>" + connectionGroup.group_name + "</option>");
	});

	$.each(cg.groups, function(index, connectionGroup){
		$("#c-edit-channel-visibility-select select").append("<option>" + connectionGroup.group_name + "</option>");
	});

	$.each(cg.groups, function(index, connectionGroup){
		$("#ci-broadcast-visibility-container select").append("<option>" + connectionGroup.group_name + "</option>");
	});
}