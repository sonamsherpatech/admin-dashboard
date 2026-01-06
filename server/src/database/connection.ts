import { Sequelize } from "sequelize-typescript";
import envConfig from "../config/config";

const sequelize = new Sequelize({
  database: envConfig.databaseName,
  username: envConfig.databaseUsername,
  password: envConfig.databasePassword,
  host: envConfig.databaseHost,
  dialect: "mysql",
  port: Number(envConfig.databasePort),
  models: [__dirname + "/model"],
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Authentication, Connection");
  })
  .catch((error) => {
    console.log(error);
  });

export default sequelize;
