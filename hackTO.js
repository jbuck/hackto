var i = 0;

function timedCount( data ){
  postMessage(data);
}

self.addEventListener("message", function(e){
  timedCount(e.data);
}, false);