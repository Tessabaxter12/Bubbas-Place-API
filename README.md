# Bubba's Place API

#### Backend server for Bubba's Place App, with auth, and mongoose relationships.

## Entities
```js
User is comprised of the following:
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    token: String,
```

```js
Review is comprised of the following:
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
```

```js
Reservation is comprised of the following:
    owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
    date: {
		type: Date,
		required: true,
	},
```

## Routes

### Auth Routes
| Verb   | URI Pattern                  | Controller#Action     |
|--------|------------------------------|-----------------------|
| POST   | `/sign-up`                   | `users#signup`        |
| POST   | `/sign-in`                   | `users#signin`        |
| PATCH  | `/change-password/`          | `users#changepassword`|
| DELETE | `/sign-out/`                 | `users#signout`       |

### Review Routes
| Verb   | URI Pattern                  | Controller#Action     |
|--------|------------------------------|-----------------------|
| GET    | `/reviews`                   | `reviews#index`       |
| GET    | `/reviews/:id`               | `reviews#show`        |
| POST   | `/reviews`                   | `reviews#create`      |
| PATCH  | `/reviews/:id`               | `reviews#update`      |
| DELETE | `/reviews/:id`               | `reviews#delete`      |

### Reservation Routes
| Verb   | URI Pattern                  | Controller#Action     |
|--------|------------------------------|-----------------------|
| POST   | `/reservations/:userId`      | `reservations#create` |
| PATCH  | `/reservations/:userId/:Id`  | `reservations#update` |
| DELETE | `/reservations/:userId/:Id`  | `reservations#delete` |