class ApplicationHandler {
    constructor(root){
        this.panelList = {};
        this.root = root;
        this.navBar = document.querySelector("[data-name='Navbar']")

    }
registerPanel(panel){
    this.panelList[panel.name] = panel;
    this.addNewNavBarPanel(panel)
}
launchPanel(panelName){
    var newPanel = null;
    if (panelName == "ChartPanel")
    {
    newPanel = this.panelList["ChartPanel"]    
    }
    if (panelName == "Sensor1")
    {
    newPanel = this.panelList["Sensor1"]
    }
    if (panelName == "SensorList")
    {
    newPanel = this.panelList["SensorList"]
    }
    newPanel.remove(this.root);
    newPanel.show(this.root);
}
addNewNavBarPanel(panel)
{
  
}
start(root){
    this.launchPanel("Sensor1");
    let sensor1_link = document.querySelector("[data-name='Sensor1Link']")
    sensor1_link.addEventListener("click", event =>{
        this.launchPanel("Sensor1");
    });
    let charts_link = document.querySelector("[data-name='ChartPanelLink']")
    charts_link.addEventListener("click", event =>{
        this.launchPanel("ChartPanel");
    });
    let sensor_list = document.querySelector("[data-name='SensorListLink']")
    sensor_list.addEventListener("click", event =>{
        this.launchPanel("SensorList");
    })
    
}    
}