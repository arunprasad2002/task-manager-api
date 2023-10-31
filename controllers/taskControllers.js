const TaskModel = require("../models/taskModel");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { createCustomError } = require("../errors/custom-error");
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await TaskModel.find({});
  res.send({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await TaskModel.create(req.body);
  res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const task = req.body;
  const updatedTask = await TaskModel.findOneAndUpdate(
    { _id: req.params.id },
    task,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({ task: updatedTask });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await TaskModel.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(
      createCustomError({ msg: `No task found with id: ${taskID}` }, 404)
    );
  }
  res.status(200).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await TaskModel.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task found with id: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
};
