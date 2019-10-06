const helmet = require('helmet')
const compression = require('compression');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const MMS = require('mongodb-memory-server');
const cors = require('cors');

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const mongoServer = new MMS.MongoMemoryServer();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

mongoose.Promise = Promise;
mongoServer.getConnectionString().then((mongoUri) => {
    const mongooseOpts = {
        autoReconnect: true,
        reconnectTries: 5,
        reconnectInterval: 1000,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    };

    mongoose.connect(mongoUri, mongooseOpts);

    mongoose.connection.on('error', (e) => {
        if (e.message.code === 'ETIMEDOUT') {
            console.log(e);
            mongoose.connect(mongoUri, mongooseOpts);
        }
        console.log(e);
    });

    mongoose.connection.once('open', () => {
        console.log(`MongoDB successfully connected to ${mongoUri}`);
    });
});

(isProduction) ? mongoose.set('debug', false) : mongoose.set('debug', true);

require('./src/models/Car');

app.use(require('./src/routes'));

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    //res.status(err.status || 500);
    //res.render('error');
    console.error(err);
});

// NodeJS/express: Cache and 304 status code
app.disable('etag');

module.exports = app;
