const express = require("express");

const app = express();

require("dotenv").config();
require("./app/routes/skynews.route")(app);
require("./app/routes/arynews.route")(app);
require("./app/routes/geonews.route")(app);
require("./app/routes/thenews.route")(app);
require("./app/routes/dawnnews.route")(app);

const PORT = process.env.port || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
