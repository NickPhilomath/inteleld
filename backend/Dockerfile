FROM python:3.12

ENV PYTHONUNBUFFERED=1
WORKDIR /app

# Required to install mysqlclient with Pip
RUN apt-get update \
  && apt-get install python3-dev default-libmysqlclient-dev gcc -y

# Install pipenv
RUN pip install --upgrade pip 
RUN pip install poetry

# Install application dependencies
COPY pyproject.toml poetry.lock /app/
# We use the --system flag so packages are installed into the system python
# and not into a virtualenv. Docker containers don't need virtual environments. 
RUN poetry install --no-root

# Copy the application files into the image
COPY . /app/

# Expose port 8000 on the container
EXPOSE 8000