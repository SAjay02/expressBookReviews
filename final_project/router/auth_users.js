const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' }
];
let reviews = [
  { username: 'user1', isbn: '123456', review: 'Great book!' },
  { username: 'user2', isbn: '789012', review: 'Awesome read!' }
];
regd_users.use(express.json());

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (!isValid(username) || !authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate JWT token
  const token = jwt.sign({ username }, 'secretKey', { expiresIn: '1h' });

  return res.status(200).json({ message: "Login successful", token });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token not provided" });
  }

  try {
    const decodedToken = jwt.verify(token, 'secretKey');
    const username = decodedToken.username;
    const isbn = req.params.isbn;

    // Filter reviews based on the session username and ISBN
    const userReviews = reviews.filter(review => review.username === username && review.isbn === isbn);

    if (userReviews.length === 0) {
      return res.status(404).json({ message: "Review not found for the given ISBN" });
    }

    // Remove the matched reviews
    reviews = reviews.filter(review => !(review.username === username && review.isbn === isbn));

    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
