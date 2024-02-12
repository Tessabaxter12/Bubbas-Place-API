const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema(
	{
		date: {
			type: Date,
			required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Reservation', reservationSchema)