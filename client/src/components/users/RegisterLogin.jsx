import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import signup from "../../images/signup.jpg";
import login from "../../images/login.avif";

export function Signup() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setError("");
    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Signup failed");
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-1">
      <div className="row shadow-lg rounded">
        <div className="col-md-8 d-none d-md-block">
          <img src={signup} alt="Signup" className="img-fluid rounded-start h-100 w-100 object-fit-cover" />
        </div>
        
        <div className="col-md-4 p-5 border border-primary border-bold">
          <h2 className="text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="mb-2">
              <label className="form-label">Username</label>
              <input {...register("username", { required: "Username is required" })} 
                type="text" className={`form-control ${errors.username ? "is-invalid" : ""}`} />
              {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
            </div>

            <div className="mb-2">
              <label className="form-label">First Name</label>
              <input {...register("firstName", { required: "First Name is required" })} 
                type="text" className={`form-control ${errors.firstName ? "is-invalid" : ""}`} />
              {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
            </div>

            <div className="mb-2">
              <label className="form-label">Last Name</label>
              <input {...register("lastName", { required: "Last Name is required" })} 
                type="text" className={`form-control ${errors.lastName ? "is-invalid" : ""}`} />
              {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
            </div>

            <div className="mb-2">
              <label className="form-label">Email</label>
              <input {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })} 
                type="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            <div className="mb-2">
              <label className="form-label">Password</label>
              <input {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })} 
                type="password" className={`form-control ${errors.password ? "is-invalid" : ""}`} />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>

            <div className="mb-2">
              <label className="form-label">Confirm Password</label>
              <input {...register("confirmPassword", { required: "Confirm Password is required", validate: value => value === watch("password") || "Passwords do not match" })} 
                type="password" className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`} />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            <p className="text-center mt-3">
            Already have an account?<br/> <Link to="/login">Log in here</Link>
          </p>
            {error && <div className="text-danger mt-2">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}


export function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    setError("");
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Login failed");
      localStorage.setItem("token", result.token);
      localStorage.setItem("userId", result.id);
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row align-items-center">
        {/* Lijeva strana - Slika */}
        <div className="col-md-8 d-none d-md-block">
          <img src={login} alt="Login" className="img-fluid rounded shadow" />
        </div>

        {/* Desna strana - Forma */}
        <div className="col-md-4">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="shadow p-4 rounded border">
            <div className="mb-2">
              <label htmlFor="email" className="form-label">Email</label>
              <input {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })} 
                type="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} 
                id="email" placeholder="Enter your email" />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="form-label">Password</label>
              <input {...register("password", { required: "Password is required" })} 
                type="password" className={`form-control ${errors.password ? "is-invalid" : ""}`} 
                id="password" placeholder="Enter your password" />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100">Login</button>
            <p className="text-center mt-3">
  Don't have an account?<br/> <Link to="/signup">Sign up here</Link>
</p>

            {error && <div className="text-danger mt-2">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
