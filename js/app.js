(function() {
  window.App = {

    images: [],

    init: function(accessToken, endpoint) {
      this.accessToken = accessToken;
      this.imageServerUri = endpoint;
      this.getImages();
      return this;
    },

    /* Execute a JSONP call to the Instagram endpoint*/
    getImages: function() {
      var url = this.Helpers.getUriWithParams(this.imageServerUri, {access_token: this.accessToken});
      var script = document.createElement('script');
      script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=App.loadImages'; // This is the best way I know
      document.body.appendChild(script);
    },

    loadImages: function(json) {
      json.data.forEach(function(datum){
        if (datum.hasOwnProperty('images')) {
          this.images.push(datum.images);
        }
      }, this);
      this.photosView = new this.View(this.images);
    }

  };
})();
