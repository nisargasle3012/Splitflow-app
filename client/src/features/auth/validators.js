// features/auth/validators.js
export const validateSignup = ({ name, email, password }) => {
  if (!name || !email || !password) {
    return "All fields are required";
  }

  if (!email.includes("@")) {
    return "Invalid email address";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return null;
};

// features/auth/validators.js
export const validateLogin = ({ email, password }) => {
  if (!email || !password) {
    return "Email and password are required";
  }

  if (!email.includes("@")) {
    return "Invalid email address";
  }

  return null;
};

