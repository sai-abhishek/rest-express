import { loginRequired } from "../controllers/adminController";
import {
  addNewStudent,
  getStudent,
  getStudents,
  removeStudent,
  updateStudent,
} from "../controllers/studentController";
import { Router } from "express";

const studentRouter = Router();

studentRouter.use(loginRequired);
studentRouter.route("/").get(getStudents).post(addNewStudent);
studentRouter
  .route("/:studentId")
  .get(getStudent)
  .put(updateStudent)
  .delete(removeStudent);

export default studentRouter;
