// Importer le modèle Person
const Person = require('../models/person');

// Créer une nouvelle personne
exports.createPerson = async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.status(201).json(person);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir toutes les personnes
exports.getAllPersons = async (req, res) => {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir une personne par ID
exports.getPersonById = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).json({ error: 'Personne non trouvée' });
    res.json(person);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour une personne par ID
exports.updatePerson = async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPerson) return res.status(404).json({ error: 'Personne non trouvée' });
    res.json(updatedPerson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer une personne par ID
exports.deletePerson = async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndRemove(req.params.id);
    if (!deletedPerson) return res.status(404).json({ error: 'Personne non trouvée' });
    res.json(deletedPerson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};














