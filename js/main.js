(function() {

  var clientId = 'afe33a52737641a5b122aeca5562b001',
  redirectUri = 'http://localhost/slack',
  authUri = 'https://api.instagram.com/oauth/authorize/',
  responseType = 'token',
  endPoint = 'https://api.instagram.com/v1/users/self/media/recent/' // API Endpoint for loading images
  Utils  = App.Helpers,
  accessToken = Utils.getQueryParamByName('access_token');

  if (accessToken === '') {
      window.location = Utils.getUriWithParams(authUri, {client_id: clientId, redirect_uri: redirectUri, response_type: responseType});
  }

  App.init(accessToken, endPoint);

})();
