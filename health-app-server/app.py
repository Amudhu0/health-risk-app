from flask import Flask, request, render_template

app = Flask(__name__, template_folder='../health-app-web/dist', static_folder='../health-app-web/dist/assets')

@app.route('/')
def home():
  return render_template('index.html')

@app.route('/health', methods=['POST'])
def health():
  print('request received', request)
  req_data = request.data.decode('utf-8')
  print('data:', req_data)
  return { 'diabetesRisk': 30, 'heartDiseaseRisk': 20 }

if __name__ == '__main__':
  app.run()