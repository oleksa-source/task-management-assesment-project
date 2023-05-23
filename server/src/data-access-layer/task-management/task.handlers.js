
module.exports = function (components) {
  const { taskRepository } = components;

  return {
    createTask: async function (payload, callback) {
      throw new Error('Not implemented error');
    },

    readTask: async function (id, callback) {
      throw new Error('Not implemented error');
    },

    updateTask: async function (payload, callback) {
      throw new Error('Not implemented error');
    },

    deleteTask: async function (id, callback) {
      throw new Error('Not implemented error');
    },

    listTask: async function (callback) {
      throw new Error('Not implemented error');
    },
  };
}
