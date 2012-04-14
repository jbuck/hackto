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
      form: "application/x-www-form-urlencoded",
      json: "application/json"
    };

    var XHR = {
      "get": function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = callback;
        xhr.send(null);
      },
      "post": function(url, data, callback, type) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onreadystatechange = callback;
        if( !type || type === "form" ){
          xhr.setRequestHeader("Content-Type", __types.form);
          xhr.send(parameterize(data));
        }
        else if( __types[ type ] ){
          xhr.setRequestHeader("Content-Type", __types[ type ]);
          xhr.send(data);
        }
        else{
          xhr.setRequestHeader("Content-Type", "text/plain");
          xhr.send(data);
        }
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
        },
        __types.json
      );
    }

    this.getColors = function() {
      XHR.post( "/hackdays_flickr/rest/extract_colors/",
        {
          "image[0]": img,
          "limit": numColors
        },
        function( data ) {
          _this.getImage( 1, data.result );
        },
        __types.json
      );
    }

    return this;
  };
})();
