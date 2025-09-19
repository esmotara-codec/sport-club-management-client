import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const { createUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Create axios instance directly in component
  const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000', // Replace with your backend URL
  });
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, ...rest } = Object.fromEntries(formData.entries());

    // Password validation
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.",
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Create User with Firebase
      console.log("Creating user with Firebase...");
      const result = await createUser(email, password);
      console.log("Firebase user created:", result.user);


      const userProfile = {
        email,
        ...rest,
        role: "user",
        
        creationTime: result.user?.metadata?.creationTime,
        lastSignInTime: result.user?.metadata?.lastSignInTime
      };

      console.log("User profile to save:", userProfile);

      // Save profile info in the db
      console.log("Saving to database...");
      const res = await axiosPublic.post('/add-user', userProfile);
      console.log("Database response:", res);
      console.log("Database response data:", res.data);
      
      // Check for successful insertion or existing user
      if (res.data.insertedId) {
        console.log('User successfully processed in database');
        setIsLoading(false);
        
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your account has been created successfully",
            showConfirmButton: false,
            timer: 1500
        });
        navigate("/login");

      } else if (res.data.msg === "user already exist") {
        console.log('User successfully processed in database');
        setIsLoading(false);
        
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Account already exists",
          text: "Please login with your existing account",
          showConfirmButton: true,
          confirmButtonText: "Go to Login"
        });
        navigate("/login");
      }
      else {
        throw new Error("Unexpected response from server");
      }
      
    } catch (error) {
      console.error("Full error object:", error);
      console.error("Error message:", error.message);
      console.error("Error response:", error.response);
      
      setIsLoading(false);
      
      let title = "Signup Failed";
      let text = "An error occurred during signup. Please try again.";

      if (error.code === 'auth/email-already-in-use') {
        title = "Account already exists";
        text = "Please login with your existing account";
      }

      Swal.fire({
        position: "center",
        icon: "error",
        title: title,
        text: text,
        showConfirmButton: true,
        confirmButtonText: "OK"
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <h1 className="text-xl sm:text-2xl font-bold text-primary mb-4 text-center">
            Registration Form
          </h1>

          <div className="">
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full mt-2 px-4 py-2 border border-gray-400 bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Address Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full mt-2 px-4 py-2 border border-gray-400 bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email address"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  className="w-full mt-2 px-4 py-2 border border-gray-400 bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-4 text-primary"
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-black mb-4">
            By creating an account you agree to our{" "}
            <Link to="#" className="text-cyan-600">
              Terms & Conditions
            </Link>
          </p>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="btn w-full my-2 bg-primary text-white py-2 rounded hover:bg-primary-hover border border-cyan-500 disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <span className="text-gray-700">Already have an account? </span>
          <span
            className="text-primary hover:text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;