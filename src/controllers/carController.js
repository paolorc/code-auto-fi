const mongoose = require('mongoose');
const Car = mongoose.model('Car');
const formatter = require('../constants/csvFormatter');
const messages = require('../constants/messages.constants')
const csv = require('csvtojson');

let controller = () => { }

controller.uploadProcess = async (req, res, next) => {

    try {
        // console.log(req.file);
        let data = req.file;
        // console.log(data);

        let list = []

        list = await csv({
            trim: true,
            delimiter: [";"],
            maxRowLength: 65535, //max row length to revent fake documents
            colParser: formatter,
            includeColumns: /UUID|VIN|MAKE|MODEL|MILEAGE|YEAR|PRICE|ZIP CODE|CREATE DATE|UPDATE DATE/i //regular expression to match headers just we want, insensitive
        })
            .fromString(data.buffer.toString('utf8'))
            .on('data', (data) => {
                list.push(data);
            })
            .on('error', (err) => {
                console.log(err.message);
                throw new Error(err.message);
            })

        let insertCar = await Car.insertMany(list)

        if (!insertCar) return res.status(401).json({
            message: messages.errorProcessing,
            rowsInserted: 0
        });

        return res.status(200).json({
            message: messages.okResponse,
            rowsInserted: list.length
        });

    } catch (error) {

        return res.status(401).json({
            message: 'Error',
            description: error.message
        })
    }
}

controller.getAll = async (req, res, next) => {

    try {
        let cars = await Car.find({});

        if (!cars) { return res.sendStatus(404); }

        return res.status(200).json({
            message: messages.okResponse,
            totalRows: cars.length,
            cars
        });

    } catch (error) {

        return res.status(401).json({
            message: 'Error',
            description: error.message
        })
    }

}

module.exports = controller;