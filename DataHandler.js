class DataHandler{
    constructor()
    {
        this.temperatureEndpoint = "http://192.168.1.9:3000/temperature"
        this.devicesListEndpoint = "http://192.168.1.9:3000/deviceList"
        this.movementEvent = new EventEmitter();
        this.deviceChangedEvent = new EventEmitter();
        this.deviceConnectedEvent = new EventEmitter();
        this.deviceDisconnectedEvent = new EventEmitter();
    }
getTemperaturesJson()
{
var getJsonPromise = new Promise((resolve, reject ) =>
{
    const xhr = new XMLHttpRequest();
    xhr.open("GET", this.temperatureEndpoint);
    xhr.send();
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
})
    getJsonPromise = getJsonPromise.then(measurments =>
        {
        var _jsonResults = JSON.parse(measurments)
        return _jsonResults;
        })
    return getJsonPromise;
}
getTemperatureJson(nodeName)
{
var getJsonPromise = new Promise((resolve, reject ) =>
{
    const xhr = new XMLHttpRequest();
    xhr.open("GET", this.temperatureEndpoint);
    xhr.setRequestHeader("name", nodeName)
    xhr.send()
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
})
    getJsonPromise = getJsonPromise.then(measurments =>
        {
        var _jsonResults = JSON.parse(measurments)
        return _jsonResults;
        })
    return getJsonPromise;
}
getDeviceList()
{
    var getDeviceListPromise = new Promise((resolve, reject) =>
    {
        const xhr = new XMLHttpRequest()
        xhr.open("GET", this.devicesListEndpoint);
        xhr.send();
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror= () => reject(xhr.statusText);
    })
    getDeviceListPromise = getDeviceListPromise.then(deviceList =>
        {
            var _jsonResults = JSON.parse(deviceList)

            return _jsonResults
        })
    return getDeviceListPromise
}
webSocketHandler()
{
    var socket = io('http://192.168.1.9:5000');
    socket.on('sensor change', (msg) =>{
        this.deviceChangedEvent.emit(msg);
    })
    socket.on('device connected', (msg) =>
    {
        this.deviceConnectedEvent.emit(msg);
    })
    socket.on('device disconnected', (msg) =>
    {
        this.deviceDisconnectedEvent.emit(msg)
    })
    
    // socket.on('connect', function(){});
    // socket.on('event', function(data){});
    // socket.on('disconnect', function(){});
}
}