from flask import Flask, render_template, request, jsonify
import requests
from dotenv import load_dotenv
import os

# loads from .env file, necessary for API key
load_dotenv()

app = Flask(__name__)

# gets API key
api_key = os.getenv("OPENWEATHER_API_KEY")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather', methods=['POST', 'GET'])
def weather():
    city = request.args.get('city') or request.form.get('city')
    unit = request.args.get('unit', 'metric')  # Default to 'metric' (Celsius)

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units={unit}"

    response = requests.get(url)
    data = response.json()

    if data['cod'] == 200:
        weather_data = {
            'city': data['name'],
            'temp': data['main']['temp'],
            'description': data['weather'][0]['description'],
            'icon': data['weather'][0]['icon']
        }
        # returns weather data
        return jsonify({
            'weather': weather_data,
            'unit': 'C' if unit == 'metric' else 'F'
        })
    else:
        return jsonify({'weather': None, 'unit': 'C'})


if __name__ == '__main__':
    app.run(debug=True)
