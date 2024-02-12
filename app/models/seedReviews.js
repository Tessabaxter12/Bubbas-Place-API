const mongoose = require('mongoose')
const Review = require('./review')
const User = require('./user')
const db = require('../../config/db')

const startReviews = [
    { title: 'Fun In The Sun', comments: 'Nice quiet location. Great river spot to walk down to. Kids swam for hours and hours between the pool and the river. We will definitely be back!', rating: 5},
    { title: 'Sandy Beach', comments: 'The property is so close to the river.', rating: 5},
    { title: 'What A Pool', comments: 'We had the best weekend ever at this Place!', rating: 5},
    { title: 'Fun For The Whole Family', comments: 'We were very pleased with our stay. This has been the most well-stocked vacation rental we have stayed at.', rating: 5}
]
async function seedReviews() {
    try {
        // Ensure the database connection
        await mongoose.connect(db, { useNewUrlParser: true });
        // Clear existing reviews with no owner
        await Review.deleteMany({ owner: null });
        // Retrieve all users
        const users = await User.find();
        // Map each startReview to a review document with a random owner
        const reviewDocuments = startReviews.map(review => {
            // Select a random user as the owner for the review
            const randomUser = users[Math.floor(Math.random() * users.length)];
            return {
                owner: randomUser._id,
                title: review.title,
                comments: review.comments,
                rating: review.rating
            };
        });
        // Insert the review documents into the database
        const insertedReviews = await Review.create(reviewDocuments);
        console.log('Reviews seeded successfully:', insertedReviews);
        // Close the database connection
        mongoose.connection.close();
    } catch (error) {
        console.error('An error occurred while seeding reviews:', error);
        // Close the database connection in case of error
        mongoose.connection.close();
    }
}
seedReviews();