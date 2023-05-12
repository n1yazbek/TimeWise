from django.db import models

# Create your models here.

class Note(models.Model):
   body = models.TextField(null=True, blank=True)   # null=True, blank=True allows for empty fields
   updated = models.DateTimeField(auto_now=True)  # auto_now=True updates the date and time every when the model is updated
   created = models.DateTimeField(auto_now_add=True)  # auto_now_add=True updates the date and time only when the model is created 
   
   def __str__(self):
       return self.body[:50]  # returns the first 50 characters of the body field
   
