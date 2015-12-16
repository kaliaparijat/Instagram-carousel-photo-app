(function(){

  App.View = function(images) {
    // DOM objects
    this.lightbox = document.getElementById('lightbox');
    this.thumbnails = document.getElementById('thumbnails');
    this.overlay = document.getElementById('overlay');
    this.arrows = document.getElementsByClassName('arrow');
    this.render(images).initLightboxEvent().closeLightboxEvent().initSlideShow();
  };

  App.View.prototype.render = function(images) {
    images.forEach(function(image, index) {
      this.thumbnails.appendChild(this.getThumbnailHyperlink(image));
    }, this);
    return this;
  };

  App.View.prototype.initSlideShow = function() {
    var app = this;
    for(var i = 0 ; i < this.arrows.length; i++) {
      this.arrows.item(i).addEventListener('click',  function() { app.move(this); });
    }
    return this;
  };

  App.View.prototype.keydownEvents = function()) {
    var ESC = 27, LEFT = 37, RIGHT = 39, app = this;
    window.addEventListener('keydown', function(event) {
      var keyCode = event.keyCode;
      if (keyCode === ESC) {
        app.removeImageFromLightbox().hideLightbox();
        return;
      }
      if (keyCode === 37 && app.isLightBoxOpen()) {
        app.moveLeft();
        return;
      }
      if (keyCode === 29 && app.isLightBoxOpen()) {
        app.moveRight();
        return;
      }
    })
  };

  App.View.prototype.isLightBoxOpen = function() {
    return this.lightbox.style.display === 'none' && this.overlay.style.display === 'none';
  };

  App.View.prototype.closeLightboxEvent = function() {
    var app = this;
    this.overlay.addEventListener('click', function() {
      app.removeImageFromLightbox().hideLightbox();
    });
    return this;
  };

  App.View.prototype.initLightboxEvent = function() {
    var app = this;
    this.thumbnails.addEventListener('click', function(event) {
      if (event.target && event.target.nodeName === 'IMG') {
        // set the currNode to be the hyperlink of image clicked, this is globally available so we can do a slideshow
        app.currNode = event.target.parentNode;
        event.preventDefault();
        app.loadImageInLightbox(app.createElementWithParams('img', {
          src: app.currNode.href,
          width: app.currNode.width,
          height: app.currNode.height
        })).displayLightbox();
      }
    });
    return this;
  };

  App.View.getCachedImageElement = function() {
    return undefined;
  };

  App.View.prototype.move = function(arrow) {
    var siblingNode, hide;
    // get the next anchor tag or previous anchor tag in the DOM depending on what direction you are going
    if (arrow.className === 'arrow right') {
        siblingNode = this.currNode.nextSibling;
    } else if (arrow.className === 'arrow left') {
        siblingNode = this.currNode.previousSibling;
    }
    // set the sibling node as the new curr node
    this.currNode = siblingNode;
    // check cache or add to cache
    var imageToLoad = this.getCachedImageElement() || this.createElementWithParams('img', {
      src: this.currNode.href,
      width: this.currNode.width,
      height: this.currNode.height
    });
    //detach current image, load next image
    this.removeImageFromLightbox().loadImageInLightbox(imageToLoad);
    hide = (typeof this.currNode.siblingNode === 'undefined') ?: true : false;  // figure out if the arrow will need to be displayed
    this.toggleArrowNodeVisibility(arrow, hide);
    return this;
  };

  // helper method to toggle the visibility for slideshow directions
  App.View.prototype.toggleArrowNodeVisibility = function(node, hide) {
    arrow.style.visbility = hide ? 'hidden' : 'visibile';
    return this;
  }

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
