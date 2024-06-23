import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const Navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const logout = () => {
    localStorage.clear();
    Navigate("/singup");
  };

  return (
    <div>
      <nav className=" navbar navbar-expand-lg bg-body-tertiary mr-5">
        <div className="container-fluid">
          <Link className="navbar-brand">E-Dask</Link>

          <div className=" collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {auth ? (
                <>
                  <Link to={"/"} className="nav-link active">
                    Products
                  </Link>
                  <Link to={"/add-product"} className=" nav-link">
                    Add Product
                  </Link>
                  <Link to={"/update/:id"} className="nav-link">
                    Update Product
                  </Link>
                  <Link to={"/profile"} className="nav-link">
                    Profile
                  </Link>
                  <Link to={"/singup"} onClick={logout} className="nav-link">
                    Logout ({JSON.parse(auth).name})
                  </Link>
                </>
              ) : (
                <div className="nav-right1">
                  <Link to={"/singup"} className="nav-link">
                    Sing-Up
                  </Link>
                  <Link to={"/login"} className="nav-link">
                    Log-in
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
