(function() {
  var TinEye = window.TinEye = function( img, howMany, cb ) {
    var image = img,
        numColors = howMany,
        callback = cb,
        _this = this;

    function parameterize(data) {
      var s = [];

      for (var key in data) {
        s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
      }

      return s.join("&").replace("/%20/g", "+");
    }

    var __types = {
      form: "multipart/form-data"
    };

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

    this.getImage = function ( numImg, imgArr ) {
      var obj = {},
          i = 0;

      for( var item in imgArr ){
        obj["colors" + i] = imgArr[item];
        i++;
      }

      obj.limit = numImg;
      obj.image = "@" + img;

      XHR.post( "/hackdays_flickr/rest/color_search/",
        obj,
        function( data ) {
          //postMessage( data.result[ 0 ].filepath );
          cb( data.result[ 0 ].filepath );
          console.log(data);
        },
        {
          "image": "@" + img,
          "limit": numImg
        }
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
            console.log( this.response );
            _this.getImage( this.response );
          }
        },
        formData
      );
    }

    return this;
  };
})();
