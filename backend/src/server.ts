import app from "./app";
import config from "./config";
import server from "./ws";

const port = config.PORT || 3000;
const redisPort = config.Redis_local_port || 8080

server.listen(redisPort,()=>{
  console.log(`chat server is runnig on port ${redisPort}`)
})

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}/api/v1`);
});