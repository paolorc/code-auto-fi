/**
 * Formatter to the final data to insert into mongodb
 */

module.exports = {
    "Zip Code": function (item, head, resultRow, row, colIdx) {
        resultRow["zip_code"] = item;
    },
    "Create Date": function (item, head, resultRow, row, colIdx) {
        resultRow["create_date"] = new Date(item);
    },
    "Update Date": function (item, head, resultRow, row, colIdx) {
        resultRow["update_date"] = new Date(item);
    },
    "Price": function (item, head, resultRow, row, colIdx) {
        resultRow["price"] = item;
    },
    "Year": function (item, head, resultRow, row, colIdx) {
        resultRow["year"] = item;
    },
    "Mileage": function (item, head, resultRow, row, colIdx) {
        resultRow["mileage"] = item;
    },
    "Model": function (item, head, resultRow, row, colIdx) {
        resultRow["model"] = item;
    },
    "Make": function (item, head, resultRow, row, colIdx) {
        resultRow["make"] = item;
    },
    "VIN": function (item, head, resultRow, row, colIdx) {
        resultRow["vin"] = item;
    },
    "UUID": function (item, head, resultRow, row, colIdx) {
        resultRow["uuid"] = item;
    }
}