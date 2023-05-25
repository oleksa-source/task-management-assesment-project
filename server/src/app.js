const expressApp = require("./server");
const { Server } = require("socket.io");
const createTodoHandlers = require("./data-access-layer/task-management/task.handlers");
const { port } = require("./config");

function createApplication(
    components,
    serverOptions = {}
) {
    const httpServer = expressApp.listen(port, function() {
        console.log("Webserver is ready");
    });

    const ioHub = new Server(httpServer, serverOptions);

    const {
        createTask,
        readTask,
        updateTask,
        deleteTask,
        listTask,
    } = createTodoHandlers(components);

    ioHub.on("connection", (socket) => {
        socket.on("task:create", createTask);
        socket.on("task:read", readTask);
        socket.on("task:update", updateTask);
        socket.on("task:delete", deleteTask);
        socket.on("task:list", listTask);
    });

    return [httpServer, ioHub];
}

module.exports = {
    createApplication
};
