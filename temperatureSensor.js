class TemperatureSensor extends Panels {
    constructor(name, type, root, dh) {
        super()
        this.root = root
        this.name = name
        this.dataHandler = dh
    }

    show(root) {
        var template = document.querySelector("#TemperatureSensorPanel");
        var templateClone = document.importNode(template.content, true);
        root.appendChild(templateClone);
        this.launchChart()
    }

launchChart()
{
    var ctx = document.getElementById("temperatureChart");
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
      text: this.name
    }
  }
    });
      this.getChartData()
}
getChartData()
{
    var asynchRequest = this.dataHandler.getTemperatureJson(this.name);
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
addTemperatureData(chart, data) {
    chart.data.datasets[0].data.push(data);
}
addHumidityData(chart, data) {
    chart.data.datasets[1].data.push(data);
}
addLabels(chart, label) {
    chart.data.labels.push(label)
}
}