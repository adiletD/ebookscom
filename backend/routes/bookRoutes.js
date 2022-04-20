import express from 'express'
import {
  getBooks,
  getBookById,
  deleteBook,
  createBook,
} from '../controllers/bookController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getBooks)
router.route('/:id').get(getBookById)
router.route('/createBook').post(protect, admin, createBook)
router.route('/deleteBook/:id').delete(protect, admin, deleteBook)

export default router
