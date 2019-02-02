/**
 *
 * @param {DataHandler} datahandler
 */
class ApplicationHandler {
    constructor(root, dataHandler) {
        this.panelList = {};
        this.root = root;
        this.navbarController = new NavbarController(root, dataHandler)
        this.dataHandler = dataHandler
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
                    this.navbarController.addSensor(deviceList[key].id, deviceList[key].type, deviceList[key].state)
                    // this.addSensorToNavbar(deviceList[key].id, deviceList[key].type)

                }
            })
        })
    }

    launchPanel(panelName) {
        var newPanel = null;
        newPanel = this.panelList[panelName]
        newPanel.remove(this.root);
        newPanel.show(this.root);
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
                this.navbarController.addSensor(client.id, client.type, client.state)
              //  this.addSensorToNavbar(client.id, client.type, client.state)
            }
        })
        this.dataHandler.deviceDisconnectedEvent.addListener( client =>{
            if (client.type == 'temperature') {
                this.navbarController.setOffLine(client.id, client.type, "offline")
            }
        })
        this.navbarController.dropdownElementClicked.addListener(element => {
            this.launchPanel(element)
        })
        this.navbarController.sensorInstanceCreated.addListener(instance =>
        {
            this.registerPanel(instance)
        })
}
}
