import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @description Auth the user
// @route POST /api/users/login
// @access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  //   console.log(user.matchPassword(password))
  //   res.json(user)
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @description Register a new user
// @route POST /api/users/login
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User exists already')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ebookscom@fastmail.com',
        pass: 'ebookscomebookscom',
      },
    })

    var mailOptions = {
      from: 'ebookscom@fastmail.com',
      to: email,
      subject: 'WELCOME to EBOOKS!!!@POLYU',
      text:
        'Hi dear friend!! Our team welcomes you to EBOOKS.COM, the best online bookstore ever made by humankind!',
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  } else {
    res.status(400)
    throw new Error('User not found')
  }
})

// @description Register a new user
// @route POST /api/users/login
// @access public
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @description Update a user
// @route PUT /api/users/login
// @access public
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { authUser, getUserProfile, registerUser, updateUserProfile }
