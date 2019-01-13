class Sensor1 extends Panels{
    constructor(app, dataHandler)
    {
        super();
        this.name = "Sensor1";
        this.dataHandler = dataHandler;
        this.chart = '';
    }
show(root)
{
    var template = document.querySelector("#Sensor1");
    var templateClone = document.importNode(template.content,true);
    root.appendChild(templateClone);
    var signalBox = root.querySelector("p")
    // this.dataHandler.webSocketHandler();
    // this.dataHandler.movementEvent.addListener(event => {
    //     if (event == "true")
    //     {
    //         signalBox.innerText = "Ruch"
    //     }
    //     else
    //     {
    //         signalBox.innerText = "Brak"
    //     }
    // })
    this.launchChart();
    var asynchRequest = this.dataHandler.getTemperatureJson();
    asynchRequest.then(json =>
        {
            json.forEach(reading =>
                {
                    this.addTemperatureData(this.chart,reading.temperature)
                    this.addHumidityData(this.chart,reading.humidity)
                    this.addLabels(this.chart, reading.date)
                })
                this.chart.update();
        })
}
launchChart()
{
    var ctx = document.getElementById("myChart");
    var timeFormat = 'MM/DD/YYYY HH:mm';
    this.chart = new Chart(ctx, {
        type: 'line',
  data: {
    labels: [],
    datasets: [{ 
        data: [],
        label: "Temperatura",
        borderColor: "#3e95cd",
        fill: false
      },{
      data: [],
      label: "Wilgotność",
      borderColor : "#ff0000",
      fill : false
      }]
  },
  options: {
    title: {
      display: true,
      text: 'Pomiary temperatury RPI'
    }
  }
    });  
}
addTemperatureData(chart, data) {
    chart.data.datasets[0].data.push(data);
}
addHumidityData(chart, data) {  
    chart.data.datasets[1].data.push(data);
}
addLabels(chart, label) {
    chart.data.labels.push(label)
}
showMovement()
{
  
    
    // console.log(r)

}
}
