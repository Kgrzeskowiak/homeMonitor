class Dashboard extends Panels {
    constructor(app, dataHandler) {
        super();
        this.name = "Dashboard";
        this.dataHandler = dataHandler;
        this.chart = '';
        this.tiles = {};
        this.tileList = ['ThermometerFloor', "HumidityFloor", "TheromometerGroundFloor", "ThermometerOutside", "HumidityGroundFloor", "HumidityOutside"]
    }

    show(root) {
        var template = document.querySelector("#Dashboard");
        var templateClone = document.importNode(template.content, true);
        root.appendChild(templateClone);
        this.createTilesObject()
        this.tileList.forEach(tile => {
            this._updateTileValue(this.tiles[tile])
        })
        setInterval(() => {
            this.tileList.forEach(tile => {
                this._updateTileValue(this.tiles[tile])
            })
        }, 60000)
    }
    createTilesObject() {

        this.tileList.forEach(value => {
            var htmlObject = document.querySelector("[data-name=" + "'" + value + "']")
            var divs = htmlObject.querySelectorAll("div")
            this.tiles[value] = {
                name: value,
                upperTile: divs[0],
                lowerTile: divs[1],
                tempValue: divs[1].querySelector("p")
            }
        })
    }

    _updateTileValue(tile) {
        if (tile.name == "ThermometerFloor") {
            var asyncRequest = this.dataHandler.getLocationTemperature("floor")
            asyncRequest.then(json => {
                if (json.length > 0) {
                    var lastReading = json.pop()
                    this._setTemperatureTileColor(tile, lastReading)
                } else {
                    this._temperatureTileInactive(tile)
                }
            })
        }
        if (tile.name == "HumidityFloor") {
            var asyncRequest = this.dataHandler.getLocationTemperature("floor")
            asyncRequest.then(json => {
                if (json.length > 0) {
                    var lastReading = json.pop()
                    this._setHumidityTileColor(tile, lastReading)
                } else {
                    this._humidityTileInactive(tile)
                }
            })
        }
        if (tile.name == "TheromometerGroundFloor") {
            var asyncRequest = this.dataHandler.getLocationTemperature("groundFloor")
            asyncRequest.then(json => {
                if (json.length > 0) {
                    var lastReading = json.pop()
                    this._setTemperatureTileColor(tile, lastReading)
                } else {
                    this._temperatureTileInactive(tile)
                }
            })
        }
        if (tile.name == "HumidityGroundFloor") {
            var asyncRequest = this.dataHandler.getLocationTemperature("groundFloor")
            asyncRequest.then(json => {
                if (json.length > 0) {
                    var lastReading = json.pop()
                    this._setHumidityTileColor(tile, lastReading)
                } else {
                    this._humidityTileInactive(tile)
                }
            })
        }
        if (tile.name == "ThermometerOutside") {
            var asyncRequest = this.dataHandler.getLocationTemperature("outside")
            asyncRequest.then(json => {
                if (json.length > 0) {
                    var lastReading = json.pop()
                    this._setTemperatureTileColor(tile, lastReading)
                } else {
                    this._temperatureTileInactive(tile)
                }
            })
        }
        if (tile.name == "HumidityOutside") {
            var asyncRequest = this.dataHandler.getLocationTemperature("outside")
            asyncRequest.then(json => {
                if (json.length > 0) {
                    var lastReading = json.pop()
                    this._setHumidityTileColor(tile, lastReading)
                } else {
                    this._humidityTileInactive(tile)
                }
            })
        }

    }

    _setTemperatureTileColor(tile, readingResult) {

        if (readingResult.temperature >= 26) {
            this._valueHigh(tile)
        }
        if (readingResult.temperature < 20) {
            this._valueLow(tile)

        }
        if (readingResult.temperature > 20 && readingResult.temperature < 26) {
            this._valueNormal(tile)
        }
        tile.tempValue.innerHTML = readingResult.temperature + "°C"
    }

    _setHumidityTileColor(tile, readingResult) {
        if (readingResult.humidity >= 45) {
             this._valueHigh(tile)
        }
        if (readingResult.humidity < 35) {

            this._valueHigh(tile)

        }
        if (readingResult.humidity > 36 && readingResult.humidity < 44) {
            this._valueNormal(tile)
        }
        tile.tempValue.innerHTML = readingResult.humidity + "%"
    }

    _temperatureTileInactive(tile) {
        tile.upperTile.style.backgroundColor = "grey";
        tile.lowerTile.style.backgroundColor = "#CDCDCD";
        tile.tempValue.innerHTML = " -- °C"
    }

    _humidityTileInactive(tile) {
        tile.upperTile.style.backgroundColor = "grey";
        tile.lowerTile.style.backgroundColor = "#CDCDCD";
        tile.tempValue.innerHTML = " -- %"
    }

    _valueHigh(tile) {
        tile.upperTile.style.backgroundColor = "red";
        tile.lowerTile.style.backgroundColor = "#CDCDCD";
    }

    _valueNormal(tile) {
        tile.upperTile.style.backgroundColor = "green";
        tile.lowerTile.style.backgroundColor = "#CDCDCD";
    }

    _valueLow(tile) {
        tile.upperTile.style.backgroundColor = "blue";
        tile.lowerTile.style.backgroundColor = "#CDCDCD";
    }
}
