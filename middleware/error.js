export default function error(err, req, res, next) {
  if (err.status) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }

  res.status(500).json({
    status: err.statusCode,
    message: err.message,
  });
}
