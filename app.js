var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var logger = require("morgan");

// 2. Include Configuration
var config = require("./config");

// 3. Initialize the application
var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());

// 4. Connect to MongoDB
mongoose.connect(config.MONGO_URI);
mongoose.connection.on("error", function (err) {
  console.log("Error: Could not connect to MongoDB.");
});

require("./routes")(app);

app.listen(config.LISTEN_PORT, function () {
  console.log("listening on port " + config.LISTEN_PORT);
});
