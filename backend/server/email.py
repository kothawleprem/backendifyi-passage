from django.core.mail import EmailMessage
from emailbox.models import InstantReplyModel

def send_email(email, subject, body):
    subject = subject
    body = body
    to_email = [email.email_address]

    email_obj = EmailMessage(subject=subject, body=body, to=to_email)
    print('email sent')
    email_obj.send()
    InstantReplyModel.objects.create(email=email, subject=subject, body=body)