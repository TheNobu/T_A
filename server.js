const express = require("express");
const server =  express();
const healthRouter = require("./routes/health");
const usersRouter = require("./routes/users");
const receitasRouter = require("./routes/receitas");
const logger = require("./middleware/logger");

server.use(express.json());
server.use(healthRouter.router);
server.use(usersRouter.router);
server.use(receitasRouter.router);
server.use(logger);


module.exports = {server};
