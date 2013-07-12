$(document).ready(function(e){

	// Changes the color of navmenu-control-container icons on hover
	$("#navmenu-control-container").hover(function(e){
		$("#navmenu-control-container i").addClass("icon-white");
	}, function(e){
		$("#navmenu-control-container i").removeClass("icon-white");
	});

	// Click handler for navmenu-control-container
	$("#navmenu-control-container").on("click", function(e){
		if($(this).hasClass("show-menu"))
		{
			animateNavBar("show");
		}
		else if($(this).hasClass("affix-menu"))
		{
			animateNavBar("hide")
		}
	});

});
function getUser(uid)
{
	var user;
	$.each(connections, function(index, connection){
		if(connection.user.uid == uid)
		{
			user = connection;
		}
	});

	return user;
}