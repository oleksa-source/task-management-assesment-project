
const Errors = {
  ENTITY_NOT_FOUND : "entity not found",
  INVALID_PAYLOAD : "invalid payload",
}

const errorValues = Object.values(Errors);

function sanitizeErrorMessage(message) {
  if (typeof message === "string" && errorValues.includes(message)) {
    return message;
  } else {
    return "an unknown error has occurred";
  }
}

function mapErrorDetails(details) {
  return details.map((item) => ({
    message: item.message,
    path: item.path,
    type: item.type,
  }));
}

function dateTimeToSQL(dateTime) {
  return new Date(dateTime).toISOString().slice(0, 19).replace('T', ' ')
}

module.exports = {
  mapErrorDetails,
  sanitizeErrorMessage,
  Errors,
  errorValues,
  dateTimeToSQL
}