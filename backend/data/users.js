import bcrypt from "bcryptjs"

const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "mike hell",
    email: "mike@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "john wick",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
]

export default users
