const notFoundMiddleawre = (req, res) => {
  res.status(400).json("Route does not exist");
};

export default notFoundMiddleawre;
