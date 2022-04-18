import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Adilet Daniiarov',
    email: 'adilet@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Adi Dani',
    email: 'adidani@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
