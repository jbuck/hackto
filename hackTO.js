function randNum( data ){
  postMessage(data);
}

self.addEventListener("message", function(e){
  var data = e.data;

  switch (data.cmd) {
    case "randNum":
      randNum(data.value);
      break;

    case "sendText":
      postMessage(data.value);
      break;
  };
}, false);