/**
 *
 * @param {DataHandler} datahandler
 */
class NavbarController {
    constructor(root, dh) {
        this.sensorList = {}
        this.root = root
        this.dh = dh
        this.temperatureDropdown = document.querySelector("[data-name='temperatureDropdown']")
        this.dropdownElementClicked = new EventEmitter();
        this.sensorInstanceCreated = new EventEmitter()
    }

    addSensor(client, type, state) {
        if (client in this.sensorList) {
            this.sensorList[client].state = state
            this._setLabelState(client, this.sensorList[client].dropDownItem, this.sensorList[client].state)
        } else {
            if (type == 'temperature') {
                this.sensorList[client] = {client: client, type: type, state: state}
                this._addTemperatureSensorElement(client, type, state)
                this.temperatureDropdown.classList.remove("invisible")
            }
        }
    }

    setOffLine(client, type, state) {
        if (type == 'temperature') {
            this._setLabelState(client, this.sensorList[client].dropDownItem, state)
        }
    }

    _addTemperatureSensorElement(client, type, state) {
        var temperatureDropDown = document.querySelector("[data-name='TemperatureDropDown']")
        var newSensorElement = temperatureDropDown.appendChild(document.createElement("a"))
        newSensorElement.className = "dropdown-item"
        newSensorElement.setAttribute('href', "#")
        this._setLabelState(client, newSensorElement, state)
        var instance_class = new TemperatureSensor(client, type, this.root, this.dh)
        this.sensorList[client].instance = instance_class
        this.sensorList[client]. dropDownItem = newSensorElement
        this.sensorInstanceCreated.emit(this.sensorList[client].instance);
        this.sensorList[client].dropDownItem.addEventListener("click", () => {
            this.dropdownElementClicked.emit(this.sensorList[client].instance.name)
        })
    }

    _setLabelState(client, dropdownElement, state) {
        var name = client
        if (state == "online") {
            dropdownElement.innerHTML = name
        }
        if (state == "offline") {
            dropdownElement.innerHTML = name + " (Offline)"
        }
    }
}