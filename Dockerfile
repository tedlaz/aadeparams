FROM python:3.9-slim

WORKDIR /app

# Install curl for healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Install requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY /aadeparams .


# Expose the port the app runs on
EXPOSE 80

# Command to run the application
CMD ["uvicorn", "aadeparams.main:app", "--host", "0.0.0.0", "--port", "80"]
