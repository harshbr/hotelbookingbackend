# Room Booking System

A simple room booking system built with Node.js, Express, MongoDB, and JWT Authentication.

## Features

- User Registration and Login
- Room Addition and Retrieval
- Room Booking and Booking Fetch
- Booking Cancellation
- Email Validation and Password Hashing with bcrypt
- JWT Token-based Authentication

## Technologies Used

- **Node.js**: Backend JavaScript runtime
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database to store user, room, and booking information
- **Mongoose**: MongoDB object modeling
- **JWT (JSON Web Token)**: For secure user authentication
- **bcrypt**: For password hashing
- **moment**: For handling date formatting
- **email-validator**: For email validation
- **CORS**: Cross-Origin Resource Sharing middleware for enabling cross-origin requests
- **body-parser**: Middleware to parse JSON bodies

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (locally or a cloud service like MongoDB Atlas)
- `dotenv` package for environment variables

### Steps to Set Up Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/harshbr/hotelbookingbackend.git
   cd hotelbookingbackend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and add your MongoDB URI:

   ```
   DATABASEMAINURL=your_mongo_database_url
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. The app will be running at `http://localhost:3000`.

## API Endpoints

### 1. Register User

- **Endpoint**: `/registeruser`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User register successfully"
  }
  ```

### 2. Login User

- **Endpoint**: `/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "user login successfully",
    "token": "jwt_token_here"
  }
  ```

### 3. Add Room

- **Endpoint**: `/room/roomadd`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "imageurl": "url_to_image",
    "currentbookings": [],
    "name": "Deluxe Room",
    "maxcount": 2,
    "phonenumber": "123456789",
    "type": "Luxury",
    "rentperday": 100,
    "description": "A spacious room with modern amenities."
  }
  ```
- **Response**:
  ```json
  {
    "message": "Room added successfully"
  }
  ```

### 4. Get All Rooms

- **Endpoint**: `/room/roomget`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "name": "Deluxe Room",
      "maxcount": 2,
      "rentperday": 100,
      ...
    }
  ]
  ```

### 5. Get Room by ID

- **Endpoint**: `/room/roomgetbyid/:roomId`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "name": "Deluxe Room",
    "maxcount": 2,
    "rentperday": 100,
    ...
  }
  ```

### 6. Book Room

- **Endpoint**: `/room/roombooking`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "roomname": "Deluxe Room",
    "roomid": "room_id_here",
    "email": "johndoe@example.com",
    "fromdate": "01-04-2025",
    "todate": "03-04-2025",
    "totaldays": 2,
    "totalamount": 200,
    "transactionid": "123456"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Room booked successfully"
  }
  ```

### 7. Get All Bookings by User

- **Endpoint**: `/room/bookingget`
- **Method**: `GET`
- **Query Params**: `email=johndoe@example.com`
- **Response**:
  ```json
  [
    {
      "roomname": "Deluxe Room",
      "fromdate": "01-04-2025",
      "todate": "03-04-2025",
      "totalamount": 200,
      "status": "booked"
    }
  ]
  ```

### 8. Cancel Booking

- **Endpoint**: `/room/bookingcancel`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "bookingid": "booking_id_here",
    "roomid": "room_id_here"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Booking cancelled successfully"
  }
  ```

## Environment Variables

- `DATABASEMAINURL`: The connection string to your MongoDB database.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
