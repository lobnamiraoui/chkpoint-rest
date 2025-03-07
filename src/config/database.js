const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};

module.exports = connectDB;
const Person = require('./models/person');

const newPerson = new Person({
  name: "Alice",
  age: 25,
  favoriteFoods: ["Pizza", "Pasta"]
});

newPerson.save((err, data) => {
  if (err) return console.error(err);
  console.log("📝 Person saved:", data);
});