const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// 1) _Login Route
routes.post('/sessions', celebrate({
   [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required().length(8),//crypto.randomBytes(4).toString('HEX').length is always 8 [@ Ong Controller]
   })
}), SessionController.create);

// 2) _Ongs routes, first to list all registered ongs, second to Sign Up in case of not registered yet
routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
   [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(11),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2)

   })
}, { abortEarly: false }), OngController.create);

// 3) _Incidents listing when already looged in a Ong Profile
routes.get('/profile', celebrate({
   [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
   }).unknown(),// directly in object method and with unknown for headers, bcuz headers brings lots of non-controlled info
}), ProfileController.index);

// 4) _First is incidents listing, relating ongs to incidents, snd is to create an incident, third to delete it
routes.get('/incidents', celebrate({
   [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
   })
}), IncidentsController.index);

routes.post('/incidents', celebrate({
   [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
   }).unknown(),
   [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required().min(6).max(21),
      description: Joi.string().required().min(9).max(320),
      value: Joi.number(),
   })
}, { abortEarly: false }), IncidentsController.create);

routes.delete('/incidents/:id', celebrate({
   [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
   })
}), IncidentsController.delete);

module.exports = routes;
