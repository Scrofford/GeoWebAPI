function httpGetAsync(theUrl, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
        }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}


function attachListeners(){
  document.getElementByID('getButton').addEventListener('click',httpGetAsync);
}
