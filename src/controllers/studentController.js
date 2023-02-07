import { model } from "mongoose";
import logger from "../lib/logger";
import { StudentSchema } from "../models/studentModel";

const Student = model("Student", StudentSchema);

export const addNewStudent = async (req, res, next) => {
  try {
    const newStudent = Student(req.body);
    const student = await newStudent.save();
    logger.info("/POST request - new student added", { student });
    res.send(student);
  } catch (error) {
    next(error);
  }
};

export const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find({});
    logger.info("/GET request - fetched students", { students });
    res.send(students);
  } catch (error) {
    next(error);
  }
};

export const getStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.studentId);
    logger.info("/GET request - fetched student by ID", { student });
    res.send(student);
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findOneAndUpdate(
      { _id: req.params.studentId },
      req.body,
      { new: true }
    );
    logger.info("/PUT request - student detail updated", { student });
    res.send(student);
  } catch (error) {
    next(error);
  }
};

export const removeStudent = async (req, res, next) => {
  try {
    const response = await Student.remove({ _id: req.params.studentId });
    logger.info("/DELETE request - student removed", { response });
    res.send(response);
  } catch (error) {
    next(error);
  }
};
