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

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)

  if (book) {
    await book.remove()
    res.json({ message: 'Book removed' })
  } else {
    res.status(404)
    throw new Error('Book not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createBook = asyncHandler(async (req, res) => {
  const { name, price, description, image, genre, countInStock } = req.body

  // const product = new Book({
  //   name: 'Sample name',
  //   price: 0,
  //   user: req.user._id,
  //   image: '/images/sample.jpg',
  //   brand: 'Sample brand',
  //   category: 'Sample category',
  //   countInStock: 0,
  //   numReviews: 0,
  //   description: 'Sample description',
  // })

  const book = new Book({
    name: name,
    price: price,
    user: req.user._id,
    description: description,
    image: image,
    genre: genre,
    countInStock: countInStock,
    description: description,
  })

  const createdBook = await book.save()

  res.status(201).json(createdBook)
})

export { getBooks, getBookById, deleteBook, createBook }
