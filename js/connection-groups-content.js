var newConnectionGroup;

$(document).ready(function(e){
	// Init the new-cg-container overlay
	$("#btn-cg-create-new-cg").overlay({fixed: false});

	populateNewCGContainer();

	$("#btn-cg-create-new-cg").on("click", function(e){
		populateNewCGContainer(); 
		newConnectionGroup = {}; 
		newConnectionGroup["group_name"] = "";
		newConnectionGroup["group_members"] = new Array();
	});

	$(document).on("keyup", "#cg-search-connections", function(e){
		var searchQuery = $(this).val().replace(/\s+/g, "").toLowerCase();

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
			console.log(searchQuery + " " + userName);
			if(searchPattern.test(userName.toLowerCase()))
				$(connection).show();
		});
	});

	$(document).on("click", ".btn-cg-new-connection-action", function(e){
		var clickedElement = $(this);
		var clickedElementUID = parseInt($(this).parent().attr("uid"));

		if($(this).hasClass("btn-cg-new-connection-add"))
		{
			newConnectionGroup["group_members"].push(clickedElementUID);
			$(this).removeClass("btn-cg-new-connection-add").addClass("btn-cg-new-connection-remove").addClass("btn-success");
			$(this).text("Added to the Group");
			setTimeout(function(e){$(clickedElement).removeClass("btn-success"); $(clickedElement).text("Remove from the Group");}, 500);
			return;
		}

		if($(this).hasClass("btn-cg-new-connection-remove"))
		{
			$.each(newConnectionGroup.group_members, function(index, member){
				if(member == clickedElementUID)
					newConnectionGroup.group_members.splice(index);
			});
			$(this).removeClass("btn-cg-new-connection-remove").addClass("btn-cg-new-connection-add").addClass("btn-danger");
			$(this).text("Removed from the Group");
			setTimeout(function(e){$(clickedElement).removeClass("btn-danger"); $(clickedElement).text("Add to the Group");}, 500);
			return;
		}
	});

	$(document).on("click", "#btn-cg-create-group", function(e){
		var group_name = $("#cg-new-group-name").val();

		if(group_name.replace(/\s+/g, "") == "")
		{
			return;
		}

		if(newConnectionGroup.group_members.length == 0)
		{
			return;
		}

		newConnectionGroup["group_name"] = group_name;
		$.ajax({
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
					setTimeout(appendCG, 1000);
				}
			}
		});
	});
});

function populateNewCGContainer()
{
	$.each($(".cg-new-cg-connection").get(), function(index, connection){
		$(connection).remove();
	});

	$.each(connections, function(index, connection){
		var connectionContainer = "<div class='cg-new-cg-connection' uid='" + connection.user.uid + "' >"	+	
									"<div class='cg-new-connection-image-container' ></div>" + 
									"<div class='cg-new-connection-name' >" + connection.user.first_name + " " + connection.user.last_name + "</div>" + 
									"<button class='btn btn-mini btn-cg-new-connection-action btn-cg-new-connection-add' >Add to the Group</button>" + 
								  "</div>";

		$("#cg-connections-container").append(connectionContainer);
	});
}

function appendCG()
{
	$("#cg-new-group-name").val("");
	$("#btn-cg-create-group").css("width", "159px").removeClass("btn-success");
	$("#btn-cg-create-group").text("Create Connection Group");
	$("#empty-cg-indicator").hide();
	$("#btn-cg-create-new-cg").overlay().close();

	var connectionGroup = "<div class='connection-group-container' style='display:none' >" + 
							"<div class='cg-connection-group-name' >" + group_name + "</div>" + 
							"<div class='cg-member-images-container' >" + 
								"<div class='cg-member-image' ></div>" + 
								"<div class='cg-member-image' ></div>" + 
							"</div>" + 
							"<button class='btn btn-mini btn-cg-edit-cg' ><i class='icon-cog' ></i> Edit Connection Group</button>" + 
							"<button class='btn btn-mini btn-cg-remove-cg' ><i class='icon-minus' ></i> Remove Connection Group</button>" + 
						  "</div>";

	var appendedElement = $(connectionGroup).appendTo("#connection-groups-container").fadeIn("fast");
	$(appendedElement).css("background-color", "#E8F4FF").animate({"background-color": "#FFFFFF"}, 3000);	
}