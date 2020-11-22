const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb+srv://user1:somepassword@cluster0.mcepe.mongodb.net/CS519?retryWrites=true&w=majority";

const DATABASE_NAME = "CS519";

var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("color_maps");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.post("/colormap", (request, response) => {
  const name = request.body.name;
  const cdict = request.body.cdict;
  if (!name){
    return response.status(400).send("Please provide a name for the color map.");
  }
  collection.findOne({'name':name},(err,dbRes)=>{
        if (dbRes){
          return response.status(400).send("Name  " + name + " is in use. Please choose a different name.");
        }
        if (!cdict){
          return response.status(400).send("Color map is not specified.");
        }
        if (!cdict.red){
          return response.status(400).send("Red channel is missing");
        }
        if (!cdict.green){
          return response.status(400).send("Green channel is missing");
        }
        if (!cdict.blue){
          return response.status(400).send("Blue channel is missing");
        }
        if (!Array.isArray(cdict.red) || cdict.red.length < 2 || !Array.isArray(cdict.red[0]) || cdict.red[0].length != 3){
          return response.status(400).send("Bad format in red channel");
        }
        if (!Array.isArray(cdict.blue) || cdict.blue.length < 2 || !Array.isArray(cdict.blue[0]) || cdict.blue[0].length != 3){
          return response.status(400).send("Bad format in blue channel");
        }
        if (!Array.isArray(cdict.green) || cdict.green.length < 2 || !Array.isArray(cdict.green[0]) || cdict.green[0].length != 3){
          return response.status(400).send("Bad format in green channel");
        }
        collection.insertOne(request.body, (error, result) => {
              if(error) {
                  return response.status(500).send(error);
              }
              response.send(result.result);
          });
    });

});
