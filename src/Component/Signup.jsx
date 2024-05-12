import React, { useState } from "react";
import { universalurl } from "../Utils/helper";
import Swal from "sweetalert2";

function Signup() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    image: null, 
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === "image") {
      setCredentials((prevCredentials) => ({
        ...prevCredentials,
        image: files[0],
      }));
    } else {
      setCredentials((prevCredentials) => ({
        ...prevCredentials,
        [name]: value,
      }));
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append("email", credentials.email);
      formData.append("password", credentials.password);
      formData.append("name", credentials.name);
      formData.append("image", credentials.image);
      
      const response = await fetch(`${universalurl}api/createuser`, {
        method: "POST",
        body: formData,
      });
  
      const json = await response.json();
  
      if (!json.success) {
        throw new Error("Signup failed. Please check your details and try again.");
      } else {
        Swal.fire({
          title: "SignUp Successfully!",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: error.message,
        icon: "error",
        text: "try login without image!",
      });
    }
  };
  
  return (
    <div className="singCont">
      <h3>Welcome to Activity tracker</h3>
      <p>Use your Signup credentials</p>

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
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          id="name"
          value={credentials.name}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleChange}
          accept="image/*"
         
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
