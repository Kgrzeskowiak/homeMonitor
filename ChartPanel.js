class ChartPanel extends Panels{
    constructor()
    {
        super();
        this.name = "ChartPanel";
        
    }
show(root)
{
    var template = document.querySelector("#ChartPanel");
    var templateClone = document.importNode(template.content,true);
    root.appendChild(templateClone);
  
}
}