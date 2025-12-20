// features/auth/Login.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "./useLogin";
import { validateLogin } from "./validators";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const { mutate: login, isPending } = useLogin();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateLogin(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    login(form, {
      onError: (err) => setError(err),
    });
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className="auth-form">
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
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <Link to="/users/signup">Don’t have an account? Signup</Link>
    </div>
  );
}

export default Login;
