const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());

app.use(bodyParser.json());

const taskController = require("./controllers/task");

app.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "Welcome to the API" });
});

app.get("/getTaskList", taskController.getTasks);
app.post("/addTask", taskController.addTask);
app.put("/todo/:id/update", taskController.updateTask);
app.delete("/todo/:id/delete", taskController.deleteTask);
app.delete("/deleteAllChecked", taskController.deleteAllCheckedTask);
app.delete("/deleteAllActive", taskController.deleteAllActiveTask);

app.use((req, res) => {
  res.status(404).json({ status: "error", message: "404 Not Found" });
});

app.listen(9000, () => {
  console.log("Server started on port 9000");
});
