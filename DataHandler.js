class DataHandler{
    constructor()
    {
        this.url = "http://192.168.1.9:5000/"
        this.movementEvent = new EventEmitter();
    }
getJson()
{
var getJsonPromise = new Promise((resolve, reject ) =>
{
    const xhr = new XMLHttpRequest();
    xhr.open("GET", this.url);
    xhr.send();
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
})
    getJsonPromise = getJsonPromise.then(matchList =>
        {
        var _jsonResults = JSON.parse(matchList)
        return _jsonResults;
        })
    return getJsonPromise;
}
webSocketHandler()
{
    var socket = io.connect('http://localhost:5000');
    socket.on('any event', (msg) => {
        this.movementEvent.emit(msg);
        console.log(msg);
});
    socket.on('connect', function() {
        
        socket.emit('my event', {data: 'I\'m connected!'});
});
}
}