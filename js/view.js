(function(){

  App.View = function(images) {
    this.lightboxImages =  {};     // cache for standard resolution images
    // Global DOM objects
    this.lightbox = document.getElementById('lightbox');
    this.thumbnails = document.getElementById('thumbnails');
    this.overlay = document.getElementById('overlay');
    this.arrows = document.getElementsByClassName('arrow');
    this.render(images).initLightboxEvent().closeLightboxEvent().initSlideShowEvents().initGlobalKeydownEvents();
  };

  App.View.prototype.render = function(images) {
    images.forEach(function(image, index) {
      this.thumbnails.appendChild(this.getThumbnailHyperlink(image));
    }, this);
    return this;
  };

  App.View.prototype.initSlideShowEvents = function() {
    var app = this;
    for(var i = 0 ; i < this.arrows.length; i++) {
      this.arrows.item(i).addEventListener('click',  function() {
        app.move(this);
      });
    }
    return this;
  };

  App.View.prototype.initGlobalKeydownEvents = function() {
    var ESC = 27, LEFT = 37, RIGHT = 39, app = this, keyCode, arrow;
    window.addEventListener('keydown', function(event) {
      keyCode = event.keyCode;
      if (app.isLightBoxOpen()) {
          switch(keyCode) {
            case ESC:
              app.removeImageFromLightbox().hideLightbox();
              break;
            case LEFT:
              app.move(app.arrows.item(0));
              break;
            case RIGHT:
              app.move(app.arrows.item(1));
              break;
            }
          }
    });
  };

  App.View.prototype.isLightBoxOpen = function() {
    return this.lightbox.style.display !== 'none' && this.overlay.style.display !== 'none';
  };

  App.View.prototype.closeLightboxEvent = function() {
    var app = this;
    this.overlay.addEventListener('click', function() {
      app.removeImageFromLightbox().hideLightbox();
    });
    return this;
  };

  App.View.prototype.initLightboxEvent = function() {
    var app = this, imageToLoad;
    this.thumbnails.addEventListener('click', function(event) {
      if (event.target && event.target.nodeName === 'IMG') {
        // set the currNode to be the hyperlink of image clicked, this is globally available so we can do a slideshow
        app.currNode = event.target.parentNode;
        event.preventDefault();
        imageToLoad = app.getImageFromHyperlink(app.currNode);
        app.loadImageInLightbox(imageToLoad).displayLightbox().toggleArrowNodeVisibility();
      }
    });
    return this;
  };

  App.View.getCachedImageElement = function(href) {

      return null;
  };

  App.View.prototype.move = function(arrow) {
    var siblingNode, hide, imageToLoad;
    // get the next anchor tag or previous anchor tag in the DOM depending on what direction you are going
    if (arrow.className === 'arrow right') {
        siblingNode = this.currNode.nextSibling;
    } else if (arrow.className === 'arrow left') {
        siblingNode = this.currNode.previousSibling;
    }
    // set the sibling node as the new curr node
    this.currNode = siblingNode;
    imageToLoad = this.getImageFromHyperlink(this.currNode);
    this.removeImageFromLightbox().loadImageInLightbox(imageToLoad).toggleArrowNodeVisibility()
    return this;
  };

  // takes a hyperlink DOM object, checks if an image element is already cached, if not, builds a new image, caches it and returns it
  App.View.prototype.getImageFromHyperlink = function(link) {
    if (this.lightboxImages.hasOwnProperty(link.href)) { // check if the cache already contains an image element
      return this.lightboxImages[link.href];
    }
    var imageToLoad = this.createElementWithParams('img', {
      src: link.href,
      width: link.width,
      height: link.height
    });
    this.lightboxImages[link.href] = imageToLoad; // cache this image for future
    return imageToLoad ;
  }

  // helper method to toggle the visibility for slideshow directions
  App.View.prototype.toggleArrowNodeVisibility = function() {
    this.arrows.item(0).style.visibility = (this.currNode.previousElementSibling !== null) ? 'visible' : 'hidden';
    this.arrows.item(1).style.visibility = (this.currNode.nextElementSibling !== null) ? 'visible' : 'hidden';
    return this;
  };

  App.View.prototype.getThumbnailHyperlink = function(image) {
    var std = image.standard_resolution, tiny = image.thumbnail ;
    // setting height and width on an 'a' tag coz I use em later for the lightbox
    var a = this.createElementWithParams('a', {href: std.url, width: std.height, height: std.height});
    var thumbnailImg = this.createElementWithParams('img', {src: tiny.url, width: tiny.width, height: tiny.height});
    a.appendChild(thumbnailImg);
    return a;
  };

  App.View.prototype.loadImageInLightbox = function(image) {
      this.removeImageFromLightbox().lightbox.appendChild(image);
      return this;
  };

  App.View.prototype.removeImageFromLightbox = function() {
    var imgTags = this.lightbox.getElementsByTagName('img');
    for(var i  =  0; i < imgTags.length; i++ ) {
      this.lightbox.removeChild(imgTags.item(i));
    }
    return this;
  };

  App.View.prototype.displayLightbox = function() {
    this.lightbox.style.display = 'block';
    this.overlay.style.display='block';
    return this;
  };

  App.View.prototype.hideLightbox = function() {
    this.lightbox.style.display = 'none';
    this.overlay.style.display = 'none';
    return this;
  };

  /* Generic HTML element helper method
   @param: type: can be anything, but you probably want to provide a valid html tag
   @param: params: key value pairs that set up attributes for the HTML tag
   returns: an HTML tag with given attributes
  */
  App.View.prototype.createElementWithParams = function(type, params) {
    var el = document.createElement(type);
    for(var key in params) {
      el[key] =  params[key];
    }
    return el;
  };

})();
