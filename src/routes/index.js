import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "router 연결됨" });
});

export { router };
