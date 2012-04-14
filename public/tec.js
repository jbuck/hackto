(function() {
  var TEC = window.TEC = function(src, target, columns, rows) {
    var i,
        n,
        arr = this.slices = [],
        imgcanvas = document.createElement('canvas'),
        ctx = imgcanvas.getContext('2d'),
        tctx = target.getContext('2d');

    imgcanvas.width = src.width;
    imgcanvas.height = src.height;
    ctx.drawImage(src, 0, 0);
    target.width = src.width;
    target.height = src.height;

    var colinc = Math.floor(imgcanvas.width / columns);
    var rowinc = Math.floor(imgcanvas.height / rows);

    // Slice up image
    for (i = 0; i < columns; i++) {
      for (n = 0; n < rows; n++) {
        var slice = {
          data: ctx.getImageData(
            colinc * i,
            rowinc * n,
            colinc,
            rowinc
          ),
          col: i,
          row: n,
          x: colinc * i,
          y: rowinc * n
        };
        
        arr.push(slice);
        
        tctx.putImageData(slice.data, slice.x, slice.y);
      }
    }

    // Draw initial image
    

    return this;
  };
})();
