import express from 'express'
import { getBooks, getBookById } from '../controllers/bookController.js'

const router = express.Router()

// @description Fetch all books
// @route GET /api/books
// @access public
router.route('/').get(getBooks)
router.route('/:id').get(getBookById)

// @description Fetch a book
// @route GET /api/books/:id
// @access public

export default router
