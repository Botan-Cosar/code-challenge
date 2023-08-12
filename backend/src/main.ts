import { createServer } from "node:http";
import {router} from "./router/router.js";

createServer(router).listen(8126, () => {
  console.log("Listening on http://localhost:8126");
});
