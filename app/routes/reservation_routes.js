const express = require('express')
const passport = require('passport')
const Reservation = require('../models/reservation')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// CREATE
// POST / reservations
router.post('/reservations', requireToken, (req, res, next) => {
	
	console.log('Request body:');
	console.log('User:');

	// set owner of new reservations to be current user
	req.body.reservation.owner = req.user.id
	Reservation.create(req.body.reservation)
		// respond to succesful `create` with status 201 and JSON of new "reservation"
		.then((reservation) => {
			res.status(201).json({ reservation: reservation.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// UPDATE
// PATCH /reservations/5a7db6c74d55bc51bdf39793
router.patch('/reservations/:userId/:reservationId', requireToken, removeBlanks, (req, res, next) => {
	const { userId, reservationId } = req.params;
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	delete req.body.reservation.owner
	Reservaton.findById(req.params.id)
		.then(handle404)
		.then((reservation) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, reservation)
			// pass the result of Mongoose's `.update` to the next `.then`
			return reservation.updateOne(req.body.reservation)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})
// DESTROY
// DELETE /reservations/5a7db6c74d55bc51bdf39793
router.delete('/reservations/:Id', requireToken, (req, res, next) => {
	const { userId, reservationId } = req.params;
	Reservation.findById(req.params.id)
		.then(handle404)
		.then((reservation) => {
			// throw an error if current user doesn't own `reservation`
			requireOwnership(req, reservation)
			// delete the reservation ONLY IF the above didn't throw
			reservation.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})
module.exports = router