import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { universalurl } from "../Utils/helper";
import Swal from "sweetalert2";

function SignIn() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${universalurl}api/loginuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    if (!json.success) {
      alert("Enter valid credentials");
    }

    if (json.success) {
      Swal.fire({
        title: "SignIn Succesfully!",
      
        icon: "success",
      });
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authtoken", json.authtoken);

      navigate("/home");
    }
  };

  return (
    <div className="singCont">
      <h3>Welcome to Activity tracker</h3>
      <p>Use your Sign In credentials</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your Email"
          name="email"
          id="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          id="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
