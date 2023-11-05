const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Function to simulate a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

public_users.post("/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    return res.status(400).json({ error: 'Both username and password are required' });
  }

  if (users.some(user => user.username === username)) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  const newUser = { username, password };
  users.push(newUser);
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  try {
    // Simulate delay for demonstration purposes
    await delay(1000);

    let book = JSON.stringify(books);
    res.send(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;

    // Simulate delay for demonstration purposes
    await delay(1000);

    if (books[isbn]) {
      res.send(books[isbn]);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  try {
    const author = req.params.author;

    // Simulate delay for demonstration purposes
    await delay(1000);

    const foundBooks = Object.values(books).filter(val => val.author === author);

    if (foundBooks.length > 0) {
      res.send(foundBooks);
    } else {
      res.status(404).json({ message: "Books by author not found" });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  try {
    const title = req.params.title;

    // Simulate delay for demonstration purposes
    await delay(1000);

    const foundBooks = Object.values(books).filter(val => val.title === title);

    if (foundBooks.length > 0) {
      res.send(foundBooks);
    } else {
      res.status(404).json({ message: "Books by title not found" });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get book review
public_users.get('/review/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;

    // Simulate delay for demonstration purposes
    await delay(1000);

    if (books[isbn] && books[isbn].reviews) {
      res.send(books[isbn].reviews);
    } else {
      res.status(404).json({ message: "Book or reviews not found" });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports.general = public_users;
