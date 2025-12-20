// features/auth/Signup.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "./useSignup";
import { validateSignup } from "./validators";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const { mutate: signup, isPending } = useSignup();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateSignup(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    signup(form, {
      onError: (err) => setError(err),
    });
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={isPending}>
          {isPending ? "Signing up..." : "Signup"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <Link to="/users/login">Already have an account? Login</Link>
    </div>
  );
}

export default Signup;
