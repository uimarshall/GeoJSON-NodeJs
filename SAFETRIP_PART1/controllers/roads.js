const HttpStatus = require("http-status-codes");
// Invoke the collections
const Road = require("../models/Road");
const StatusText = require("../utils/constants");
const { ERROR, SUCCESS, FAIL } = StatusText;

// Hover over the Constants to see their status codes
const {
    ACCEPTED,
    BAD_REQUEST,
    CREATED,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
    UNAUTHORIZED,
    FORBIDDEN,
    OK
} = HttpStatus;

// Read/Get Roads
// Every async functions must have 'next'
exports.getRoads = async(req, res, next) => {
    try {
        const roads = await Road.find();
        return res.status(OK).json({
            data: roads,
            count: roads.length,
            status: SUCCESS
        });
    } catch (err) {
        Console.error(err);
        return res.status(INTERNAL_SERVER_ERROR).send({
            message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
            status: ERROR
        });
    }
};

// Create Roads
exports.addRoads = async(req, res, next) => {
    try {
        const roads = await Road.create(req.body);
        console.log(req.body);
        return res.status(OK).json({
            data: roads,

            status: SUCCESS
        });
    } catch (err) {
        // console.error(err);
        if (err.code === 11000) {
            return res.status(BAD_REQUEST).json({
                error: "The road already exist"
            });
        }
        res.status(INTERNAL_SERVER_ERROR).send({
            message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
            status: ERROR
        });
    }
};