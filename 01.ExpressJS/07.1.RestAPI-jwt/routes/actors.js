const router = require('express').Router();
const { Actor, validateActor } = require('../models/actor');

router.get('/', async (req, res) => {
  const actors = await Actor.find().sort('name');
  res.send(actors);
});

router.get('/:id', async (req, res) => {
  const actor = await Actor.findById(req.params.id);
  if (!actor) {
    return res.status(404).send('Actor not found!');
  }

  res.send(movie);
});

router.post('/', async (req, res) => {
  const error = validateActor(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let actor = new Actor({ name: req.body.name, isFamous: req.body.isFamous });
  actor = await actor.save();

  res.send(actor);
});

router.put('/:id', async (req, res) => {
  const error = validateActor(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const actor = await Actor.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, isFamous: req.body.isFamous },
    { new: true }
  );
  if (!actor) {
    return res.status(404).send('Actor not found!');
  }

  res.send(actor);
});

router.delete('/:id', async (req, res) => {
  const actor = await Actor.findByIdAndRemove(req.params.id);
  if (!actor) {
    return res.status(404).send('Actor not found!');
  }

  res.send(actor);
});

module.exports = router;
