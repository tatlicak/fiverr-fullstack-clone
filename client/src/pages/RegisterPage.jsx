import { useState } from "react"
import axios from "axios";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  const upload = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'fiverr');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dg9s4foki/image/upload', data
      );

      console.log(res);
      return res.data.secure_url;
    } catch (error) {
      console.log(error.message)
    }
  }



  const handleSubmit = async (e) => {
    e.preventDefault();

    //Accessing form data

    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    //uploading image to the cloud
    const imgUrl = await upload(data.avatar);

    console.log()

    //adding image url to data
    data.avatar = imgUrl;

    //user's account type
    data.isSeller = isChecked;

    console.log('1',data);

    //sending request to api endpoint for creating user account
   api.post('/auth/register', data)
      .then((res) =>{
        
        //redirect to login
        navigate("/login")
        //send notification
        toast.success("Your account was created successfully. Please Log in...");

      }).catch((err) => { 

         toast.error("An error was occured when creating your account");
     
        });
  }

  return (
    <div className="h-[calc(100vh-100px)] p-5 sm:pt-24">


      <form onSubmit={handleSubmit} className="max-w-[700px] mx-auto grid grid-cols-2 sm:gap-[90px] gap-10">

        {/* Customer Section */}
        <div className="max-sm:col-span-2">
          <h1 className="text-center font-bold text-xl mb-4" >Create New Account</h1>
          <div className="mb-5">
            <label htmlFor="user-name" className="block mb-2 text-sm font-medium text-gray-900 ">User Name</label>
            <input type="text"
              id="username"
              name="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
            <input type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="name@flowbite.com"
              required />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
            <input type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required />
          </div>

          <div className="mb-5">
            <label htmlFor="avatar" className="block mb-2 text-sm font-medium text-gray-900 ">Profile Image</label>
            <input type="file"
              id="avatar"
              name="avatar"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required />
          </div>

          <div className="mb-5">
            <label htmlFor="user-country" className="block mb-2 text-sm font-medium text-gray-900 ">Country</label>
            <input type="text"
              id="country"
              name="country"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              placeholder="Turkey" />
          </div>

        </div>

        {/* Seller Section */}
        <div className="max-sm:col-span-2">
          <h1 className="text-center font-bold text-xl mb-4" >Become Seller</h1>
          <div className="flex justify-center">
            <div className="toggle-switch">
              <input onChange={() => {
                setIsChecked(!isChecked)
              }}
                className="toggle-input" id="toggle" type="checkbox" name="isSeller" />
              <label className="toggle-label" htmlFor="toggle"></label>
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="seller-phone" className="block mb-2 text-sm font-medium text-gray-900 ">Your phone</label>
            <input
              disabled={!isChecked}
              type="tel"
              name="phone"
              className="disabled:bg-gray-100 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                          focus:border-blue-500 block w-full p-2.5 "
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="123-456-7890" required />
          </div>

          <div className="mb-5">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
            <textarea
              disabled={!isChecked}
              cols="30"
              rows="10"
              name="description"
              className="disabled:bg-gray-100 mix-h-[100px] max-h-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
          </div>
        </div>

        <div className="col-span-2 flex justify-center">
          <button type="submit" className="min-w-[200px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Join Us</button>
        </div>
      </form>


    </div>

  )
}

export default RegisterPage