 /*
  * These is the RESTful API for hello world app
  *
  *
  */

const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;

const server = http.createServer(function(req,res){
  // get the URL and parse interval
  const parsedUrl = url.parse(req.url,true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g,'');

  const queryStringObject = parsedUrl.query;

  const method = req.method.toLowerCase();

  const decoder = new stringDecoder('utf-8');
  let buffer = '';

  req.on('data',function(data){
    buffer += decoder.write(data);
  });

  req.on('end',function(){

    buffer += decoder.end();

    const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] :handlers.notFound;

    var data = {
      'trimmedPath' : trimmedPath
    }

    chosenHandler(data,function(payload){

      payload = typeof(payload) == 'object' ? payload : {};

  //  Convert the payload to a string
      const payloadString = JSON.stringify(payload);
      
      res.setHeader('Content-Type','application/json');
      res.end(payloadString)
      console.log('You have a messsage: ' + payloadString )
    });


  });
});

server.listen(3000, function(){
  console.log('listen to port 3000')
  });

const handlers = {};

handlers.hello = function(data,callback){
  callback({'message' : ' hello world'})
};

const router = {
  'hello' : handlers.hello
}
