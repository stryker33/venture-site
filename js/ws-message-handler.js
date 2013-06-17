var notificationServer = "ws://localhost:8080"; 
var nsConn; // NotificationServer Connection Object

/******************************************************************************/
/*
*
* Functions
*
*/
/******************************************************************************/

function webSocketServerConnect()
{
	notificationServerConnect();
}

function notificationServerConnect()
{
	nsConn = new ab.Session(notificationServer, onNSOpen, onNSClose, {
		"skipSubprotocolCheck": true
	});
}

/******************************************************************************/
/*
*
* Event Handlers
*
*/
/******************************************************************************/

function onNSOpen()
{
	console.log("Connected to the NotificationServer : " + notificationServer);
	nsConn.subscribe(uid, function(topic, data){
		var notification = jQuery.parseJSON(data);
		
		if(notification.notificationType == "connRequest")
		{
			$(buildConnectionRequestUser(notification.from)).appendTo("#connection-requests-content"); //connection-request-content.js
			showNI("Connections", 1); // nav-menu-base.js
			showNI("Connection Requests", 1); // nav-menu-base.js
		}
	});
}

function onNSClose()
{
	console.log("Connection to the NotificationServer closed");
}