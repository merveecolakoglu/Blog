from rest_framework.permissions import BasePermission


class IsManagerUser(BasePermission):

    def has_permission(self, request, view):
        return bool(request.user)