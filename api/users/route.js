import express from "express";
const router = express.Router();

// Define your user routes
router.get("/", (req, res) => {
  // Your user route logic
  res.send("Users Route Complete");
});

export default router;
