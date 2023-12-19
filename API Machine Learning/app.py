from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import pandas as pd
import numpy as np
import joblib

app = Flask(__name__)

# Fungsi untuk melakukan encoding pada data input
def encode_user_input(user_input_data):
    user_input_df = pd.DataFrame([user_input_data])

    # Lakukan encoding menggunakan label encoder yang sudah ada
    user_input_df['gejala1'] = label_encoder_gejala1.transform(user_input_df['gejala1'])
    user_input_df['gejala2'] = label_encoder_gejala2.transform(user_input_df['gejala2'])
    user_input_df['gejala3'] = label_encoder_gejala3.transform(user_input_df['gejala3'])
    user_input_df['pernah_servis'] = label_encoder_pernah_servis.transform(user_input_df['pernah_servis'])
    user_input_df['merk_motor'] = label_encoder_merk_motor.transform(user_input_df['merk_motor'])
    user_input_df['jenis_motor'] = label_encoder_jenis_motor.transform(user_input_df['jenis_motor'])

    # Lakukan encoding kategori
    X_categorical_encoded = encoder.transform(user_input_df[['gejala1', 'gejala2', 'gejala3', 'pernah_servis', 'merk_motor', 'jenis_motor']])

    numerical_features = ['tahun', 'km_motor']
    X_numerical_scaled = scaler.transform(user_input_df[numerical_features])

    # Gabungkan fitur-fitur numerik dan yang sudah di-encode kategorikal
    user_input_combined = np.concatenate([X_numerical_scaled, X_categorical_encoded], axis=1)
    return user_input_combined

# Memuat model yang sudah dilatih sebelumnya
loaded_model = load_model('bengkel_model.h5')
label_encoder_tahun = joblib.load('label_encoder_tahun.joblib')
label_encoder_km_motor = joblib.load('label_encoder_km_motor.joblib')
label_encoder_gejala1 = joblib.load('label_encoder_gejala1.joblib')
label_encoder_gejala2 = joblib.load('label_encoder_gejala2.joblib')
label_encoder_gejala3 = joblib.load('label_encoder_gejala3.joblib')
label_encoder_pernah_servis = joblib.load('label_encoder_pernah_servis.joblib')
label_encoder_merk_motor = joblib.load('label_encoder_merk_motor.joblib')
label_encoder_jenis_motor = joblib.load('label_encoder_jenis_motor.joblib')
encoder = joblib.load('encoder.joblib')
scaler = joblib.load('scaler.joblib')
nameClass = ""
solusi = ""

@app.route("/predict", methods=["POST"])
def predict():
    user_input_data = request.json  # Mendapatkan data JSON dari request

    # Memproses data input menggunakan fungsi encode_user_input
    user_input_combined = encode_user_input(user_input_data)

    # Melakukan prediksi menggunakan model yang sudah dimuat sebelumnya
    predictions = loaded_model.predict(user_input_combined)
    predicted_class = np.argmax(predictions)
    confidence = predictions[0][predicted_class]
    #predicted_class_label = label_encoder_y.inverse_transform([predicted_class])
    predicted_class = int(predicted_class)
    # Menyusun hasil prediksi untuk dikembalikan dalam format JSON
   
    if (predicted_class == 0) :
        nameClass = "Masalah Elektrikal"
        solusi = "Periksa sistem kelistrikan dan ganti busi"
    
    elif predicted_class == 1 :
        nameClass = "Masalah Knalpot"
        solusi = "Periksa dan bersihkan knalpot atau ganti jika diperlukan"
    
    elif predicted_class == 2 :
        nameClass = "Masalah Transmisi"
    
    elif predicted_class == 3 :
        nameClass = "Masalah Mesin"
        solusi = "Periksa oli, starter, komponen pendingin, sistem pembakaran (busi), filter udara"
    
    elif predicted_class == 4 :
        nameClass = "Masalah Pendingin"
        solusi = "Bersihkan radiator dan ganti cairan pendingin"
    
    elif predicted_class == 5 :
        nameClass = "Masalah Rem"
        solusi = "Periksa bantalan rem, piringan rem, lumasi komponen rem, periksa kampas rem"
    
    elif predicted_class == 6 :
        nameClass = "Masalah Sistem Bahan Bakar"
        solusi = "Bersihkan injektor bahan bakar dan periksa tekanan bahan bakar"
    
    elif predicted_class == 7 :
        nameClass = "Masalah Starter"
        solusi = "ganti starter dan periksa sistem starter"
    
    elif predicted_class == 8 :
        nameClass = "Masalah Transmisi"
        solusi = "periksa dan ganti oli transmisi atau lakukan penyetelan kopling"
    
    elif predicted_class == 9 :
        nameClass = "Tidak Ada Permasalahan"
        solusi = "Tidak ada yang perlu diperbaiki"
    
    confidence_percentage = confidence * 100
    formatted_percentage = f"{confidence_percentage:.2f}%"
    
    
    response = {
        "Predicted Class": nameClass,
        "Solusi" : solusi,
        "Confidence": formatted_percentage
    }
    
    return jsonify(response)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
