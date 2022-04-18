import express from 'express'
import asyncHandler from 'express-async-handler'
import Book from '../models/bookModel.js'

const router = express.Router()

// @description Fetch all books
// @route GET /api/books
// @access public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const books = await Book.find({})
    if (books) {
      res.json(books)
    } else {
      res.status(404).json({ message: 'No books in DB' })
    }
  })
)

// @description Fetch a book
// @route GET /api/books/:id
// @access public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)
    if (book) {
      res.json(book)
    } else {
      res.status(404).json({ message: 'Book not found' })
    }
  })
)

export default router
