from django import forms


class ContactForm(forms.Form):
    name = forms.CharField(max_length=50, strip=True)
    email=forms.EmailField()
    message=forms.CharField(max_length=200,strip=True,min_length=10)