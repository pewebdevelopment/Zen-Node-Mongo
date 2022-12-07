const errorHandler = (err, req, res, next) => {
  const statusCode = res.statuscode ? res.statuscode : 5000;
  res.status(statusCode);
};

module.exports = errorHandler;
