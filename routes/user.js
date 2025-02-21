var express = require("express");
var router = express.Router();
const {
  createUser,
  loginUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../services/user");

router.post("/user", async function (req, res) {
  try {
    // Add validation
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    
    const user = await createUser(req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/user/login", async function (req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    if (error.message.includes("not found")) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
});

router.get("/user", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res,
      satus(500).json({
        message: "Error fetching users",
        error: error.message,
      });
  }
});

router.get("/user/:id", async function (req, res) {
  const user = await getUser(req.params.id);
  res.status(200).json(user);
});

router.get("/user/login", async function (req, res) {
  try {
    const user = await login(req.params.email, req.params.password);
    res.status(200).json(user);
  } catch (error) {
    if (error.message.includes("not found")) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

router.put("/user/:id", async function (req, res) {
  const user = await updateUser(req.params.id, req.body);
  res.status(200).send("User updated successfully.");
});

router.delete("/user/:id", async function (req, res) {
  try {
    const result = await deleteUser(req.params.id);
    res.status(201).json({ message: "User deleted successfully" });
  } catch (error) {
    if (error.message.includes("not found")) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
