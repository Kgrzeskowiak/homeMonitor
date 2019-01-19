class Dashboard extends Panels{
    constructor(app, dataHandler)
    {
        super();
        this.name = "Dashboard";
        this.dataHandler = dataHandler;
        this.chart = '';
    }
show(root)
{
    var template = document.querySelector("#Dashboard");
    var templateClone = document.importNode(template.content,true);
    root.appendChild(templateClone);

}
}
