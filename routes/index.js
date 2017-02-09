var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Todo = mongoose.model('Todo');

/* GET home page. */
router.get('/', function(req, res, next) {
    Todo.find().sort('-updated_at').exec(function(err, todos) {
        res.render('index', {
            title: 'Express Todo Example',
            todos: todos
        });
    });
});

/* POST create todo content */
router.post('/create', function(req, res) {
    new Todo({
        content     : req.body.content,
        updated_at  : Date.now()
    }).save(function(err, todo, count) {
        res.redirect('/');
    });
});

router.get('/delete/:id', function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        todo.remove(function(err, todo) {
            res.redirect('/');
        });
    });
});

router.get('/edit/:id', function(req, res) {
    Todo.find().sort('-updated_at').exec(function(err, todos) {
        res.render('edit', {
            title   : 'Express Todo Example',
            todos   : todos,
            current : req.params.id
        });
    });
});

router.post('/update/:id', function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        todo.content    = req.body.content;
        todo.updated_at = Date.now();
        todo.save(function(err, todo, count) {
            res.redirect('/');
        });
    });
});

module.exports = router;
