import { Link } from "react-router-dom";
import api from "../utils/api";
const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    //perform the login process
    api
      .post('/auth/login', data)
      //if login is succeed, save user info to localStorage
      .then((res) => {
            localStorage.setItem(
              'currentUser',
              JSON.stringify(res.data.user)
            );
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="h-[calc(100vh-200px)] flex flex-col justify-center item-center p-5 sm:pt-24">
        <h2 className="font-bold text-3xl mb-10">
          Please Login to Your Account
        </h2>

    <form onSubmit={handleSubmit} className="max-w-[700px] sm:min-w-[400px]    max-sm:w-full ">

      {/* Customer Section */}
      <div className="max-sm:col-span-2">
         <div className="mb-5">
          <label htmlFor="user-country" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
          <input type="text"
            name="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
            />
        </div>
        <div className="mb-5">
          <label htmlFor="user-country" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
          <input type="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
            />
        </div>

      </div>


      <div className="col-span-2 flex justify-center">
        <button type="submit" className="min-w-[200px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Login</button>
      </div>

      <p>No Account ? <Link className="text-blue-400" to={ '/register' }>Register</Link></p>
    </form>


  </div>
  )
}

export default LoginPage