var http = require('http'),
    express = require('express'),
    path = require('path');

var app = express();
var bodyParser = 
require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', onRequest);
app.use(express.static(path.join(__dirname, '/')));

function onRequest(request, response){
  response.sendFile(path.join(__dirname, '/index.html'));
}
var mysql = require('mysql');

app.post('/getdata', function(req, res){

console.log("req : " + req);
console.log("req : " + JSON.stringify(req.body));
debugger;
var con = mysql.createConnection({
  host: "sql12.freemysqlhosting.net",
  user: "sql12225913",
  password: "cqBLp8Q8UE",
  database: "sql12225913"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "Select * FROM Employee";
  con.query(sql, function (err, result) {
    if (err) throw err;
    else{
    	console.log("Table created");
    	console.log("Output : " + JSON.stringify(result));
    	res.json(result);
    }
  });
});

});

app.post('/postdata', function(req, res){


console.log("req : " + JSON.stringify(req.body));
var con = mysql.createConnection({
  host: "sql12.freemysqlhosting.net",
  user: "sql12225913",
  password: "cqBLp8Q8UE",
  database: "sql12225913"
});
var rating= req.body.rating;
console.log(rating);
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "UPDATE Employee SET rating1 = '"+rating+"' WHERE name = 'Priyanka Modi'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    else{
    	console.log("Table created");
    	console.log("Output : " + JSON.stringify(result));
    	res.json(result);
    }
  });
});

})
/*
CREATE TABLE Employee (name VARCHAR(255), psno VARCHAR(255), rating1 VARCHAR(255))
Select * FROM Employee
"INSERT INTO Employee (name, psno, rating1) VALUES ('Priyanka Modi', '10614328', '5')";
*/
function send404(response){
	response.writeHead(404, {'Context-Type' : "text/plain"});
	response.write("Error 404 : Page not Found");
	response.end();
}


http.createServer(app).listen(8888);
console.log('Server is now Running');