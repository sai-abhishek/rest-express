import { model } from "mongoose";
import { StudentSchema } from "../models/studentModel";

const Student = model("Student", StudentSchema);

export const addNewStudent = async (req, res, next) => {
  try {
    const newStudent = Student(req.body);
    const student = await newStudent.save();
    res.send(student);
  } catch (error) {
    next(error);
  }
};

export const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find({});
    res.send(students);
  } catch (error) {
    next(error);
  }
};

export const getStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.studentId);
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
    res.send(student);
  } catch (error) {
    next(error);
  }
};

export const removeStudent = async (req, res, next) => {
  try {
    const response = await Student.remove({ _id: req.params.studentId });
    res.send(response);
  } catch (error) {
    next(error);
  }
};
