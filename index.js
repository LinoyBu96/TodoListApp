import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 7000;
const activeStatus= "active"
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


var homeData = [{task: "task 1", note:"note 1", checked: ""}, {task: "task 2", note:"note 2", checked: "checked"}];
var shoppingData = [{task: "task 3", note:"note 3", checked: ""}, {task: "task 4", note:"note 4", checked: "checked"}];
var studyData = [{task: "task 5", note:"note 5", checked: ""}, {task: "task 6", note:"note 6", checked: "checked"}];
var jobData = [{task: "task 7", note:"note 7", checked: ""}, {task: "task 8", note:"note 8", checked: "checked"}];


function getData(taskType) {
  var home = "link-body-emphasis";
  var shopping = "link-body-emphasis";
  var study = "link-body-emphasis";
  var job = "link-body-emphasis";
  var data = homeData;

  switch (taskType) {
    case 'home':
      home = activeStatus;
      break;
    case 'shopping':
      shopping = activeStatus;
      data = shoppingData;
      break;
    case 'study':
      study = activeStatus;
      data = studyData;
      break;
    case 'job':
      job = activeStatus;
      data = jobData;
      break;
    default:
      console.log(`Unexpected error.`);
  }
  return {tasksData: data,
    homeStatus: home, 
    shoppingStatus: shopping,
    studyStatus: study,
    jobStatus: job};
}


function getRequestHandler(taskType, res) {
  const data = getData(taskType);
  if (taskType === "home") {
    taskType = "";
  }
  data.taskType = taskType;
  res.render("index" + ".ejs", data);
}

function postRequestHandler(taskType, req, res, data) {
  if (req.body["number"]) {
    const i = req.body["number"];
    const oldVal = data[i]["checked"];
    var newVal = "";
    if (oldVal == "") {
      newVal = "checked"
    }
    data[i]["checked"] = newVal;
  } else {
    const newTask = {task: req.body["task"], note: req.body["note"], checked: ""};
    data.push(newTask);
  }
  getRequestHandler(taskType, res);
}

app.get("/", (req, res) => {
  getRequestHandler("home", res);
});

app.get('/shopping', (req, res) => {
  getRequestHandler("shopping", res);
});

app.get('/study', (req, res) => {
  getRequestHandler("study", res);
});

app.get('/job', (req, res) => {
  getRequestHandler("job", res);
});

app.post('/', (req, res) => {
  console.log("post-home");
  postRequestHandler("home", req, res, homeData)
});

app.post('/shopping', (req, res) => {
  console.log("post-shopping");
  postRequestHandler("shopping", req, res, shoppingData)
});

app.post('/study', (req, res) => {
  console.log("post-study");
  postRequestHandler("study", req, res, studyData)
});

app.post('/job', (req, res) => {
  console.log("post-job");
  postRequestHandler("job", req, res, jobData)
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});