const { cors } = require("./config");
const { TaskRepository } = require("./data-access-layer/task-management/task.repository");
const { createApplication } = require("./app");
const database = require("./data-access-layer/database");
const initializeDatabase = require("./data-access-layer/initialize-database");

initializeDatabase().then(() => {
  const [httpServer, ioHub] = createApplication(
      {
        taskRepository: new TaskRepository(database),
      },
      {
        cors
      }
  );

  process.on("SIGINT", function () {
    console.info("SIGINT shutdown", new Date().toISOString());
    shutdown();
  });

  process.on("SIGTERM", function () {
    console.info("SIGTERM shutdown", new Date().toISOString());
    shutdown();
  });

  function shutdown() {
    httpServer.close(function (err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      process.exit(0);
    });
    ioHub.disconnect();
  }
})
