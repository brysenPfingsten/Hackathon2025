FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["bash", "-c", "python build_image_db.py && python build_video_db.py && uvicorn main:app --host 0.0.0.0 --port 8000"]
