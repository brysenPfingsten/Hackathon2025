from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/images", StaticFiles(directory="Dataset"), name="images")

DB_PATH = "images.db"

@app.get("/api/images/random-batch")
def get_random_images(count: int = 50, split: str = None, label: str = None):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    query = "SELECT path FROM images"
    filters = []
    params = []

    if split:
        filters.append("split = ?")
        params.append(split)
    if label:
        filters.append("label = ?")
        params.append(label)

    if filters:
        query += " WHERE " + " AND ".join(filters)

    query += " ORDER BY RANDOM() LIMIT ?"
    params.append(count)

    c.execute(query, params)
    results = c.fetchall()
    conn.close()

    return [{"url": f"/images/{row[0]}"} for row in results]


@app.get("/api/image/random")
def get_random_image(split: str = None, label: str = None):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    query = "SELECT path FROM images"
    filters = []
    params = []

    if split:
        filters.append("split = ?")
        params.append(split)
    if label:
        filters.append("label = ?")
        params.append(label)

    if filters:
        query += " WHERE " + " AND ".join(filters)

    query += " ORDER BY RANDOM() LIMIT 1"
    c.execute(query, params)
    row = c.fetchone()
    conn.close()

    if row:
        return {"url": f"/images/{row[0]}"}
    return {"error": "No image found"}
