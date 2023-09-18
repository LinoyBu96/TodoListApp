import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 7000;
const activeStatus= "active"
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

var shoppingData = [{task: "task 1", note:"note 1"}, {task: "task 2", note:"note 2"}];

function get_active_data(isActive) {
  var home = "link-body-emphasis";
  var shopping = "link-body-emphasis";
  var study = "link-body-emphasis";
  var job = "link-body-emphasis";

  switch (isActive) {
    case 'home':
      home = activeStatus;
      break;
    case 'shopping':
      shopping = activeStatus;
      break;
    case 'study':
      study = activeStatus;
      break;
    case 'job':
      job = activeStatus;
      break;
    default:
      console.log(`Unexpected error.`);
  }
  
  return {homeStatus: home, 
    shoppingStatus: shopping,
    studyStatus: study,
    jobStatus: job};
  
  res.render(__dirname + "/views/index.ejs", data);
}

app.get("/", (req, res) => {
  const data = get_active_data("home");
  res.render("home.ejs", data);
});

app.get('/shopping', (req, res) => {
  console.log(shoppingData[0].task);
  const data = get_active_data("shopping");
  data.shoppingData = shoppingData;
  res.render("shopping.ejs", data);
});

app.get('/study', (req, res) => {
  const data = get_active_data("study");
  res.render("study.ejs", data);
});

app.get('/job', (req, res) => {
  const data = get_active_data("job");
  res.render("job.ejs", data);
});

app.post('/shopping', (req, res) => {
  const data = get_active_data("shopping");
  // var userTask = req.body["task"];
  // data.newTask = userTask;
  const newTask = {task: req.body["task"], note: req.body["note"]};
  shoppingData.push(newTask);
  data.shoppingData = shoppingData;
  res.render("shopping.ejs", data);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
