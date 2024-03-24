import * as userService from "../services/user.service.js"

import AppError from "../utils/appError.js"
import { checkRequiredFields } from "../utils/tools.js"
import prisma from "@prisma/client";

// export const getAllUsers = async (req, res, next) => {
//   try {
//     const {
//       session: {
//         user: { id: currentUserId },
//       },
//     } = req
//
//     const users = await userService.findAll(req.query)
//     res.status(200).json(users)
//   } catch (error) {
//     next(error)
//   }
// }

// export const signInUser = async (req, res, next) => {
//   try {
//     const { email, password } = req.body
//
//     const missingFields = checkRequiredFields({ email, password }, [
//       "email",
//       "password",
//     ])
//
//     if (missingFields.length > 0) {
//       throw new AppError(
//         400,
//         "fail",
//         `${missingFields.join(", ")} are required`
//       )
//     }
//
//     const [user, token] = await userService.signIn(email, password)
//
//     res.status(200).json({
//       user,
//       token,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

export const createUser = async (req, res, next) => {
  const {
    name,
    email,
    password
  } = req.body

  const datas = {
    name,
    email,
    password
  }
  try {
    const missingFields = checkRequiredFields(datas, [
      "name",
      "email",
      "password",
    ])

    if (missingFields.length > 0) {
      throw new AppError(
        400,
        "fail",
        `${missingFields.join(", ")} are required`
      )
    }

    const user = await userService.createOne(datas)

    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}
