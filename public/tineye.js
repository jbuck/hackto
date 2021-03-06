(function() {
  var TinEye = window.TinEye = function( img, cb ) {
    var image = img.data,
        canvasData = img,
        callback = cb,
        _this = this;

    var XHR = {
      "get": function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = callback;
        xhr.send(null);
      },
      "post": function(url, callback, data) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onreadystatechange = callback;
        xhr.responseType = 'json';
        xhr.send(data);
      }
    };

    this.getImage = function ( numImg, data ) {
      var obj = {},
          i = 0;

      var imgArr = data.result;
      for( var item in imgArr ){
        if ( i >= 2 ) {
          break;
        }
        obj["colors[" + i + "]"] = imgArr[item].color;
        obj[ "weights[" + i + "]"] = imgArr[ item ].weight;
        i++;
      }

      var formData = new FormData();
      formData.append("limit", 2);
      for( var thing in obj ) {
        formData.append("" + thing, "" + obj[ thing ]);
      }

      XHR.post( "/hackdays_flickr/rest/color_search/",
        function( data ) {
          if (this.readyState == 4) {
            cb({
              imgSrc: this.response.result[ 0 ].filepath,
              info: canvasData
            });
          }
        },
        formData
      );
    }

    this.getColors = function() {
      var canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      var ctx = canvas.getContext('2d');
      ctx.putImageData(image, 0, 0);
      var formData = new FormData();
      formData.append("limit", 2);
      formData.append("images[0]", canvas.mozGetAsFile("foo.png"));

      XHR.post( "/hackdays_flickr/rest/extract_colors/",
        function( data ) {
          if (this.readyState == 4) {
            _this.getImage( 2, this.response );
          }
        },
        formData
      );
    }

    return this;
  };
})();
