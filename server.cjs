const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const { Server } = require("socket.io");
const calendarRoutes = require('./API/calendar.cjs');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


app.use(require("./API/auth.cjs").router);
app.use("/users", require('./API/users.cjs'));
app.use("/admin", require('./API/admin-dashboard.cjs'));
app.use("/labs", require('./API/labs.cjs'));
app.use("/change-password", require('./API/change-password.cjs'));
app.use('/api/calendar', calendarRoutes);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("new message sent", (msg) => {
    console.log("Broadcasting message:", msg);
    io.emit("new message to relay", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use((req, res, next) => {
  next({ status: 404, message: "Endpoint not found." });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500).json(err.message ?? "Sorry, something broke :(");
});


server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
