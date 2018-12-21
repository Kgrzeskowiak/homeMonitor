class ApplicationHandler {
    constructor(root){
        this.panelList = {};
        this.root = root;

    }
registerPanel(panel){
    this.panelList[panel.name] = panel;
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
    newPanel.remove(this.root);
    newPanel.show(this.root);
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
    
}    
}