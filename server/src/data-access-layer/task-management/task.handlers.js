const { Errors, mapErrorDetails, sanitizeErrorMessage  } = require("../util");
const { v4: uuid } = require("uuid");
const Joi = require("joi");
const database = require("../database");

const idSchema = Joi.string().guid({
  version: "uuidv4",
});

const taskSchema = Joi.object({
  id: idSchema.alter({
    create: (schema) => schema.forbidden(),
    update: (schema) => schema.forbidden(),
  }),
  title: Joi.string().max(256).required(),
  description: Joi.string().max(256).required(),
  completed: Joi.boolean().required(),
  due_date: Joi.date().required(),
});

module.exports = function (components) {
  const { taskRepository } = components;

  return {
    createTask: async function (payload, callback) {
      const socket = this;

      const { error, value } = taskSchema
          .tailor("create")
          .validate(payload, {
            abortEarly: false,
            stripUnknown: true,
          });

      if (error) {
        return callback({
          error: Errors.INVALID_PAYLOAD,
          errorDetails: mapErrorDetails(error.details),
        });
      }

      value.id = uuid();

      try {
        await taskRepository.create(value);
      } catch (e) {
        return callback({
          error: sanitizeErrorMessage(e),
        });
      }

      callback({
        data: value.id,
      });

      socket.broadcast.emit("task:created", value);
    },

    readTask: async function (id, callback) {
      const { error } = idSchema.validate(id);

      if (error) {
        return callback({
          error: Errors.ENTITY_NOT_FOUND,
        });
      }

      try {
        const todo = await taskRepository.findById(id);
        callback({
          data: todo,
        });
      } catch (e) {
        callback({
          error: sanitizeErrorMessage(e),
        });
      }
    },

    updateTask: async function (payload, callback) {
      const socket = this;

      const { error, value } = taskSchema
          .tailor("update")
          .validate(payload, {
            abortEarly: false,
            stripUnknown: true,
          });

      if (error) {
        return callback({
          error: Errors.INVALID_PAYLOAD,
          errorDetails: mapErrorDetails(error.details),
        });
      }

      value.updated_at = database.fn.now();

      try {
        await taskRepository.update(value);
      } catch (e) {
        return callback({
          error: sanitizeErrorMessage(e),
        });
      }

      callback();
      socket.broadcast.emit("task:updated", value);
    },

    deleteTask: async function (id, callback) {
      const socket = this;

      const { error } = idSchema.validate(id);

      if (error) {
        return callback({
          error: Errors.ENTITY_NOT_FOUND,
        });
      }

      try {
        await taskRepository.deleteById(id);
      } catch (e) {
        return callback({
          error: sanitizeErrorMessage(e),
        });
      }

      callback();
      socket.broadcast.emit("task:deleted", id);
    },

    listTask: async function (callback) {
      try {
        callback({
          data: await taskRepository.findAll(),
        });
      } catch (e) {
        callback({
          error: sanitizeErrorMessage(e),
        });
      }
    },
  };
}
