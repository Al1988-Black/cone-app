const express = require("express");
const router = express.Router({ mergeParams: true });

function createVerticesConeArray(r, h, n) {
  const verticeArray = [];
  const radialSegment = Math.floor(n);
  for (let i = 0; i < radialSegment; i += 1) {
    const xi = r * Math.cos(2 * (i / n) * Math.PI),
      yi = r * Math.sin(2 * (i / n) * Math.PI),
      xi1 = r * Math.cos(((2 * (i + 1)) / n) * Math.PI),
      yi1 = r * Math.sin(((2 * (i + 1)) / n) * Math.PI);
    verticeArray.push(
      [xi, yi, 0, xi1, yi1, 0, 0, 0, h],
      [xi, yi, 0, xi1, yi1, 0, 0, 0, 0]
    );
  }
  return verticeArray;
}

router.post("/", (req, res) => {
  try {
    const { r, h, n } = req.body;
    const newConeGeometry = createVerticesConeArray(r, h, n);
    res.status(201).send(newConeGeometry);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
module.exports = router;
