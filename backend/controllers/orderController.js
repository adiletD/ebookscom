import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

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
