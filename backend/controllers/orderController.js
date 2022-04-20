import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Book from '../models/bookModel.js'

// @description create an order
// @route POST /api/books
// @access private

const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, totalPrice } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      totalPrice,
    })

    const createdOrder = await order.save()

    // createdOrder.orderItems.map(async (orderItem) => {
    //   const book = await Book.findById(orderItem.book)
    //   if (book) {
    //     if (book.countInstock < orderItem.qty) {
    //       res.status(400)
    //       res.send(`Not enough stock for book with ID: ${book._id}`)
    //       throw new Error(`Not enough stock for book with ID: ${book._id}`)
    //       return
    //     } else {
    //       book.countInstock -= orderItem.qty
    //     }
    //   } else {
    //     res.status(400)
    //     throw new Error(`Not such book`)
    //   }
    //   const updatedBook = await book.save()
    // })

    res.status(201).json(createdOrder)
  }
})

// const getOrderById = asyncHandler(async (req, res) => {
//     const { orderItems, itemsPrice, totalPrice } = req.body

//     if (orderItems && orderItems.length === 0) {
//       res.status(400)
//       throw new Error('No order items')
//       return
//     } else {
//       const order = new Order({
//         orderItems,
//         user: req.user._id,
//         itemsPrice,
//         totalPrice,
//       })

//       const createdOrder = await order.save()

//       res.status(201).json(createdOrder)
//     }
//   })

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })

  res.json(orders)
})

export { addOrderItems, getMyOrders }
