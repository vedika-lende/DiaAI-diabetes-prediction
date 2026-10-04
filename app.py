from flask import Flask, render_template, request, Response
import pickle
import numpy as np
import csv
import io
from datetime import datetime

app = Flask(__name__)

# ============================================================
# LOAD MODEL
# ============================================================

with open("diabetes_model.pkl", "rb") as file:
    model = pickle.load(file)


# ============================================================
# LOAD FEATURE NAMES
# ============================================================

with open("diabetes_features.pkl", "rb") as file:
    features = pickle.load(file)


# ============================================================
# PREDICTION HISTORY
# ============================================================

prediction_history = []


# ============================================================
# FEATURE INFORMATION
# ============================================================

feature_info = {
    "Pregnancies": {
        "label": "Pregnancies",
        "icon": "fa-person-pregnant"
    },
    "Glucose": {
        "label": "Glucose",
        "icon": "fa-droplet"
    },
    "BloodPressure": {
        "label": "Blood Pressure",
        "icon": "fa-heart-pulse"
    },
    "SkinThickness": {
        "label": "Skin Thickness",
        "icon": "fa-ruler"
    },
    "Insulin": {
        "label": "Insulin",
        "icon": "fa-syringe"
    },
    "BMI": {
        "label": "BMI",
        "icon": "fa-weight-scale"
    },
    "DiabetesPedigreeFunction": {
        "label": "Diabetes Pedigree",
        "icon": "fa-dna"
    },
    "Age": {
        "label": "Age",
        "icon": "fa-calendar"
    }
}


# ============================================================
# HOME / DASHBOARD
# ============================================================

@app.route("/", methods=["GET", "POST"])
def home():

    prediction = None
    probability = None
    prediction_class = None
    error = None

    # Keep entered values after prediction
    input_values = {
        "Pregnancies": "",
        "Glucose": "",
        "BloodPressure": "",
        "SkinThickness": "",
        "Insulin": "",
        "BMI": "",
        "DiabetesPedigreeFunction": "",
        "Age": ""
    }

    # ========================================================
    # PREDICTION
    # ========================================================

    if request.method == "POST":

        try:

            # ------------------------------------------------
            # GET FORM VALUES
            # ------------------------------------------------

            for feature in input_values:
                input_values[feature] = request.form.get(
                    feature, ""
                )

            # ------------------------------------------------
            # CONVERT VALUES TO FLOAT
            # ------------------------------------------------

            pregnancies = float(
                input_values["Pregnancies"]
            )

            glucose = float(
                input_values["Glucose"]
            )

            blood_pressure = float(
                input_values["BloodPressure"]
            )

            skin_thickness = float(
                input_values["SkinThickness"]
            )

            insulin = float(
                input_values["Insulin"]
            )

            bmi = float(
                input_values["BMI"]
            )

            diabetes_pedigree = float(
                input_values["DiabetesPedigreeFunction"]
            )

            age = float(
                input_values["Age"]
            )

            # ------------------------------------------------
            # CREATE MODEL INPUT
            # IMPORTANT:
            # Keep the same order used during model training.
            # ------------------------------------------------

            input_data = np.array([[
                pregnancies,
                glucose,
                blood_pressure,
                skin_thickness,
                insulin,
                bmi,
                diabetes_pedigree,
                age
            ]])

            # ------------------------------------------------
            # MODEL PREDICTION
            # ------------------------------------------------

            prediction_value = model.predict(input_data)[0]

            # ------------------------------------------------
            # MODEL PROBABILITY
            # ------------------------------------------------

            if hasattr(model, "predict_proba"):

                probabilities = model.predict_proba(
                    input_data
                )[0]

                probability = round(
                    float(max(probabilities)) * 100,
                    2
                )

            # ------------------------------------------------
            # RESULT
            # ------------------------------------------------

            if int(prediction_value) == 1:

                prediction = "Diabetes Detected"
                prediction_class = "danger"

            else:

                prediction = "No Diabetes Detected"
                prediction_class = "success"

            # ------------------------------------------------
            # SAVE HISTORY
            # ------------------------------------------------

            history_item = {
                "date": datetime.now().strftime(
                    "%d %b %Y"
                ),

                "time": datetime.now().strftime(
                    "%I:%M %p"
                ),

                "prediction": prediction,

                "probability": probability,

                "prediction_class": prediction_class,

                "Pregnancies": pregnancies,

                "Glucose": glucose,

                "BloodPressure": blood_pressure,

                "SkinThickness": skin_thickness,

                "Insulin": insulin,

                "BMI": bmi,

                "DiabetesPedigreeFunction":
                    diabetes_pedigree,

                "Age": age
            }

            prediction_history.insert(
                0,
                history_item
            )

            # Keep only latest 50 predictions
            if len(prediction_history) > 50:
                prediction_history.pop()

        except ValueError:

            error = (
                "Please enter valid numeric values "
                "for all fields."
            )

        except Exception as e:

            error = (
                f"Prediction error: {str(e)}"
            )

    # ========================================================
    # DASHBOARD STATISTICS
    # ========================================================

    total_predictions = len(
        prediction_history
    )

    diabetes_count = sum(
        1
        for item in prediction_history
        if item["prediction"] == "Diabetes Detected"
    )

    normal_count = sum(
        1
        for item in prediction_history
        if item["prediction"] ==
        "No Diabetes Detected"
    )

    # Average confidence
    probabilities = [
        item["probability"]
        for item in prediction_history
        if item["probability"] is not None
    ]

    if probabilities:

        average_confidence = round(
            sum(probabilities) /
            len(probabilities),
            2
        )

    else:

        average_confidence = 0

    # ========================================================
    # RENDER DASHBOARD
    # ========================================================

    return render_template(
        "index.html",

        # Prediction
        prediction=prediction,
        probability=probability,
        prediction_class=prediction_class,

        # Error
        error=error,

        # Form
        input_values=input_values,

        # Features
        features=features,
        feature_info=feature_info,

        # History
        history=prediction_history[:10],

        # Statistics
        total_predictions=total_predictions,
        diabetes_count=diabetes_count,
        normal_count=normal_count,
        average_confidence=average_confidence
    )


