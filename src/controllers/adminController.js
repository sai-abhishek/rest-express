import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AdminSchema } from "../models/adminModel";
import path from "path";
import { readFile } from "fs/promises";

const Admin = new mongoose.model("Admin", AdminSchema);

export const loginRequired = (req, res, next) => {
  if (req.admin) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized User" });
  }
};

export const register = async (req, res, next) => {
  const newAdmin = new Admin(req.body);
  try {
    newAdmin.hashPassword = await bcrypt.hash(req.body.password, 10);
  } catch (error) {
    next(error);
  }
  try {
    const admin = await newAdmin.save();
    admin.hashPassword = undefined;
    return res.json(admin);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      res.status(401).json({
        message: "Authentication failed. Couldn't find this account",
      });
    } else {
      if (
        !(await admin.comparePassword(req.body.password, admin.hashPassword))
      ) {
        res.status(401).json({
          message: "Authentication failed. Wrong password",
        });
      } else {
        const privateKey = await readFile(
          path.resolve(__dirname, "..", "..", "private.key")
        );
        res.json({
          token: jwt.sign(
            {
              email: admin.email,
              username: admin.username,
              _id: admin.id,
            },
            privateKey
          ),
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export const parseJWT = async (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    const privateKey = await readFile(
      path.resolve(__dirname, "..", "..", "private.key")
    );
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      privateKey,
      (error, decode) => {
        if (error) {
          req.admin = undefined;
        } else {
          req.admin = decode;
        }
        next();
      }
    );
  } else {
    req.admin = undefined;
    next();
  }
};
