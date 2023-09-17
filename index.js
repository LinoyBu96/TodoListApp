import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 7000;
const activeStatus= "active"
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

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
  res.render("index.ejs", data);
});

app.get('/shopping', (req, res) => {
  const data = get_active_data("shopping");
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
