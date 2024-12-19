from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from .read_aade_data import create_aade_data

data = create_aade_data()

description = """
AADEdata API gives you access to AADE MyData parameters. 🚀

You will be able to:

* **Get a list** with metadata values.
* **Get specific data** by name or all at once using **all**.
"""
app = FastAPI(title="AADEdata", description=description, version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Get metadata values."""
    return {
        "title": "metadata",
        "vals": [{"name": i, "titlep": data[i]["titlep"]} for i in list(data.keys())],
    }


@app.get("/{param}")
async def get_data(param: str):
    """Get specific data by name or all at once by setting **all** in param."""
    if param == "all":
        return data
    result = data.get(param)
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Parameter '{param}' not found",
        )
    return result


@app.get("/health/ping")
async def health():
    return {"status": "ok"}
