const express = require('express'),
bodyParser = require('body-parser'),
dbConfig = require('./src/config/db'),
mongoose = require('mongoose'),
port = process.env.PORT || 3000;


const app = express();


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


const rootRouter = require('./src/routes/rootRouter.js')(app);


mongoose.connect(dbConfig.url);



app.listen(port, () => {
    console.log("Running on port " + port);

})
