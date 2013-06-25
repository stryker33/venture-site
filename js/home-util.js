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