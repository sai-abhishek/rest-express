import bunyan from "bunyan";
import path from "path";
import Mask from "./mask";
const level = "info";

const logger = bunyan.createLogger({
  name: "rogers",
  streams: [
    {
      level,
      path: path.resolve(__dirname, "..", "..", "logs", "student-app-log.json"),
    },
  ],
});

export default new Mask(logger);
