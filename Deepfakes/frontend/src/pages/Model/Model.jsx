import pytor from '../../assets/pytorchvisual.jpg';
import '../Model/model.css';
import UploadWindow from '../../components/ui/upload';
import React from "react";

export default function Model() {
  return (
    <section id="what">
    <h2>🕵️ Try out our model!</h2>
    <UploadWindow>
      
    </UploadWindow>

    <h3>How we made the model</h3>
    <p>
    Deepfake technology primarily uses machine learning techniques called autoencoders and generative adversarial networks (GANs). 
    These AI models analyze and learn from large datasets of real images or videos of a person, then can generate new content featuring 
    that person saying or doing things they never actually did.
    </p>
    <h4>How PyTorch works</h4>
    <p>
    PyTorch is a widely used open-source machine learning library developed by Facebook’s AI Research lab.
    It’s popular for its dynamic computation graph, which allows developers to change model architecture during runtime, 
    making it great for experimentation and research. PyTorch provides powerful tensor operations with GPU acceleration 
    and includes an automatic differentiation system called **autograd** to handle gradient calculations.
    It also offers high-level modules like **torch.nn** to simplify building and training deep learning models such as CNNs, RNNs, and transformers.
    PyTorch supports deployment with tools like **TorchScript**, integrates with **TensorBoard** for visualization, and works with **ONNX** for cross-platform compatibility. Its intuitive design, flexibility, and strong community support make it a top choice for both research and production.
    </p>
    <img src={pytor} alt="Visual of Pytorch Model Training" />
    </section>
  );
}

 
export default function DeepfakeModelSummary() {

  return (
<div className="p-6 max-w-4xl mx-auto text-white">
<h1 className="text-3xl font-bold mb-4">Deepfake Detection Model Summary</h1>
 
      <section className="mb-6">
<h2 className="text-2xl font-semibold mb-2">1. Model Architecture: EfficientNetB4 with Head</h2>
<ul className="list-disc list-inside space-y-1">
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
 
      <section className="mb-6">
<h2 className="text-2xl font-semibold mb-2">2. Dataset and Pre-Processing</h2>
<ul className="list-disc list-inside space-y-1">
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
 
      <section className="mb-6">
<h2 className="text-2xl font-semibold mb-2">3. Label Smoothing and MixUp Augmentation</h2>
<ul className="list-disc list-inside space-y-1">
<li>Label smoothing reduces sharp decision boundaries and prevents overfitting on noisy data.</li>
<li>MixUp augmentation blends image-label pairs, improving generalization and boundary smoothing.</li>
</ul>
</section>
 
      <section className="mb-6">
<h2 className="text-2xl font-semibold mb-2">4. Training Loop</h2>
<ul className="list-disc list-inside space-y-1">
<li>Uses mixed precision training with <code>torch.cuda.amp</code> and <code>GradScaler()</code> for efficient GPU usage.</li>
<li>Tracks training loss and accuracy in real time for monitoring progress.</li>
<li>

            Employs early stopping and learning rate scheduling. Saves the best model by tracking

            validation AUC and reduces learning rate when AUC plateaus.
</li>
</ul>
</section>
 
      <section>
<h2 className="text-2xl font-semibold mb-2">5. Performance</h2>
<ul className="list-disc list-inside space-y-1">
<li>Test Accuracy: <strong>0.8937</strong></li>
<li>AUC Score: <strong>0.9548</strong></li>
<li>
<strong>Fake Class:</strong>
<ul className="ml-5 list-disc">
<li>Precision: 0.84</li>
<li>Recall: 0.97</li>
</ul>
</li>
<li>
<strong>Real Class:</strong>
<ul className="ml-5 list-disc">
<li>Precision: 0.96</li>
<li>Recall: 0.82</li>
</ul>
</li>
<li>
<strong>Confusion Matrix:</strong>
<pre className="bg-gray-800 text-green-300 p-3 rounded overflow-x-auto">

{`[[5315  177]   ← Fake predicted correctly most of the time

[ 982 4431]] ← Real had more misclassifications`}
</pre>
</li>
</ul>
</section>
</div>

  );

}

 