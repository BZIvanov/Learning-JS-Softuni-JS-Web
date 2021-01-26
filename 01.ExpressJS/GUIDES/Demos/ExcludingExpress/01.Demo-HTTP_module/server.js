// engine property in the file package.json specify which version of NodeJS to be used

// load module http
const http = require('http');
// it is a usual practice to keep the port in a variable and use it below in the code
const port = 5000;

// http module has createServer method which is a special function which will handle all requests it receives. CreateServer method takes a function as parameter
const server = http.createServer(frontController);

// the function as parameter from createServer has 2 parameters. The first is request and second is response
function frontController(req, res) {
  // writeHead method from response will send 2 parameters to the browser. The first is which status code and second parameter is object with the details we want to specify for example what kind of data we are sending. Be carefull with the object parameters, in this example we will work with html specified in content type, which means write method below will treat the data as html
  res.writeHead(200, {
    'content-type': 'text/html',
  });
  // write method on the response is what will be displayed. This method is the body of the response. write method can only write strings, for example it will not work with image
  res.write('<h1>Welcome</h1>');
  // end method from the response is important so the browser will know we are ready with response otherwise it will be stuck waiting on us
  res.end();
}

// we saved createServer in variable server so here we can call the method listen which will specify on which port our server will listen for requests
server.listen(port, () => console.log(`Listening on port ${port}...`));
