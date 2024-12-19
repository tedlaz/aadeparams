# AADEdata API

A FastAPI service that provides access to AADE (Greek Tax Authority) MyData parameters and metadata.

## Description

This API service provides easy access to various parameter lists and codes used in the AADE MyData system, including:

- Country codes
- Currency codes
- Invoice types
- Tax categories
- Payment methods
- VAT rates
- And more...

## Requirements

- Python 3.13+
- FastAPI
- uvicorn

## Installation

```bash
# Clone the repository
git clone https://github.com/tedlaz/aadeparams.git

# Install dependencies
uv sync

# Start the server
uv run uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## Docker

To build and run the Docker container:

```bash
docker build -t aadeparams .
docker run -p 80:80 aadeparams
```
