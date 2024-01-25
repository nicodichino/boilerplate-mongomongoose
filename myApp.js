require('dotenv').config();

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
  
});

const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person= mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const juanCarlos = new Person({ name: 'Juan Carlos', age: 45, favoriteFoods: ['milanesas', 'pure'] });
  juanCarlos.save((err, data) => {
    if (err) {
      return done(err);
    }
  done(null,data);
  });
};

const arrayOfPeople = [
  {name: 'Roberto', age: 65, favoriteFoods: ['asado, papas']},
  {name: 'Marta', age: 22, favoriteFoods: ['fideos, atun']},
  {name: 'Carlitos', age: 19, favoriteFoods: ['manteca']},
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) {
      done(err);
    } else {
      done(null, people);
    }
  });
  
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, people) => {
    if (err) {
      done(err);
    } else {
      done(null, people);
    }

  });
  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
  
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data);

  });
  
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

   
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    
    person.favoriteFoods.push(foodToAdd);

    
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    personId,
    (err, removeDoc) => {
      if(err) return console.log(err);
      done(null, removeDoc);
    });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};

const queryChain = done => {
	const foodToSearch = 'burrito'
	Person.find({ favoriteFoods: foodToSearch })
		.sort({ name: 1 })
		.limit(2)
		.select({ age: 0 })
		.exec((err, data) => {
			if (err) return done(err)
			done(null, data)
		})
}

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
