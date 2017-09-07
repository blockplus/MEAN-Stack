#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import print_function
from getpass import getpass
try:
    # These are for python3 support
    from urllib.request import urlopen, Request
    from urllib.error import HTTPError
    from urllib.parse import urlencode
    unistr = str
except ImportError:
    # Fallback to python2
    from urllib2 import urlopen, Request
    from urllib2 import HTTPError
    from urllib import urlencode
    unistr = unicode

class ClientLogin(object):
    """
    A Google ClientLogin session management class.

    It does not support a captcha verification, but it does work correctly with
    two-step authentication when it is provided with an application password
    rather than the Google account password.
    """

    # This is the URL used for ClientLogin authentication
    AUTH_URL = 'https://www.google.com/accounts/ClientLogin'

    def __init__(self, user, passwd, service, acct_type='GOOGLE', source=None):
        """
        Create a new instance of the management class with the provided
        credentials.

        :param user:
        User's full email address.

        :param passwd:
        User's password. If the user is using two-factor authentication, this
        should be a password created specifically for this application.

        :param service:
        Name of the Google service you're requesting authorization for.

        :param acct_type:
        Type of account to request authorization for.
        Possible values are GOOGLE (default), HOSTED, or HOSTED_OR_GOOGLE.

        :param source: (optional)
        Short string identifying your application, for logging purposes.
        """

        self.user = user
        self.passwd = passwd
        self.service = service
        self.acct_type = acct_type
        self.source = source

        self.auth_token = None
        self.sid_token  = None
        self.lsid_token = None

    def _process_response(self, resp):
        ret = {}
        for line in resp.split('\n'):
            if '=' in line:
                var, val = line.split('=', 1)
                ret[var] = val
        return ret

    def _make_request(self, url, data, headers):
        if not data:
            data = None
        else:
            data = urlencode(data)
            data = data.encode('utf8')

        req = Request(url, data, headers)
        err = None

        try:
            resp_obj = urlopen(req)
        except HTTPError as e:
            err = e.code
            return err, e.read()
        resp = resp_obj.read()
        resp_obj.close()
        return None, unistr(resp, encoding='utf8')

    def _request_tokens(self):
        data = {
            'Email':        self.user,
            'Passwd':       self.passwd,
            'accountType':  self.acct_type,
            'service':      self.service
        }
        if self.source:
            data['source'] = self.source

        headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
        err, resp = self._make_request(self.AUTH_URL, data, headers)
        if err is not None:
            #raise Exception("HTTP Error %d" % err)
            return

        ret = self._process_response(resp)
        if 'Error' in ret:
            #raise Exception(ret['Error'])
            return

        if 'Auth' in ret:
            self.auth_token = ret['Auth']
        if 'SID' in ret:
            self.sid_token = ret['SID']
        if 'LSID' in ret:
            self.lsid_token = ret['LSID']

    def get_auth_token(self, request=False):
        """
        Returns an authentication token, creating one if needed.
        The first time this method is called, it will make a request for an
        authentication token. Subsequent calls to this method will return that
        same token, unless the request parameter is true.

        :param request: Force the request of a new authentication token.
        """

        if self.auth_token is None or request is True:
            self._request_tokens()
        return self.auth_token

    def get_sid_token(self, request=False):
        """
        Returns an SID cookie token, creating one if needed.
        The first time this method is called, it will make a request for an
        authentication token. Subsequent calls to this method will return that
        same token, unless the request parameter is true.

        :param request: Force the request of a new SID token.
        """

        if self.sid_token is None or request is True:
            self._request_tokens()
        return self.sid_token

    def get_lsid_token(self, request=False):
        """
        Returns an LSID cookie token, creating one if needed.
        The first time this method is called, it will make a request for an
        authentication token. Subsequent calls to this method will return that
        same token, unless the request parameter is true.

        :param request: Force the request of a new LSID token.
        """

        if self.lsid_token is None or request is True:
            self._request_tokens()
        return self.lsid_token

    def is_authenticated(self):
        """
        Returns whether this client login instance is authenticated.
        Returns True if there are valid tokens, False otherwise.
        """
        return  (
                        self.auth_token is not None
                    and self.sid_token  is not None
                    and self.lsid_token is not None
                )
