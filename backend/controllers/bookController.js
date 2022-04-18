import asyncHandler from 'express-async-handler'
import Book from '../models/bookModel.js'

// getBooks

const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({})
  if (books) {
    res.json(books)
  } else {
    res.status(404).json({ message: 'No books in DB' })
  }
})

// getBookById
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)
  if (book) {
    res.json(book)
  } else {
    res.status(404).json({ message: 'Book not found' })
  }
})

export { getBooks, getBookById }
