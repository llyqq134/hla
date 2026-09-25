from flask import Flask 
from prometheus_client import Counter, Histogram, generate_latest

app = Flask(__name__)
REQUESTS = Counter('http_requests_total', 'Total requests', ['method', 'endpoint', 'status'])
LATENCY = Histogram('http_request_duration_seconds', 'Request latency', ['endpoint'])

@app.route('/')
def index():
    with LATENCY.labels(endpoint='/').time():
        REQUESTS.labels(method='GET', endpoint='/', status='200').inc()
        return "Hello from app!"

@app.route('/metrics')
def metrics():
    return generate_latest(), 200, {'Content-Type': 'text/plain'}
