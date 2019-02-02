
class TemperatureSensor extends Panels {
    constructor(name, type, root, dh) {
        super()
        this.root = root
        this.name = name
        this.dataHandler = dh
        this.selector = ''
    }

    show(root) {
        var template = document.querySelector("#TemperatureSensorPanel");
        var templateClone = document.importNode(template.content, true);
        root.appendChild(templateClone);
        this.selector = this.root.querySelector("[data-name='selectField']")
        var selectedTimeRange = this.selector.options[this.selector.selectedIndex].value
        this.selector.onchange = () => {
            selectedTimeRange = this.selector.selectedOptions[0].value
            this.removeData(this.chart)
            this.getChartData(selectedTimeRange)
        }
        this.launchChart(selectedTimeRange)
    }

    launchChart(timeRange) {
        var ctx = document.getElementById("temperatureChart");
        var timeFormat = 'MM/DD/YYYY HH:mm';
         var config = {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    label: "Temperatura",
                    borderColor: "#cd1823",
                    fill: false
                }, {
                    data: [],
                    label: "Wilgotność",
                    borderColor: "#1889ff",
                    fill: false
                }]
            },
            options: {
                title: {
                    display: true,
                    text: this.name
                }
            }
        };
        this.chart = new Chart(ctx, config);

        this.getChartData(timeRange)
    }

    getChartData(timeRange) {
        var asynchRequest = this.dataHandler.getTemperatureJson(this.name, timeRange);
        asynchRequest.then(json => {
            json.forEach(reading => {
                this.addTemperatureData(this.chart, reading.temperature)
                this.addHumidityData(this.chart, reading.humidity)
                this.addLabels(this.chart, reading.measurmentDate)
            })
            this.chart.update();
        })
    }
    removeData(chart) {
        while (chart.data.labels.length > 0)
        {
           chart.data.labels.pop();
        }
    chart.data.datasets.forEach((dataset) => {
        while (dataset.data.length > 0)
        {
            dataset.data.pop();
        }
    });
    chart.update();
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