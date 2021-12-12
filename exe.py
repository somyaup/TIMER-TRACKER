from flask import Flask
from flask import render_template
import pandas as pd
app = Flask(__name__)
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
    return render_template("index.html")

@app.route('/log', methods=['GET','POST'])
def log():
    return render_template("data.html")
    if request.method == 'POST':
        data=request.get();
        with open('LOG.csv', "wb") as csv_file:
            writer = csv.writer(csv_file, delimiter=',')
            for line in data:
                writer.writerow(line)
            # update csv
        df = pd.read_csv('static/LOG.csv', index_col=0)#update html
        df.values.tolist("data.html")
    return 'OK', 200



app.run()
