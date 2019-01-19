/**
 *
 * @param {DataHandler} datahandler
 */

class ApplicationHandler {
    constructor(root, dataHandler, navbarController) {
        this.panelList = {};
        this.root = root;
        this.navBarTemperatureDropdown = document.querySelector("[data-name='TemperatureDropDown']")
        this.dataHandler = dataHandler
        this.sensorsList = {};
        this.navbarController = navbarController;
        this.addRegisteredDevices()
    }

    registerPanel(panel) {

        this.panelList[panel.name] = panel;
    }

    addRegisteredDevices() {
        var asynchRequest = this.dataHandler.getDeviceList()
        asynchRequest.then(deviceList => {
            Object.keys(deviceList).forEach((key) => {
                if (typeof deviceList[key].type != "undefined") {
                    this.addSensorToNavbar(deviceList[key].id, deviceList[key].type)

                }
            })
        })
    }

    launchPanel(panelName) {
        var newPanel = null;
        if (panelName == "Dashboard") {
            newPanel = this.panelList["Dashboard"]
        }
        if (panelName == "SensorList") {
            newPanel = this.panelList["SensorList"]
        }
        if (typeof this.sensorsList[panelName] != "undefined")
        {
            if (panelName == this.sensorsList[panelName].instance.name) {
                newPanel = this.sensorsList[panelName].instance
            }
        }
        newPanel.remove(this.root);
        newPanel.show(this.root);
    }

    addSensorToNavbar(id, type) {
        this.sensorsList = this.navbarController.addSensorToDropdown(id, type)
        this.registerPanel(this.sensorsList[id].instance)
        this.sensorsList[id].dropDownItem.addEventListener('click', event => {
            this.launchPanel(id)
        })
    }
    removeSensorFromNavbar(id, type)
    {
        this.navbarController.removeSensorFromDropdown(id, type)
    }

    start(root) {

        this.launchPanel("Dashboard");
        let dashboard = document.querySelector("[data-name='DashboardLink']")
        dashboard.addEventListener("click", event => {
            this.launchPanel("Dashboard");
        });
        let sensor_list = document.querySelector("[data-name='SensorListLink']")
        sensor_list.addEventListener("click", event => {
            this.launchPanel("SensorList");
        })
        this.dataHandler.deviceConnectedEvent.addListener(client => {
            if (client.type == 'temperature') {
                this.addSensorToNavbar(client.id, client.type)
            }
        })
        this.dataHandler.deviceDisconnectedEvent.addListener( client =>{
            if (client.type == 'temperature') {
                this.removeSensorFromNavbar(client.id, client.type)
            }
        })
}
}
