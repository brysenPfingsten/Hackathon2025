# %%
import torch
from torchvision import transforms
from PIL import Image
import torch.nn as nn
from efficientnet_pytorch import EfficientNet

# %%
# Device setup
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# %%
model = EfficientNet.from_pretrained("efficientnet-b4")
model._fc = nn.Sequential(
    nn.Linear(model._fc.in_features, 256),
    nn.ReLU(),
    nn.Dropout(0.3),
    nn.Linear(256, 1) 
)
model.load_state_dict(torch.load("BestDFModel.pth", map_location=device))
model.to(device)
model.eval()

# %%
transform = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.ToTensor(),
    transforms.Normalize([0.5]*3, [0.5]*3)
])

# %%
def predict_image(image_path):
    image = Image.open(image_path).convert("RGB")
    image = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(image)
        prob = torch.sigmoid(output).item()

    label = "Real" if prob > 0.5 else "Fake"
    confidence = round(prob if label == "Real" else 1 - prob, 4)
    return label, confidence

# Example usage
# img_path = "download2.jpg"
# label, confidence = predict_image(img_path)
# print(f"Prediction: {label} (Confidence: {confidence})")


