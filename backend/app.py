from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

firewall_rules = []

@app.route('/add_rule', methods=['POST'])
def add_rule():
    data = request.json
    port = data.get('port')
    action = data.get('action', 'ACCEPT')
    if not port:
        return jsonify({"error": "Port required"}), 400
    rule = {"port": port, "action": action}
    firewall_rules.append(rule)
    return jsonify({"message": f"Rule added: {action} port {port}", "rules": firewall_rules})

@app.route('/delete_rule', methods=['POST'])
def delete_rule():
    data = request.json
    port = data.get('port')
    if not port:
        return jsonify({"error": "Port required"}), 400
    global firewall_rules
    firewall_rules = [r for r in firewall_rules if r["port"] != port]
    return jsonify({"message": f"Rule deleted for port {port}", "rules": firewall_rules})

@app.route('/list_rules', methods=['GET'])
def list_rules():
    return jsonify({"rules": firewall_rules})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
