const path = require("path");
var express = require("express");
const morgan = require("morgan");
var app = express();
const port = 3000;
const id = 10;

//Tạo đường dẫn tĩnh
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Tạo lại request sau mỗi lẫn mình chỉnh sửa đường dẫn <=> golive
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
