const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Reservation', reservationSchema)