const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require('./API/users.cjs') 
const adminRoute = require('./API/admin-dashboard.cjs')

app.use(require("morgan")("dev"));
app.use(express.json());

app.use(require("./API/auth.cjs").router);
app.use("/users", userRoutes);
app.use("/admin", adminRoute);

app.use((req, res, next) => {
  next({ status: 404, message: "Endpoint not found." });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? "Sorry, something broke :(");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});