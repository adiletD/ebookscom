import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
    paidAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

orderSchema.pre('save', async function (next) {
  let totalOrderPrice = 0
  this.orderItems.map((orderItem) => {
    totalOrderPrice += orderItem.qty * orderItem.price
  })

  totalOrderPrice = totalOrderPrice.toFixed(2)
  this.totalPrice = totalOrderPrice
})

const Order = mongoose.model('Order', orderSchema)

export default Order
