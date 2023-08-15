## How to run

cd .\myportfolio\
python -m venv venv
.\venv\Scripts\activate
pip install -r .\requirements.txt
python.exe .\manage.py makemigrations
python.exe .\manage.py migrate
python.exe .\manage.py runserver


## Some functions may be unavailable without environment variables