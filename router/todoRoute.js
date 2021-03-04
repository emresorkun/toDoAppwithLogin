const express = require("express");
const Todo = require("../model/todo");
const verifyUser=require("../middleware/verifyUser");


const router = express.Router();

router.get("/", verifyUser, async (req, res) => {
  //query string

  const sorted = +req.query.sorted || 1;
  const page = +req.query.page || 1;

  try {
    const totalData = await Todo.find().countDocuments();

    const dataToShowPerReq = 2;

    const totalDataPart = Math.ceil(totalData/dataToShowPerReq);

    //const totalDataPart = totalData / dataToShowPerReq;

    const dataToShow = dataToShowPerReq * page;

    const data = await Todo.find()
      .sort({ name: sorted })
      .limit(dataToShow);

    res.render("index.ejs", {
      data,
      totalData,
      totalDataPart,
      dataToShow,
      dataToShowPerReq,
      error: "empty",
    });
  } catch (err) {
    res.render("error.ejs", { error: err });
  }
});

//path.join(__dirname, scss)

router.post("/", verifyUser, async (req, res) => {
  console.log(req.body.name);

  try {
    await new Todo({
      name: req.body.name,
    }).save();
    res.redirect("/");
  } catch (err) {
    res.render("error.ejs", { error: err });
  }
});

router.get("/edit/:id", async (req, res) => {
  console.log(req.query);
  const todo = await Todo.findOne({ _id: req.params.id });
  console.log(todo);

  res.render("edit.ejs", { todo: todo });
  //console.log("editing content")
});

router.post("/edit", async (req, res) => {
  console.log(req.body);
  await Todo.updateOne(
    { _id: req.body.id },
    {
      name: req.body.name,
    }
  );

  res.redirect("/");
});

router.get("/delete/:id", async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id });
  res.redirect("/");
});

module.exports = router;
