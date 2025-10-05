# AI Brain Prototype
# Simple anomaly detection for telemetry data

import numpy as np
import tensorflow as tf
from sklearn.preprocessing import StandardScaler

class SovereignAIBrain:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.is_trained = False

    def train_anomaly_detector(self, normal_data):
        """Train a simple autoencoder for anomaly detection"""
        # Normalize data
        self.scaler.fit(normal_data)
        normalized_data = self.scaler.transform(normal_data)

        # Simple autoencoder model
        input_dim = normalized_data.shape[1]
        encoding_dim = min(32, input_dim // 2)

        input_layer = tf.keras.Input(shape=(input_dim,))
        encoded = tf.keras.layers.Dense(encoding_dim, activation='relu')(input_layer)
        decoded = tf.keras.layers.Dense(input_dim, activation='linear')(encoded)

        self.model = tf.keras.Model(input_layer, decoded)
        self.model.compile(optimizer='adam', loss='mse')

        # Train
        self.model.fit(normalized_data, normalized_data,
                      epochs=50, batch_size=32, verbose=0)
        self.is_trained = True
        print("AI Brain trained for anomaly detection")

    def detect_anomaly(self, telemetry_data):
        """Detect anomalies in telemetry data"""
        if not self.is_trained:
            return {"status": "not_trained", "anomaly": False}

        normalized_data = self.scaler.transform(telemetry_data)
        reconstructed = self.model.predict(normalized_data, verbose=0)

        # Calculate reconstruction error
        mse = np.mean(np.power(normalized_data - reconstructed, 2), axis=1)
        threshold = np.percentile(mse, 95)  # 95th percentile as threshold

        anomalies = mse > threshold

        return {
            "status": "operational",
            "anomaly": bool(anomalies[0]),
            "confidence": float(1 - mse[0] / threshold) if mse[0] < threshold else 0.0,
            "telemetry_processed": len(telemetry_data)
        }

    def get_mission_procedures(self, query):
        """Simple procedure retrieval (mock)"""
        procedures = {
            "eva": "Extravehicular Activity Procedure: 1. Suit check, 2. Airlock depressurization, 3. EVA tasks, 4. Return and repressurization",
            "repair": "Repair Procedure: 1. Assess damage, 2. Gather tools, 3. Execute repair, 4. Test functionality",
            "emergency": "Emergency Procedure: 1. Assess situation, 2. Alert mission control, 3. Execute contingency plan"
        }

        for key, procedure in procedures.items():
            if key in query.lower():
                return procedure

        return "Procedure not found. Please specify: EVA, repair, or emergency."

    def analyze_biometric_state(self, biometric_data):
        """Analyze astronaut's physiological state"""
        # Mock analysis
        heart_rate = biometric_data.get('heart_rate', 70)
        respiration = biometric_data.get('respiration', 16)
        stress_level = biometric_data.get('stress_level', 0.5)

        state = "normal"
        recommendations = []

        if heart_rate > 100:
            state = "elevated_heart_rate"
            recommendations.append("Reduce physical exertion")
        if respiration > 20:
            state = "rapid_breathing"
            recommendations.append("Practice deep breathing")
        if stress_level > 0.7:
            state = "high_stress"
            recommendations.append("Take a break and hydrate")

        return {
            "physiological_state": state,
            "recommendations": recommendations,
            "alert_level": "high" if state != "normal" else "normal"
        }

# Example usage
if __name__ == "__main__":
    brain = SovereignAIBrain()

    # Generate mock normal telemetry data
    np.random.seed(42)
    normal_data = np.random.normal(0, 1, (1000, 5))  # 1000 samples, 5 features

    # Train
    brain.train_anomaly_detector(normal_data)

    # Test with normal data
    test_normal = np.random.normal(0, 1, (1, 5))
    result_normal = brain.detect_anomaly(test_normal)
    print("Normal data result:", result_normal)

    # Test with anomalous data
    test_anomaly = np.random.normal(5, 2, (1, 5))  # Anomalous
    result_anomaly = brain.detect_anomaly(test_anomaly)
    print("Anomalous data result:", result_anomaly)

    # Test procedure retrieval
    procedure = brain.get_mission_procedures("repair")
    print("Procedure:", procedure)

    # Test biometric analysis
    biometric = {"heart_rate": 110, "respiration": 22, "stress_level": 0.8}
    analysis = brain.analyze_biometric_state(biometric)
    print("Biometric analysis:", analysis)
