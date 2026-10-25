
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def inicio():
    return render_template("index.html")


@app.route("/experiencias")
def experiencias():
    return render_template("experiencias.html")


@app.route("/decoraciones")
def decoraciones():
    return render_template("decoraciones.html")


@app.route("/boutique")
def boutique():
    return render_template("boutique.html")


@app.route("/desayunos")
def desayunos():
    return render_template("desayunos.html")


@app.route("/contacto")
def contacto():
    return render_template("contacto.html")


if __name__ == "__main__":
    app.run(debug=True)
