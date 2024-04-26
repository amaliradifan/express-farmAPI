const notFound = (req, res) => {
  res.status(404).json({
    message: 'url Not found',
  });
};

module.exports = notFound;
