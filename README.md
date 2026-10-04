# 🩺 DiaAI – Diabetes Prediction System

DiaAI is an AI-powered web application that uses **Machine Learning** to predict the likelihood of diabetes based on important health-related parameters. The system is developed using **Python, Flask, and Decision Tree Classification** with an interactive and user-friendly healthcare dashboard.

## 📌 Project Overview

Diabetes is a common health condition influenced by various factors such as glucose level, blood pressure, BMI, insulin level, age, and other health parameters.

**DiaAI** analyzes these parameters using a trained Machine Learning model and provides a prediction through a simple and interactive web interface.

> ⚠️ **Disclaimer:** DiaAI is developed for educational and research purposes. The prediction should not be considered a medical diagnosis or a replacement for professional medical advice.

## 🎯 Objectives

* Predict diabetes risk using Machine Learning.
* Develop an interactive Flask-based web application.
* Use a Decision Tree Classifier for prediction.
* Display prediction confidence.
* Maintain prediction history.
* Provide prediction analytics.
* Create a responsive and professional healthcare dashboard.

## 🧠 Machine Learning Model

The project uses a **Decision Tree Classifier** for diabetes prediction.

### Input Features

| Feature                  | Description                      |
| ------------------------ | -------------------------------- |
| Pregnancies              | Number of pregnancies            |
| Glucose                  | Blood glucose concentration      |
| BloodPressure            | Blood pressure measurement       |
| SkinThickness            | Skin thickness measurement       |
| Insulin                  | Insulin level                    |
| BMI                      | Body Mass Index                  |
| DiabetesPedigreeFunction | Diabetes pedigree function value |
| Age                      | Age of the individual            |

### Prediction Output

The system provides two possible outcomes:

* ✅ **No Diabetes Detected**
* ⚠️ **Diabetes Detected**

The application also displays the model's prediction confidence when available.

## ✨ Features

* 🏠 Interactive healthcare dashboard
* 🔮 Diabetes prediction
* 📊 Prediction confidence
* 📈 Analytics dashboard
* 📜 Prediction history
* 📥 Download prediction history as CSV
* 🌓 Dark/Light mode
* 📱 Responsive design
* ⚡ Fast Flask-based prediction
* 🤖 Machine Learning-powered results

## 🛠️ Technologies Used

* **Python**
* **Flask**
* **Scikit-learn**
* **NumPy**
* **HTML5**
* **CSS3**
* **JavaScript**
* **Git & GitHub**

## 🏗️ System Workflow

```text
             ┌─────────────┐
             │    User     │
             └──────┬──────┘
                    ↓
       ┌────────────────────────┐
       │Enter Health Information│
       └───────────┬────────────┘
                   ↓
       ┌────────────────────────┐
       │    Input Validation    │
       └───────────┬────────────┘
                   ↓
       ┌────────────────────────┐
       │  Prepare Feature Data  │
       └───────────┬────────────┘
                   ↓
       ┌────────────────────────┐
       │Decision Tree Classifier│
       └───────────┬────────────┘
                   ↓
       ┌────────────────────────┐
       │ Generate Prediction    │
       └───────────┬────────────┘
                   ↓
       ┌────────────────────────┐
       │ Calculate Confidence   │
       └───────────┬────────────┘
                   ↓
       ┌────────────────────────┐
       │ Display Prediction     │
       └───────────┬────────────┘
                   ↓
       ┌────────────────────────┐
       │Store Prediction History│
       └───────────┬────────────┘
                   ↓
       ┌────────────────────────┐
       │ Analytics / History    │
       └────────────────────────┘
```

## 📁 Project Structure

```text
DiaAI-diabetes-prediction/
│
├── app.py
├── Decision Tree Diabetes Data.ipynb
├── diabetes.csv
├── diabetes_features.pkl
├── diabetes_model.pkl
├── README.md
│
├── templates/
│   ├── index.html
│   ├── history.html
│   ├── analytics.html
│   └── about.html
│
└── static/
    ├── css/
    │   └── style.css
    │
    └── js/
        └── script.js
```

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/diaai-diabetes-prediction.git
```

### 2. Navigate to the Project Folder

```bash
cd diaai-diabetes-prediction
```

### 3. Create a Virtual Environment

```bash
python -m venv venv
```

### 4. Activate the Virtual Environment

#### Windows

```bash
venv\Scripts\activate
```

#### macOS/Linux

```bash
source venv/bin/activate
```

### 5. Install Dependencies

```bash
pip install -r requirements.txt
```

### 6. Run the Application

```bash
python app.py
```

### 7. Open in Browser

```text
http://127.0.0.1:5000/
```

## 📦 Requirements

The main libraries used in the project are:

```text
Flask
numpy
scikit-learn
```

## 📊 Application Modules

### 🏠 Dashboard

Provides an overview of the application, model status, and prediction statistics.

### 🔮 Prediction

Allows users to enter eight health-related parameters and receive a diabetes prediction.

### 📈 Analytics

Displays statistics and visualizations based on prediction results.

### 📜 History

Stores and displays previous predictions along with date, time, input values, and confidence.

### ℹ️ About

Provides information about DiaAI and the project.

## 🔄 Application Workflow

```text
Enter Health Information
          ↓
Validate Input Data
          ↓
Prepare Feature Array
          ↓
Load Trained Model
          ↓
Decision Tree Prediction
          ↓
Calculate Confidence
          ↓
Display Result
          ↓
Store Prediction History
          ↓
View Analytics / History
```

## 📊 Prediction Parameters

The user provides the following health-related information:

```text
Pregnancies
Glucose
Blood Pressure
Skin Thickness
Insulin
BMI
Diabetes Pedigree Function
Age
```

These values are passed to the trained Decision Tree model to generate the prediction.

## 🚀 Future Enhancements

* Integration with a larger healthcare dataset
* Model comparison using multiple Machine Learning algorithms
* Database integration
* User authentication
* Cloud deployment
* Advanced health analytics
* Explainable AI
* Personalized health recommendations
* Real-time health monitoring
* Improved model performance
* Enhanced prediction visualization

## 🎓 Learning Outcomes

This project provides practical experience in:

* Machine Learning classification
* Decision Tree algorithm
* Data preprocessing
* Model prediction
* Prediction confidence
* Flask web development
* HTML, CSS, and JavaScript
* Data visualization
* Dashboard development
* Git and GitHub
* Machine Learning and web application integration

## 👩‍💻 Project Information

| Category                 | Details                            |
| ------------------------ | ---------------------------------- |
| **Project Name**         | DiaAI – Diabetes Prediction System |
| **Domain**               | Machine Learning / Healthcare      |
| **Algorithm**            | Decision Tree Classifier           |
| **Framework**            | Flask                              |
| **Programming Language** | Python                             |
| **Frontend**             | HTML, CSS, JavaScript              |
| **Visualization**        | Chart.js                           |

## ⚠️ Medical Disclaimer

**DiaAI is an educational Machine Learning project.**

The predictions generated by this application are **not medical diagnoses** and should not be used for medical decision-making. Users should consult qualified healthcare professionals for medical advice.

