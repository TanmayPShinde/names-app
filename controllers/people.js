// 1. Load the Person model
var Person = require("../models/person.js");

// 2. Get a paginated list of all People
exports.list = function (req, res) {
  var query = {};
  var page = req.params.page || 1;
  var options = {
    select: "first last",
    page: page,
  };
  Person.paginate(query, options).then(function (result) {
    res.json(result);
  });
};

// 2. Get an individual Person's public information
exports.show = function (req, res) {
  Person.findById(req.params.id)
    .select("first last")
    .exec(function (err, doc) {
      if (err || doc === null) {
        res.status(404).json({ error: "PersonNotFound" });
      } else {
        res.json(doc);
      }
    });
};

// 3. Get an individual person's private profile information
exports.profile = function (req, res) {
  Person.findById(req.params.id)
    .select("email first last")
    .exec(function (err, doc) {
      if (err || doc === null) {
        res.status(404).json({ error: "PersonNotFound" });
      } else {
        res.json(doc);
      }
    });
};
