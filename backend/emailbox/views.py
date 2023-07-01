from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
import secrets

# from client.custom_auth import TokenAuthentication
from passage_auth.authentication import TokenAuthentication
from .api_auth import APIAuthentication

from project.models import ProjectModel

from server.email import send_email
from .models import EmailModel, EmailBoxModel



class EmailBoxView(APIView):
    authentication_classes = [TokenAuthentication]

    # Create New EmailBox
    def post(self, request):
        user = request.user
        count = EmailBoxModel.objects.filter(project__user=user).count()
        print(count)
        if count == 3:
            return Response({"message": "Project creation limit reached."}, status=status.HTTP_406_NOT_ACCEPTABLE)
        project_name = request.data.get("project_name")
        product = "EMAILBOX"
        key = secrets.token_hex(32)
        print(project_name, product, user, key)
        project_id = ProjectModel.objects.create(name=project_name, user=user, product=product, key=key)
        EmailBoxModel.objects.create(project=project_id)
        return Response({"message": "Project created","project_id":project_id.id}, status=status.HTTP_201_CREATED)

    def get(self, request):
        project_id = request.GET["project_id"]
        try:
            emailbox = EmailBoxModel.objects.get(project__id=project_id)
        except:
            return Response("EmailBox not found", status=status.HTTP_404_NOT_FOUND)
        emails = EmailModel.objects.filter(emailbox=emailbox)
        print(emails)
        response = []
        for email in emails:
            print(email.time_added)
            date = str(email.time_added)[:10]
            time = str(email.time_added)[11:16]
            res = {
                "id": email.id,
                "email_address": email.email_address,
                "date": date,
                "time": time,
                "total_request": email.total_request
            }
            response.append(res)
        return Response(response, status=status.HTTP_200_OK)


    # Read EmailBox details with its id
    # def get(self, request):
    #     project_id = request.GET["project_id"]
    #     try:
    #         emailbox = EmailBoxModel.objects.get(project__id=project_id)
    #     except:
    #         return Response("EmailBox not found", status=status.HTTP_404_NOT_FOUND)
    #     project_name = emailbox.project.name
    #     key = emailbox.project.key
    #     created_at = emailbox.project.created_at
    #     updated_at = emailbox.project.updated_at
    #     res = {
    #         "project_id": project_id,
    #         "emaibox_project_name": project_name,
    #         "emailbox_key": key,
    #         "emailbox_created_at": created_at,
    #         "emailbox_updated_at": updated_at
    #     }
    #     return Response(res, status=status.HTTP_200_OK)

    # def patch(self, request):
    #     project_id = request.data.get("project_id")
    #     print(project_id)
    #     project = ProjectModel.objects.get(id=project_id)
    #     print(request.data)
    #     if "projectName" in request.data:
    #         new_name = request.data.get("project_name")
    #         project.name = new_name
    #         project.save()
    #         print(project.name)
    #         return Response({"message": "Name Updated", "emailbox_project_name": new_name}, status=status.HTTP_202_ACCEPTED)
    #     else:
    #         key = secrets.token_hex(32)
    #         project.key = key
    #         project.save()
    #         return Response({"message": "API Updated", "emailbox_key": key}, status=status.HTTP_202_ACCEPTED)

class EmailboxListView(APIView):
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        user = request.user
        emailbox = EmailBoxModel.objects.filter(project__user=user).order_by("id")
        response = []
        for eb in emailbox:
            res = {
                "name": eb.project.name,
                "project_id": eb.project.id
            }
            response.append(res)
        return Response(response, status=status.HTTP_200_OK)

class EmailView(APIView):
    authentication_classes = [APIAuthentication]

    def post(self, request):
        email = request.data.get("email")
        project_id = request.auth
        emailbox = EmailBoxModel.objects.get(project__id=project_id)
        email_obj = EmailModel.objects.create(emailbox=emailbox, email_address=email)

        return Response({"message":"Email Added In EmailBox"}, status=status.HTTP_201_CREATED)

class AllEmailView(APIView):
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        user = request.user
        emailboxes = EmailBoxModel.objects.filter(project__user=user)
        emails = EmailModel.objects.filter(emailbox__in=emailboxes).select_related('emailbox__project')

        response = emails.values(
            'id',
            'email_address',
            'time_added__date',
            'time_added__time',
            'total_request',
            'emailbox__project__name'
        )

        response = [
            {
                'id': email['id'],
                'email_address': email['email_address'],
                'date': str(email['time_added__date']),
                'time': str(email['time_added__time']),
                'total_request': email['total_request'],
                'project_name': email['emailbox__project__name']
            }
            for email in response
        ]
        return Response(response, status=status.HTTP_200_OK)

class InstantView(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        email_id = request.data.get("emailId")
        print(email_id)
        try:
            email = EmailModel.objects.get(id=email_id)
        except:
            return Response("Email Not Found", status=status.HTTP_404_NOT_FOUND)
        subject = request.data.get("subject")
        body = request.data.get("body")
        send_email(email, subject, body)
        return Response("ok", status=status.HTTP_201_CREATED)


