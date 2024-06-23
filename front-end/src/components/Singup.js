import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "../App.css";
function Singup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const collectbtnData = async () => {
    console.warn(name, email, password);
    let result1 = await fetch("http://localhost:8000/singup", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result1 = await result1.json();
    console.warn(result1);
    localStorage.setItem("user", JSON.stringify(result1.result));
    localStorage.setItem("token", JSON.stringify(result1.auth));
    if (result1) {
      navigate("/");
    }
  };

  return (
    <div className=" mt-5">
      <form className="d-flex align-items-center flex-column">
        <div className="mb-3  ">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control input "
            id="exampleInputEmail11"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail0" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control input"
            id="exampleInputEmail2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label input">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="exampleInputPassword3"
          />
        </div>

        <button
          type="button"
          onClick={collectbtnData}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Singup;
