function randNum( data ){
  postMessage({ "value" : Math.random() * 1000000, "id" : data.id });
}

function counter(data){
  postMessage({ "value" : Math.random() * 10000, "id" : data.id });
  setTimeout( function(){
    counter(data);
  }, 300);
}

self.addEventListener("message", function(e){
  var data = e.data;

  switch (data.cmd) {
    case "randNum":
      randNum(data);
      break;

    case "sendText":
      postMessage({ "value" : data.value, "id" : data.id });
      break;

    case "newCounter":
      counter(data);
      break;
  };
}, false);