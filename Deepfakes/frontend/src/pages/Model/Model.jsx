import '../Model/model.css';
import UploadWindow from '../../components/ui/upload';
import React, { useState } from "react";

export default function Model() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/jpeg") {
      setSelectedFile(file);
      setError("");
    } else {
      setError("Only JPEG images are supported.");
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/check", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Failed to upload or process the file.");
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto text-white leading-relaxed">
    <h1 className="text-3xl font-bold mb-6 text-center">Deepfake Detection Model Summary</h1>
    
    <section id="what">
    <h2 className="text-2xl font-semibold mb-2">1. Model Architecture: EfficientNetB4 with Head</h2>
    <ul className="list-disc ml-10 space-y-2 text-justify">
    <li>A pretrained model on ImageNet provides strong feature extraction for visual patterns.</li>
    <li>
    Custom Head allowing for binary classification:
    <pre className="bg-gray-800 text-green-300 p-3 rounded mt-2 overflow-x-auto">
    {`nn.Sequential(
  nn.Linear(in_features, 256),
  nn.ReLU(),
  nn.Dropout(0.3),
  nn.Linear(256, 1)
)`}
      </pre>
      </li>
      </ul>
      </section>
      
      <section id="what">
      <h2 className="text-2xl font-semibold mb-2">2. Dataset and Pre-Processing</h2>
      <ul className="list-disc ml-10 space-y-2 text-justify">
      <li>
      Transformations on the train set include resizing, random horizontal flip, rotation,
      color jitter, and resized crop. Normalizes mean and standard deviation to 0.5 each.
      This increases data variability to reflect real-world image variance.
      </li>
      <li>
      Transformations on the test/validation set include only resizing and normalization,
      without any augmentation.
      </li>
      </ul>
      </section>
      
      <section id="what">
      <h2 className="text-2xl font-semibold mb-2">3. Label Smoothing and MixUp Augmentation</h2>
      <ul className="list-disc ml-10 space-y-2 text-justify">
      <li>Label smoothing reduces sharp decision boundaries and prevents overfitting on noisy data.</li>
      <li>MixUp augmentation blends image-label pairs, improving generalization and boundary smoothing.</li>
      </ul>
      </section>
      
      <section id="what">
      <h2 className="text-2xl font-semibold mb-2">4. Training Loop</h2>
      <ul className="list-disc ml-10 space-y-2 text-justify">
      <li>Uses mixed precision training with <code>torch.cuda.amp</code> and <code>GradScaler()</code> for efficient GPU usage.</li>
      <li>Tracks training loss and accuracy in real time for monitoring progress.</li>
      <li>
      Employs early stopping and learning rate scheduling. Saves the best model by tracking
      validation AUC and reduces learning rate when AUC plateaus.
      </li>
      </ul>
      </section>
      
      <section id="what">
      <h2 className="text-2xl font-semibold mb-2">5. Performance</h2>
      <ul className="list-disc ml-10 space-y-2 text-justify">
      <li>Test Accuracy: <strong>0.8937</strong></li>
      <li>AUC Score: <strong>0.9548</strong></li>
      <li>
      <strong>Fake Class:</strong>
      <div>
      <ul className="list-disc ml-8 space-y-1">
      <li>Precision: 0.84</li>
      <li>Recall: 0.97</li>
      </ul>
      </div>
      </li>
      <li>
      <strong>Real Class:</strong>
      <div>
      <ul className="list-disc ml-8 space-y-1">
      <li>Precision: 0.96</li>
      <li>Recall: 0.82</li>
      </ul>
      </div>
      </li>
      <li>
      <strong>Confusion Matrix:</strong>
      <pre className="bg-gray-800 text-green-300 p-3 rounded overflow-x-auto">
      {`[[5315  177]]   ← Fake predicted correctly most of the time
[[ 982 4431]]   ← Real had more misclassifications`}
        </pre>
        </li>
        </ul>
        </section>

        <section id="upload" className="mt-10 bg-gray-900 p-6 rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Try It Yourself: Upload a JPEG</h2>

        <input 
          type="file" 
          accept="image/jpeg" 
          onChange={handleFileChange} 
          className="mb-4 block text-white"
        />
        <button 
          onClick={handleUpload} 
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
        >
          Upload and Check
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {result && (
          <div className="mt-6 bg-gray-800 p-4 rounded text-green-300">
            <p><strong>Label:</strong> {result.label}</p>
            <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
          </div>
        )}
      </section>
        </div>
      );
    }
    