import asyncHandler from 'express-async-handler'
import Book from '../models/bookModel.js'

// @description Fetch all books
// @route GET /api/books
// @access public
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({})
  if (books) {
    res.json(books)
  } else {
    res.status(404)
    throw new Error('Books not found')
  }
})
// @description Fetch a book
// @route GET /api/books/:id
// @access public
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)
  if (book) {
    res.json(book)
  } else {
    res.status(404)
    throw new Error('Book not found')
  }
})

export { getBooks, getBookById }
