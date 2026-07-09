import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const  navigate = useNavigate();
    return(
        <nav className="h-20 bg-black text-white px-10 py-4 flex  justify-between items-center ">
            <h1 className="text-2xl font-bold">
        ⚡ VoltSpot
      </h1>

      <div className="flex gap-4">
        <button onClick={()=> navigate("/admin/login")} className="px-8 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition">
         
          Admin
          
          </button>
        <button onClick={()=> navigate("/")} className="px-8 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition">
          
          Home
          
          </button>
      </div>

        </nav>

    );
};

export default Navbar;