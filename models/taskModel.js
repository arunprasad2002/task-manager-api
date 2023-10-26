const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
    maxLength: [20, "Name should not be more that 20 characters"],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;
