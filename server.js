var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.locals.pretty = true;

var mysql = require('mysql');
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '4321',
    database: 'proj'
});

con.connect();

app.get('/', function(req, res) {
    res.send('Helloworld');
});

app.get('/imgpath/:id/:workname', function(req, res){
    console.log('imgpath');
    var id = req.params.id;
    var workname = req.params.workname;
    var result = {};
    var sql = 'SELECT img, page FROM work WHERE id = ? AND workname = ?';
    con.query(sql, [id, workname], function(err, rows, fields){
        if(err) throw err;
        result = '{ "lists" : ' + JSON.stringify(rows) + '}';
        return res.send(result);
    });
});

app.get('/name/:id', function(req, res){
    var id = req.params.id;
    var result = {};
    //SELECT workName, content, done, page, signCheck FROM work WHERE ID = ?
    var sql = 'SELECT name FROM user WHERE ID = ?';
    con.query(sql, [id], function(err, rows, fields) {
        if (err) throw err;
        result = '{ "lists" : ' + JSON.stringify(rows) + '}';
        return res.send(result);
    });
});

app.get('/works/:id', function(req, res) {
    var id = req.params.id;
    var result = {};
    //SELECT workName, content, done, page, signCheck FROM work WHERE ID = ?
    var sql = 'SELECT name, workName, content, done, page, signCheck FROM user INNER JOIN work ON user.ID = work.ID WHERE work.ID = ?';

    console.log(id);
    con.query(sql, [id], function(err, rows, fields) {
        if (err) throw err;
        console.log('works/id .. -> ' + rows);
        result = '{ "lists" : ' + JSON.stringify(rows) + '}';
        return res.send(result);
    });
});

app.get('/pages/:workname/:id/', function(req, res) {
    var id = req.params.id;
    var workname = req.params.workname;
    var sql = 'SELECT page FROM work WHERE ID = ? AND workname = ?';
    con.query(sql, [id, workname], function(err, rows, fields) {
        if (err) throw err;
        var result = '{ "lists" : ' + JSON.stringify(rows) + '}';
        return res.send(result);
    });
});

app.get('/sign/:id/:workname', function(req, res) {
    var Id = req.params.id;
    var Workname = req.params.workname;
    var sql = 'SELECT signCheck FROM work WHERE ID = ? AND workname = ?';
    var results = {};
    con.query(sql, [Id, Workname], function(err, rows, fields) {
        if (err) throw err;
        result = '{ "lists" : ' + JSON.stringify(rows) + '}';
        return res.send(result);
    });
});

app.get('/update/:id/:workname/:sign', function(req, res) {
    var Id = req.params.id;
    var Workname = req.params.workname;
    var Sign = req.params.sign;
    console.log(Id);
    console.log(Workname);
    console.log(Sign);
    var sql = 'UPDATE work SET signCheck = ? WHERE ID = ? AND workName = ?';
    con.query(sql, [Sign, Id, Workname], function(err, rows, fields) {
        if (err) throw err;
        console.log('updated sign.');
        return res.send('updated.');
    });
});

app.get('/update/:id/:workname/:page/:done', function(req, res) {
    var Id = req.params.id;
    var Workname = req.params.workname;
    var Page = req.params.page;
    var Done = req.params.done;
    var sql = 'UPDATE work SET page = ?, done = ? WHERE ID = ? AND workName = ?';
    con.query(sql, [Page, Done, Id, Workname], function(err, rows, fields) {
        if (err) throw err;
        console.log('updated page, done.');
        return res.send('updated.');
    });
});

app.listen(3000, function() {
    console.log('Server running at http://localhost:3000');
});
