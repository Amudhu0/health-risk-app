from flask import Flask, request, render_template
from health_model import predict_diabetes
import json

app = Flask(__name__, template_folder='../health-app-web/dist', static_folder='../health-app-web/dist/assets')

@app.route('/')
def home():
  return render_template('index.html')

@app.route('/health', methods=['POST'])
def health():
  req_data = request.data.decode('utf-8')
  req_data = json.loads(req_data)
  diabetesRisk = predict_diabetes(req_data)

  return { 'diabetesRisk': diabetesRisk, 'heartDiseaseRisk': 20 }

if __name__ == '__main__':
  app.run()