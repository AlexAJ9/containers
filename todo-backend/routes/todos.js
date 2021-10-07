const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { getAsync, setAsync } = require("../redis/index");
/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});
/* GET Statistics */
router.get("/statistics", async (_, res) => {
  const count = await getAsync("added_todos");
  console.log(count);
  res.send({
    added_todos: count,
  });
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  let counter = parseInt((await getAsync("added_todos")) ?? "0");

  setAsync("added_todos", counter + 1);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  if (req.todo) res.send(req.todo);
});

/* PUT todo. */
singleRouter.put("/:id", async (req, res) => {
  if (req.todo) {
    const updatedTodo = await Todo.findByIdAndUpdate(req.todo._id, req.body);
    res.send(updatedTodo);
  }
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
