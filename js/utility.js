(function(){

  App.Helpers = {
    getQueryParamByName: function(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&#]" + name + "=([^&#]*)"),
      results = regex.exec(location.href);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    getUriWithParams: function(uri, params) {
      var prefix = '?'; // for first query parameter
      for(var key in params) {
        uri += prefix.concat(key, "=", params[key]);
        prefix = '&'; // subsequent prefixes are ampersands;
      }
      return encodeURI(uri);
    }
  };
})();