# ============================================================
# PREDICTION HISTORY
# ============================================================

@app.route("/history")
def history():

    return render_template(
        "history.html",
        history=prediction_history
    )


# ============================================================
# ANALYTICS
# ============================================================

@app.route("/analytics")
def analytics():

    total_predictions = len(
        prediction_history
    )

    diabetes_count = sum(
        1
        for item in prediction_history
        if item["prediction"] ==
        "Diabetes Detected"
    )

    normal_count = sum(
        1
        for item in prediction_history
        if item["prediction"] ==
        "No Diabetes Detected"
    )

    return render_template(
        "analytics.html",

        total_predictions=total_predictions,

        diabetes_count=diabetes_count,

        normal_count=normal_count,

        history=prediction_history
    )


# ============================================================
# DOWNLOAD HISTORY AS CSV
# ============================================================

@app.route("/download-history")
def download_history():

    output = io.StringIO()

    writer = csv.writer(output)

    # CSV headings
    writer.writerow([
        "Date",
        "Time",
        "Prediction",
        "Confidence",
        "Pregnancies",
        "Glucose",
        "BloodPressure",
        "SkinThickness",
        "Insulin",
        "BMI",
        "DiabetesPedigreeFunction",
        "Age"
    ])

    # CSV data
    for item in prediction_history:

        writer.writerow([
            item["date"],
            item["time"],
            item["prediction"],
            item["probability"],
            item["Pregnancies"],
            item["Glucose"],
            item["BloodPressure"],
            item["SkinThickness"],
            item["Insulin"],
            item["BMI"],
            item["DiabetesPedigreeFunction"],
            item["Age"]
        ])

    output.seek(0)

    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={
            "Content-Disposition":
            "attachment; filename=diabetes_prediction_history.csv"
        }
    )


# ============================================================
# CLEAR HISTORY
# ============================================================

@app.route("/clear-history", methods=["POST"])
def clear_history():

    prediction_history.clear()

    return render_template(
        "history.html",
        history=prediction_history
    )


# ============================================================
# ABOUT PAGE
# ============================================================

@app.route("/about")
def about():

    return render_template(
        "about.html"
    )


# ============================================================
# RUN APPLICATION
# ============================================================

if __name__ == "__main__":

    app.run(
        debug=True
    )