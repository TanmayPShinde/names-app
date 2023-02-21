// 1. Include required modules
var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  mongoosePaginate = require("mongoose-paginate"),
  bcrypt = require("bcryptjs");

// 2. Define the MongoDB schema for the people collection
var personSchema = new Schema({
  first: { type: String, required: "FirstNameInvalid" },
  last: String,
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: "EmailInvalid",
  },
  password: { type: String, select: false, required: "PasswordInvalid" },
});

// 3. Paginate the results
personSchema.plugin(mongoosePaginate);

// 4. Encypt and store the person's password
personSchema.pre("save", function (next) {
  var person = this;
  if (!person.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(person.password, salt, function (err, hash) {
      person.password = hash;
      next();
    });
  });
});

// 5. Confirm a person's password against the stored password
personSchema.methods.comparePassword = function (password, done) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    done(err, isMatch);
  });
};

// 6. Export the Person model
module.exports = mongoose.model("Person", personSchema);
