import { useContext, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../../Context/AuthContext";


function SignUp() {
  const navigate = useNavigate();
  const { createUser} = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
    
  const handleSubmit = (e) => {
    e.preventDefault();
    // const email = e.target.email.value;
    // const password = e.target.password.value;
    // console.log(email, password);
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, ...rest } = Object.fromEntries(formData.entries());
    // const email = formData.get('email');
    // const password = formData.get('password');


    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (passwordRegex.test(password) === false) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.",
        showConfirmButton: true,
        confirmButtonText: "OK",

      });
      return;
    }


    //Create User
    createUser(email, password)
      .then(result => {
        console.log(result.user);

        const userProfile = {
          email,
          ...rest,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime
        }
        console.log(email, password, userProfile);

        //save profile info in the db
        fetch('', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(userProfile)
        })
          .then(res => res.json())
          .then(data => {
            if (data.insertedId) {
              console.log('After data added to db');
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your account has been created successfully",
                showConfirmButton: false,
                timer: 1500
              });
              navigate("/login");
            }
          })
      })
      .catch(error => {
        console.log(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Signup Failed",
          text: error.message,
        });
      });

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
                name="name"
                required
                className="w-full mt-2 px-4 py-2 border border-gray-400 bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-primtext-primary"
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
                className="w-full mt-2 px-4 py-2 border border-gray-400 bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-primtext-primary"
                placeholder="Enter your email address"
              />
            </div>



            {/* Photo URL  */}
            {/* <div className="mb-4">
              <label htmlFor="photo" className="block text-gray-700">
                Photo URL
              </label>
              <input
                type="url"
                id="photo"
                name="photo"
                required
                className="w-full mt-2 px-4 py-2 border border-gray-400 bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-primtext-primary"
                placeholder="Enter your photo URL"
              />
            </div> */}

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  required
                  className="w-full mt-2 px-4 py-2 border border-gray-400 bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-primtext-primary"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-4 text-primary "
                >
                  {
                    showPassword ?   <Eye /> :  <EyeOff />
                  }
                </button>


              </div>
            </div>


          </div>

          <p className="text-xs  text-black mb-4">
            By creating an account you agree to our {" "}
            <Link to="#" className="text-cyan-600">
              Terms & Conditions
            </Link>
          </p>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className=" btn w-full my-2 bg-primary  text-white py-2 rounded hover:bg-blue-700 border border-cyan-500"
            >
              Sign Up
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
