(function(){

  App.View = function(model) {

    // DOM objects

    this.lightbox = document.getElementById('lightbox');
    this.thumbnails = document.getElementById('thumbnails');
    this.overlay = document.getElementById('overlay');
    this.arrows = document.getElementsByClassName('arrow');
    this.render(model).initLightboxEvent().closeLightboxEvent().initSlideShow();

  };

  App.View.prototype.initSlideShow = function() {
    var app = this;
    for(var i = 0 ; i < this.arrows.length; i++) {
      this.arrows.item(i).addEventListener('click',  function() { app.move(this); });
    }
    return this;
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
        app.currNode = event.target.parentNode; // set the currNode to be the hyperlink of image clicked
        event.preventDefault();
        app.loadImageInLightbox(app.createElementWithParams('img', {
          src: app.currNode.href,
          width: app.currNode.width,
          height: app.currNode.height
        })).displayLightbox();
      }
    });
    return this;
  }

  App.View.prototype.move = function(node) {

    if (this.currNode.previousSibling === undefined ) {
      this.toggleDirectionVisibility('left', true);
      return;
    }
    if(this.currNode.nextSibling === undefined) {
      this.toggleDirectionVisibility('right', true);
      return;
    }

    else if (node.className === 'arrow right' && this.currNode.nextSibling !== undefined) {
      this.toggleDirectionVisibility('left', false); // in case it was hidden
      this.currNode = this.currNode.nextSibling;
    }
    else if (node.className === 'arrow left' && this.currNode.previousSibling !== undefined) {
      this.toggleDirectionVisibility('right', false); // in case it was hidden
      this.currNode = this.currNode.previousSibling;
    }

    //detach current image, load next image
    this.loadImageInLightbox(this.createElementWithParams('img', {
      src: this.currNode.href,
      width: this.currNode.width,
      height: this.currNode.height
    })).displayLightbox();

    return this;
  };
  // helper method to toggle the visibility for slideshow directions
  App.View.prototype.toggleDirectionVisibility = function(direction, hide) {
    var arrow = (direction === 'left') ? this.arrows.item(0) : this.arrows.item(1);
    arrow.style.visbility = hide ? 'hidden' : 'visibile';
  }

  App.View.prototype.render = function(images) {
    images.forEach(function(image, index) {
      this.thumbnails.appendChild(this.getThumbnailHyperlink(image));
    }, this);
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
  }

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
