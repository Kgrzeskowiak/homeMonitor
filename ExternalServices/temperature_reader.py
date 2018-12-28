import Adafruit_DHT as DHT
import datetime
import time
import i2c


class TemperatureReader:
    def __init__(self, interval = None):
        self.pin = 17
        self.interval = interval or 1800

    def read(self):
        return DHT.read_retry(DHT.DHT11, self.pin)
    def saveResult(self):

        t = self.read()[1]

        h = self.read()[0]

        x = 0
        readList = []
        while x < 3:
            if x == 0:
                i2c.lcd_string("25%", 0xC0)
            if x == 1:
                i2c.lcd_string("50%", 0xC0)
            if x == 2:
                i2c.lcd_string("80%", 0xC0)
            print(x)
            readList.append({'temperature':self.read()[1],'humidity':self.read()[0]})
            x += 1
        x = 0
        i2c.lcd_string("100%", 0xC0)
        temperature = sum(item['temperature'] for item in readList)/len(readList)
        humidity = sum(item['humidity'] for item in readList)/len(readList)
        i2c.clear()
        i2c.lcd_string("Temperatura {}".format(temperature),0x80)
        i2c.lcd_string("Wilgotnosc {}".format(humidity),0xC0)
        with open('results.txt', 'a+') as fileHandler:
            fileHandler.write(datetime.datetime.now().strftime('%d-%m-%y %H:%M;'))
            fileHandler.write(str(temperature)+';')
            fileHandler.write(str(humidity))
            fileHandler.write('\n')
    def startReading(self):
        while True:
            i2c.clear()
            i2c.lcd_string("Pomiar w toku", 0x80)
            i2c.lcd_string("0%", 0xC0)
            self.saveResult()
            time.sleep(self.interval)






