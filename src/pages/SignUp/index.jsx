import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the default CSS for react-toastify

const SignUp = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   *  Handles the form submission event (Signing up functionality).
   */
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const userData = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      };

      // Send a POST request to the registration API
      const response = await axios.post("http://127.0.0.1:5000/register", userData);

      if (response.status === 201) {
        // Registration successful
        console.log("User registered successfully");
        toast.success("User registered successfully"); // Display success toast message
        navigate('/sign-in')
      } else {
        console.log("Registration failed:", response.data.message);
        toast.error(response.data.message); // Display error toast message
      }
    } catch (error) {
      console.error("Failed to sign up the user: ", error.message);
      toast.error("Failed to sign up the user"); // Display error toast message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-1 justify-center">
      <div className="flex justify-center px-4 py-12 sm:px-6 lg:flex-none">
        <div className="mx-auto w-full sm:max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-xl sm:text-3xl font-bold leading-9 tracking-tight text-blackLight">
              Create your account
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="font-semibold text-indigo-600 hover:text-indigo-500 !underline"
              >
                Sign In
              </Link>
            </p>
          </div>
          <form
            onSubmit={onSubmitHandler}
            className="mt-8 space-y-6"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="fname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="fname"
                    name="first name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 px-2 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blackLight placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="lname"
                    name="last name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 px-2 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blackLight placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 px-2 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blackLight sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 px-2 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blackLight placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-azure px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-opacity-85"
            >
              {loading ? <LoadingSpinner /> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
