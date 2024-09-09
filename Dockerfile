FROM python:3.12.1
WORKDIR /app
COPY . /app/
RUN pip install -r requirments.txt
EXPOSE 5000        
CMD ["sh", "-c", "python create_db.py && python api.py"]
