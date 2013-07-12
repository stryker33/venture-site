var channelCommentServer = "ws://localhost:8081"; 
var ccConn; // channelCommentServer Connection Object

/******************************************************************************/
/*
*
* Functions
*
*/
/******************************************************************************/

function channelCommentServerConnect()
{
	ccConn = new ab.Session(channelCommentServer, onCCOpen, onCCClose, {
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

function onCCOpen()
{
	console.log("Connected to the channelCommentServer : " + channelCommentServer);
	
}

function onCCClose(code, reason, detail)
 {
    switch (code) 
    {
        case ab.CONNECTION_CLOSED: console.log("Connection was closed properly - done.");
               					   break;

        case ab.CONNECTION_UNREACHABLE: console.log("Connection could not be established.");
               							break;
        case ab.CONNECTION_UNSUPPORTED: console.log("Browser does not support WebSocket.");
               							break;
        case ab.CONNECTION_LOST: console.log("Connection lost - reconnecting ...");
               					 setTimeout(channelCommentServerConnect, 1000);
               					 break;
    }
    console.log("Connection to the channelCommentServer closed");
}

function subscribeToChannelComments(channelID)
{
	ccConn.subscribe(channelID, channelCommentHandler);
	console.log("Subscribed to channel comments: " + channelID);
}

function unsubscribeToChannelComments(channelID)
{
	console.log("Unsubscribed from channel comments: " + channelID);
	ccConn.unsubscribe(channelID);
	
}