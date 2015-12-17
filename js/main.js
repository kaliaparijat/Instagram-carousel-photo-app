(function() {

  var clientId = '175205e598af43028e817042fd8e3320',
  redirectUri = 'http://choreographer-violet-73727.bitballoon.com',
  authUri = 'https://api.instagram.com/oauth/authorize/',
  responseType = 'token',
  endPoint = 'https://api.instagram.com/v1/users/self/media/recent/',// API Endpoint for loading images
  Utils  = App.Helpers,
  accessToken = Utils.getQueryParamByName('access_token'),
  accessDenied = Utils.getQueryParamByName('error_reason');
  if (accessDenied === 'user_denied') {
    return; // authorization denied for user, app needs user authorization
  }
  if (accessToken === '') {
      window.location = Utils.getUriWithParams(authUri, {client_id: clientId, redirect_uri: redirectUri, response_type: responseType});
  }

  App.init(accessToken, endPoint);

})();
