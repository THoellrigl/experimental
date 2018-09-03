'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _secrets = require('./secrets');

var _comment = require('./models/comment');

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// and create our instances
// server.js

// first we import our dependencies…
var app = (0, _express2.default)();
var router = _express2.default.Router();

// set our port to either a predetermined port number if you have set it up, or 3001
var API_PORT = process.env.API_PORT || 3001;

// db config -- set your URI from mLab in secrets.js
_mongoose2.default.connect((0, _secrets.getSecret)('dbUri'));
var db = _mongoose2.default.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use((0, _morgan2.default)('dev'));

// now we can set the route path & initialize the API
router.get('/', function (req, res) {
    res.json({ message: 'Hello, World!' });
});

// Search - read
router.get('/comments', function (req, res) {
    _comment2.default.find(function (err, comments) {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: comments });
    });
});

// Create
router.post('/comments', function (req, res) {
    var comment = new _comment2.default();
    // body parser lets us use the req.body
    var _req$body = req.body,
        author = _req$body.author,
        text = _req$body.text;

    if (!author || !text) {
        // we should throw an error. we can do this check on the front end
        return res.json({
            success: false,
            error: 'You must provide an author and comment'
        });
    }
    comment.author = author;
    comment.text = text;
    comment.save(function (err) {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// Update
router.put('/comments/:commentId', function (req, res) {
    console.log(req.params);
    var commentId = req.params.commentId;

    if (!commentId) {
        return res.json({ success: false, error: 'No comment id provided' });
    }
    _comment2.default.findById(commentId, function (error, comment) {
        if (error) return res.json({ success: false, error: error });
        var _req$body2 = req.body,
            author = _req$body2.author,
            text = _req$body2.text;

        if (author) comment.author = author;
        if (text) comment.text = text;
        comment.save(function (error) {
            if (error) return res.json({ success: false, error: error });
            return res.json({ success: true });
        });
    });
});

// Delete
router.delete('/comments/:commentId', function (req, res) {
    var commentId = req.params.commentId;

    if (!commentId) {
        return res.json({ success: false, error: 'No comment id provided' });
    }
    _comment2.default.deleteOne({ _id: commentId }, function (error, comment) {
        if (error) return res.json({ success: false, error: error });
        return res.json({ success: true });
    });
});

// Use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, function () {
    return console.log('Listening on port ' + API_PORT);
});
//# sourceMappingURL=server.js.map