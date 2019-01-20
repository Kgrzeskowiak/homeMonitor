/**
 *
 * @param {DataHandler} datahandler
 */
class NavbarController{
    constructor(root, dh)
    {
        this.sensorList = {}
        this.root = root
        this.dh = dh
        this.temperatureDropdown = document.querySelector("[data-name='temperatureDropdown']")
    }

addSensorToDropdown(client, type) {
        this.sensorList[client] = {client : client, type : type}
    if (type == 'temperature')
    {
        this._addTemperatureSensorElement(client,type)
        this.temperatureDropdown.classList.remove("invisible")
        return this.sensorList
    }
    return this.sensorList
}
removeSensorFromDropdown(client, type)
{
    if (type == 'temperature')
    {
        this._removeTemperatureElement(client)

        return this.sensorList
    }
}
_removeTemperatureElement(client, type)
{
    var temperatureDropDown = document.querySelector("[data-name='TemperatureDropDown']")
    temperatureDropDown.removeChild(this.sensorList[client].dropDownItem)
    delete this.sensorList[client]
    if(Object.keys(this.sensorList).length > 0) {
        Object.keys(this.sensorList).forEach((key) => {
            if (this.sensorList[key].type == 'temperature') {
                return true
            } else {
                this.temperatureDropdown.classList.add("invisible")
            }

        })
    }
    else
    {
        this.temperatureDropdown.classList.add("invisible")
    }
}
_addTemperatureSensorElement(client, type)
{
    var temperatureDropDown = document.querySelector("[data-name='TemperatureDropDown']")
    var newSensorElement = temperatureDropDown.appendChild(document.createElement("a"))
    newSensorElement.className = "dropdown-item"
    newSensorElement.innerHTML = client
    newSensorElement.setAttribute('href', "#")
    var instance_class = new TemperatureSensor(client, type, this.root, this.dh)
    this.sensorList[client] = {instance: instance_class, dropDownItem: newSensorElement}

}}