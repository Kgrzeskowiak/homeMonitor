class SensorList extends Panels{
    constructor(app, dataHandler)
    {
        super();
        this.name = "SensorList";
        this.dataHandler = dataHandler;
        this.sensorTable = ""
        this.interval = 900000
        this.refreshTable()
    }
    show(root)
    {
    var template = document.querySelector("#SensorList");
    var templateClone = document.importNode(template.content,true);
    root.appendChild(templateClone);
    this.updateDeviceList()
    }
    updateDeviceList()
    {
        var asynchRequest = this.dataHandler.getDeviceList();
        asynchRequest.then(deviceList => 
            {
                Object.keys(deviceList).forEach((key) => {
                    this.addTableRow(deviceList[key].id, deviceList[key].publisher, deviceList[key].topicSubscribed, deviceList[key].lastActivity)
                })
            })
    }
    addTableRow(name, publisher,listener, lastAcivity)
    {
        this.sensorTable = document.querySelector("[data-name='SensorListTable']")
        var row = this.sensorTable.insertRow()
        function addRow(parameter)
        {
            row.insertCell().appendChild(document.createTextNode(parameter))
        }
        addRow(name)
        addRow(publisher)
        addRow(listener)
        addRow(moment(lastAcivity).fromNow())
    }
    refreshTable()
    {
        setInterval( () => {
        while (this.sensorTable.childElementCount > 0)
        {
            this.sensorTable.removeChild(this.sensorTable.lastChild)
        }
        this.updateDeviceList();
        },this.interval)
    }
}