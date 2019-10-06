
const request = require('supertest');
const app = require('../app')

test('Should response with error because its not a valid file', async () => {
    const filePath = `${__dirname}/test_data/wrongFile.png`;

    try {
        const res = await request(app)
            .post('/api/cars/upload')
            // Attach the file with key 'file' which is corresponding to your endpoint setting
            .attach('file', filePath)

        if (!res) throw new Error('No se ingresaron los datos');

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBe('Error');

    } catch (error) {
        console.log(error.message);
    }

})

test('Should insert rows from json with bad columns into database, some columns will be empty', async () => {
    const filePath = `${__dirname}/test_data/badRows.csv`;

    try {
        const res = await request(app)
            .post('/api/cars/upload')
            // Attach the file with key 'file' which is corresponding to your endpoint setting
            .attach('file', filePath)

        if (!res) throw new Error('No se ingresaron los datos');

        console.log(res.body);

        const { message, rowsInserted } = res.body;

        expect(res.statusCode).toEqual(200);
        expect(message).toBe('Success');
        expect(rowsInserted).toBe(4);
    } catch (error) {
        console.log(error.message);
    }

})

test('Should insert all rows, csv have all the columns we need', async () => {
    const filePath = `${__dirname}/test_data/goodRows.csv`;

    try {
        const res = await request(app)
            .post('/api/cars/upload')
            // Attach the file with key 'file' which is corresponding to your endpoint setting
            .attach('file', filePath)

        if (!res) throw new Error('No se ingresaron los datos');

        console.log(res.body);

        const { message, rowsInserted } = res.body;

        expect(res.statusCode).toEqual(200);
        expect(message).toBe('Success');
        expect(rowsInserted).toBe(4);
    } catch (error) {
        console.log(error.message);
    }

})

afterAll(async () => {
	await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});

test('Should get rows from cars collection from database and have to be >= 0', async () => {
    
    const res = await request(app).get('/api/cars');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('totalRows');
    expect(res.body.totalRows).toBe(8);


})

