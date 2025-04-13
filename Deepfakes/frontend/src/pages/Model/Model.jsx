import pytor from '../../assets/pytorchvisual.jpg';
import '../Model/model.css';
import {UploadWindow} from '../../components/ui/upload';

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