exports.getResponse = (
  status,
  message,
  data = null,
  ) => {
    const response = {
        status,
        data,
    };

    if (message !== null) {
      response.message = message;
    }

    return response;
};
