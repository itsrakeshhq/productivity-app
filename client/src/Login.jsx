import React from "react";

import "./Login.css";

const Login = () => {
  /**
   * When the user submits the form, prevent the default action, grab the email and password from the
   * form, send a POST request to the backend with the email and password, and if the response is
   * successful, store the token in local storage and reload the page.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target;

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      }
    );

    const data = await response.json();
    localStorage.setItem("token", data.token);
    window.location.reload();
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <span>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </span>
        <span>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </span>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
