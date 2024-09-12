# using an official python version
FROM python:3.12.3-slim

# setting working directory to /backend
WORKDIR /backend

# copying the contents of backend directory
COPY . /backend 


# installing any required packages at requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# exposing port 5000 to allow external access
EXPOSE 5000

# defining environmental variables
ENV FLASK_APP=server.py
ENV FLASK_RUN_HOST=0.0.0.0

# running the flask app 
CMD ["flask", "run"]