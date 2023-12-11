import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const Header = () => {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleLogout = () => {
   api.post('/auth/logout')
      .then(() => {
        localStorage.removeItem('currentUser');
         navigate("/");
      })
      .catch((err) => console.log(err));
  }
  return (
    <header className="p-5">
        <div className="flex justify-between">
            <div>
              <Link>
                <img
                    width={100}
                    src="https://companieslogo.com/img/orig/FVRR_BIG-9a067792.png"    />
              </Link>
            </div>
            <nav className="flex gap-3 font-medium items-center">
                <span className="max-sm:hidden">Business Solutions</span>
                <span className="max-sm:hidden">Explore</span>
                <span className="max-sm:hidden">Become Seller</span>
                {currentUser ? (
                  <div className="group relative flex items-center gap-2">
                  
                    <img src={currentUser.avatar} alt="" className="w-[40px] h-[40px] rounded-full object-cover"/>
                    <span>{currentUser.username}</span>
                    
                    <div className="hidden group-hover:flex flex-col absolute top-10 bg-gray-200 rounded-md p-1">
                      {currentUser.isSeller && (
                        <>
                        <Link className="px-5 p-3 py-2 hover:bg-gray-100" > Services </Link>
                        <Link className="px-5 p-3 py-2 hover:bg-gray-100" > Add New Service </Link>
                        </>
                      )}
                      
                      <Link className="px-5 p-3 py-2 hover:bg-gray-100" > Orders </Link>
                      <Link className="px-5 p-3 py-2 hover:bg-gray-100" > Messages </Link>
                      <Link onClick={handleLogout} className="px-5 p-3 py-2 hover:bg-gray-100"> Log out </Link>
                    </div>

                  </div>
                ):(
                <>
                  <Link to={'/login'} className="hover:text-green-500">Sign in </Link>
                <Link to={'/register'} className="hover:bg-green-500 hover:text-white text-green-500 border border-green-400 p-2 rounded"> Join Us</Link>
                </>)

                }
                
            </nav>
        </div>
    </header>
  )
}

export default Header