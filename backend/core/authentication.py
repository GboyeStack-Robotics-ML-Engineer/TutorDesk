"""
Server-side JWT revocation (see models.BlacklistedAccessToken's docstring
for why this isn't just `rest_framework_simplejwt.token_blacklist`).

RevocableJWTAuthentication is a drop-in replacement for simplejwt's own
JWTAuthentication: it validates the token exactly the same way (which
already rejects an expired token on its own), then additionally rejects
it if its jti has been logged out via LogoutView.
"""
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken

from .models import BlacklistedAccessToken


class RevocableJWTAuthentication(JWTAuthentication):
    def get_validated_token(self, raw_token):
        validated_token = super().get_validated_token(raw_token)
        jti = validated_token.get('jti')
        if jti and BlacklistedAccessToken.objects.filter(jti=jti).exists():
            raise InvalidToken('This token has been revoked.')
        return validated_token
