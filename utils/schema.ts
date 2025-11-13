import * as yup from "yup"
import z from 'zod';

export const userSchema = yup.object({
  username: yup
    .string()
    .required("username is required"),
  password: yup
    .string()
    // .min(6, "password must be at least 6 characters")
    .required("password is required"),
}).required();

export const movieSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "movie title is required" })
    .min(3, { message: "movie title min must be 2" }),
  director: z
    .object({
      name: z
        .string()
        .nonempty({ message: "director name is required" })
        .min(3, { message: "director name min must be 2" }),
      phoneNo: z
        .string()
        .nonempty({ message: "director phoneNo is required" })
        .min(3, { message: "director phoneNo min must be 2" }),
    }),
  year: z
    .coerce
    .number<number>()
    .refine((val) => val !== 0, {
      message: "year is required",
    })
    .positive({ message: "year must be positive number" })
    .int({ message: "year must be an integer" })
    .min(1800, { message: "year must be at least 1800" })
  // .max(new Date().getFullYear() + 5, { message: "year is too far in the future" }),
});

export const reviewSchema = z.object({
  review: z
    .string()
    .nonempty({ message: "review is required" })
    .min(4, { message: "review min must be 2" }),
});
