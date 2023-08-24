from flask import Flask, request, render_template, jsonify

app = Flask(__name__)


@app.route("/")
def record():
  return render_template('main.html')


@app.route('/about-TA')
def about():
  return render_template('about.html')

@app.route('/model-desc')
def modelDesc():
  return render_template('model-desc.html')


# @app.route('/upload_static_file', methods=['POST'])
# def upload_static_file():
#   print("Got request in static files")
#   print(request.files)
#   f = request.files['static_file']
#   f.save(f.filename)
#   resp = {"success": True, "response": "file saved!"}
#   return jsonify(resp), 200

if __name__ == '__main__':
  app.run(host="0.0.0.0", debug=True)
