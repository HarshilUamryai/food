import { useState, } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [cd, setCd] = useState({ Email: "", Password: "" });
  let nav = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();




    const response = await fetch("http://localhost:5000/api/Login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Email: cd.Email,
        Password: cd.Password

      })
    });


    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Registration not successful");
    }
    if (json.success) {
      localStorage.setItem("Email",json.cd.Email);
      localStorage.setItem("auto",json.auto);
      console.log( localStorage.getItem("auto"))
      nav("/");
     
    }
  };

  const onChange = (event) => {
    setCd({ ...cd, [event.target.name]: event.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <section className="vh-100 bg-image" style={{ backgroundImage: "url('https://d3l9a8mvoa6cl8.cloudfront.net/wp-content/uploads/sites/3/2020/04/03173944/online-food-delivery-industry-min.jpg')" }}>
          <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div className="card" style={{ borderRadius: "15px" }}>
                    <div className="card-body p-5">
                      <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                      <div data-mdb-input-init className="Email">
                        <label className="form-label" htmlFor="form3Example3cg">Email</label>
                        <input type="email" id="form3Example3cg" className="form-control form-control-lg" name='Email' value={cd.Email} onChange={onChange} />
                      </div>

                      <div data-mdb-input-init className="Password">
                        <label className="form-label" htmlFor="form3Example4cg">Password</label>
                        <input type="password" id="form3Example4cg" className="form-control form-control-lg" name='Password' value={cd.Password} onChange={onChange} />
                      </div>


                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"> Login</button>

                      </div>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  )
}
