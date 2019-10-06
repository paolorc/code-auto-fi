# auto-fi
Code challenge Proximity - Paolo Reyes

The present project had the goal to upload a .csv file and insert all the rows that matched the columns we need into a MongoDB Database.
If one Row doesnt match the json Schema, it wont be included in the final insert and it will be empty.
If one Row have more columns that we need, it wont be included in the final insert just the columns we need.

How to install and run the project:
1. Run 'npm install'
2. Run 'npm run test' to run the predefined tests I made.
3. Run 'npm run start:dev'  --> This is to see more Logs in console.
4. Go to /postman_api and import the json file into a Postman app and test it.
5. Enjoy.

The main decision I made was to use the library of csvtojson to provide a filter before to pass a validation in the Car Schema in ./models/Car.js, I use the advantage of
the current data that csvtojson transform and didn´t make any other validation of the json I get to prefedined only the columns that I want(see ./controllers/carControlles.js).
With that the application only loops once for every row on the .csv and pass into the Json schema validation and insert to mongoDb.

I decided to use mongodb-memory-server, because I had previous experience with Mongo and didn´t with this package, was really really good and helpful.

Endpoints:
POST /api/cars/upload -> Insert new rows from .csv
GET /api/cars -> Get all new rows.

Thanks


