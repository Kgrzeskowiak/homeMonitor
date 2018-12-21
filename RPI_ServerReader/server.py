from flask import Flask, jsonify, Response
import json

app = Flask(__name__)

@app.route('/')
def index():
    result = []
    with open('results.txt', 'r') as fileHandler:
        for line in fileHandler:
            date, temperature, humidity = line.strip().split(';')
            result.append({'date':date, 'temperature':temperature, 'humidity':humidity})
    resp = Response(json.dumps(result), content_type='application/json')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp
@app.route('/druga')
def druga():
    return 'Druga'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
