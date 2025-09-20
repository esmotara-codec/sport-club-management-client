
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import loginAnimation from './../../../../../public/Animation - 1734782439866.json';
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import useAxiosPublic from "../../../hook/axiosPublic";
import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const { loginWithPassword , signInWithGoogle} = useContext(AuthContext);
  const axiosPublic= useAxiosPublic();
  const location = useLocation();
  console.log(location);

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // Call the login function from AuthContext
    loginWithPassword(email, password)
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle Google Sign In
  const handleGoogleSignIn = () => {
    signInWithGoogle(provider)
      .then((result) => {
        console.log("google sign in : ", result.user);
       

        const userProfile = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
          role: "user",
          loginCount: 1,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        };

        //save profile info in the db
        axiosPublic.post("/add-user", userProfile).then((res) => {
          if (res.insertedId) {
            console.log("After google data added to db", res);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Sign Up successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(location?.state || "/");
          }
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Google Sign In Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="flex justify-center items-center  min-h-screen bg-primary p-4">
      <div className="flex flex-col lg:flex-row  gap-4 sm:gap-8 lg:gap-16 w-full max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12">
          <form onSubmit={handleLogin}>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-4 sm:mb-6">
              Login here
            </h2>
            <div className="mb-3 sm:mb-4">
              <label
                htmlFor="email"
                className="block text-gray-800 font-semibold mb-2 text-sm sm:text-base"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-3 sm:px-4 py-2 border border-gray-400 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                required
              />
            </div>
            <div className="mb-4 sm:mb-6">
              <label
                htmlFor="password"
                className="block text-gray-800 font-semibold mb-2 text-sm sm:text-base"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-3 sm:px-4 py-2 border border-gray-400 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn w-full px-4 sm:px-6 py-2 sm:py-3 text-white bg-primary border border-blue-500 rounded-lg font-semibold transition duration-300 hover:bg-primary-hover text-sm sm:text-base"
              >
                Sign in
              </button>
            </div>
          </form>
          {/* Google Sign In */}
          <div className="mt-4 sm:mt-6 text-center">
            <button
              onClick={handleGoogleSignIn}
              className="btn w-full px-3 sm:px-4 py-2 bg-gray-300 text-gray-800 hover:bg-gray-700 hover:text-white rounded-md transition duration-300 text-sm sm:text-base"
            >
              Login with Google
            </button>
          </div>

          <div className="text-center mt-3 sm:mt-4">
            <span className="text-gray-700 text-sm sm:text-base">Not registered yet? </span>
            <span
              className="text-primary hover:text-blue-700 cursor-pointer text-sm sm:text-base font-medium"
              onClick={() => navigate("/sign-up")}
            >
              Sign Up
            </span>
          </div>
        </div>
        <div className="w-full lg:w-1/2 bg-red-50 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 min-h-64 lg:min-h-0">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
            <Lottie animationData={loginAnimation} loop={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;