from flask import Flask, request, jsonify

app = Flask(__name__)

# Mock database to track ingestion statuses
ingestion_status = {}

@app.route('/ingestion', methods=['POST'])
def trigger_ingestion():
    """Trigger ingestion for a given document ID."""
    data = request.json
    document_id = data.get("documentId")

    if not document_id:
        return jsonify({"error": "documentId is required"}), 400

    ingestion_status[document_id] = "In Progress"
    return jsonify({"message": "Ingestion triggered", "documentId": document_id}), 200

@app.route('/ingestion/status', methods=['GET'])
def get_ingestion_status():
    """Get the ingestion status for a given document ID."""
    document_id = request.args.get("documentId")

    if not document_id:
        return jsonify({"error": "documentId is required"}), 400

    status = ingestion_status.get(document_id, "Not Found")
    return jsonify({"documentId": document_id, "status": status}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)