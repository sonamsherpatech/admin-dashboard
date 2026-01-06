import app from "./src/app";
import envConfig from "./src/config/config";
import "./src/database/connection";

const port = envConfig.portNumber;

function startServer() {
  app.listen(port, () => {
    console.log(`The app is listening to the port ${port}`);
  });
}
startServer();
