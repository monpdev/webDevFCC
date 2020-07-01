
var express = require('express');
var app = express();
var bodyParser = require("body-parser");



/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
/*
app.get("/", function(req, res) {
res.send('Hello Express');
});
app.listen(3001, function() {
console.log('Listening on port 3000');
});
*/

/** 3) Serve an HTML file */
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});


/*4) Save Static Assets   */
app.use(express.static(__dirname+'/public/'));



/*5) Serve JSON on a Specific Route */
/*app.get("/json", (req,res) => {
  res.json({
    message: "Hello json"
  });
});
*/

/** 6) Use the .env file to configure the app */
app.get('/json', function(req, res) {
  let response = {"message": "Hello json"};
  if (process.env.MESSAGE_STYLE == 'uppercase') {
    response.message = response.message.toUpperCase()
    }
  res.json(response)
})


app.use((req, res, next) => {

 let string = `${req.method} ${req.path} - ${req.ip}`
 console.log(string) 
   
  next();

});


var express = require('express');
var app = express();

// --> 7)  Mount the Logger middleware here
app.use(function(req, res, next){
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});



/** 8) Chaining middleware. A Time server */

app.get('/now', function(req,res, next){
  next();
}, function(req, res){
 var time = new Date().toString();
  console.log('time'+time);
  res.json({'time': time});
}
);



/** 9)  Get input from client - Route parameters */

app.get("/:word/echo", (req, res) => { const word = req.params.word; 
                                      res.json({ echo: word }); 
                                     });


/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

app.get('/name', function(req, res){
  let first = req.query.first;
  let last = req.query.last;
  let jsonObj = {name: first + " " + last};
  res.send(jsonObj);
});


/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** 12) Get data form POST  */
app.post('/name', (req, res) => {
  let name = req.body.first + ' ' + req.body.last;
  res.json({name: name});
});


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
