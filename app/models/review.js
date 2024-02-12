const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
        title: {
			type: String,
			required: true,
		},
		comments: {
			type: String,
			required: true,
		},
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Review', reviewSchema)