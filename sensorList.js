class SensorList extends Panels {
    constructor(app, dataHandler) {
        super();
        this.name = "SensorList";
        this.dataHandler = dataHandler;
        this.sensorTable = ""
        this.interval = 900000

    }

    show(root) {
        var template = document.querySelector("#SensorList");
        var templateClone = document.importNode(template.content, true);
        root.appendChild(templateClone);
        this.active = true;
        this.getAndUpdateDeviceList()
        this.dataHandler.deviceChangedEvent.addListener(() => {
            this.refreshTable()
        })
        this.dataHandler.deviceConnectedEvent.addListener(() => {
            this.refreshTable()
        })
        this.dataHandler.deviceDisconnectedEvent.addListener( () => {
            this.refreshTable()
        })
    }

    getAndUpdateDeviceList() {
        var asynchRequest = this.dataHandler.getDeviceList()
        asynchRequest.then(deviceList => {
            this.updateDeviceList(deviceList)
        })
    }

    updateDeviceList(deviceList) {
        // asynchRequest.then(deviceList => 
        //     {
        Object.keys(deviceList).forEach((key) => {
            this.addTableRow(deviceList[key].id, deviceList[key].publisher, deviceList[key].topicSubscribed, deviceList[key].lastActivity)
        })
        // })
    }

    addTableRow(name, publisher, listener, lastAcivity) {
        this.sensorTable = document.querySelector("[data-name='SensorListTable']")
        var row = this.sensorTable.insertRow()

        function addRow(parameter) {
            row.insertCell().appendChild(document.createTextNode(parameter))
        }
        addRow(name)
        addRow(publisher)
        addRow(listener)
        addRow(moment(lastAcivity).fromNow())
    }

    refreshTable() {
        var asynchRequest = this.dataHandler.getDeviceList();
        asynchRequest.then((deviceList) => {
            while (this.sensorTable.childElementCount > 0) {
                this.sensorTable.removeChild(this.sensorTable.lastChild)
            }
            this.updateDeviceList(deviceList);
        })
    }
}