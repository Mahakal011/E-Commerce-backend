const User = require("../models/user");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;
const { generateToken } = require("../utils/JwtUtils");
const config = require('../config/config')

const createUser = async (user) => {
  try {
    if (!user.email || !user.password) {
      throw new Error("Email and password are required");
    }

    // if (user.password.length < 6) {
    //   throw new Error("Password must be at least 6 characters long");
    // }

    var existingUser = await User.findOne({ where: { mobile: user.mobile } });
    if (existingUser) {
      throw new Error("User with this mobile already exists");
    }

    existingUser = await User.findOne({ where: { email: user.email } });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    await User.create({ ...user, password: hashedPassword });
    console.log("User created successfully");
    return user;
  } catch (error) {
    console.error("Error creating User:", error);
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    // Find user by email
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Remove password before returning user object
    // delete user.password;
    

    // Example payload
    const payload = {
      id: user.id,
      email: user.email,
      role: "user",
    };

    // Generate token
    const token = generateToken(payload, config.JWT_SECRET);
    console.log("Generated Token:", token);
    return {
      "token": token,
      "user" :user
    };
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Authentication failed");
  }
};

const getUser = async (id) => {
  try {
    const user = await User.findByPk(parseInt(id));
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error fetching User:", error);
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const user = await User.findAll();
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error fetching User:", error);
    throw error;
  }
};

const updateUser = async (id, userData) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new error("User not found");
    }
    await user.update(userData);
    console.log("User updated successfully.");
    return user;
  } catch (error) {
    console.error("Error updating User:", error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
    console.log("User deleted successfully.");
  } catch (error) {
    console.error("Error deleting User:", error);
    throw error;
  }
};

module.exports = {
  createUser,
  loginUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
