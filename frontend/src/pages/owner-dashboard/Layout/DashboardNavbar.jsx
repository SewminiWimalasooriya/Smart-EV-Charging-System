// import { useSelector } from "react-redux";

// const DashboardNavbar = () => {

//     const { user, apartment } = useSelector(
//         state => state.stationAuth
//     );

//     return (

//         <header className="h-20 bg-slate-900 border-b border-slate-800 px-8 flex items-center justify-between">

//             <div>

//                 <h2 className="text-2xl font-bold">

//                     Welcome,

//                     <span className="text-blue-500">

//                         {" "} {user?.username}

//                     </span>

//                 </h2>

//                 <p className="text-slate-400">

//                     {apartment?.name}

//                 </p>

//             </div>

//             <div className="flex items-center gap-4">

//                 <img

//                     src="https://i.pravatar.cc/150?img=8"

//                     alt=""

//                     className="w-12 h-12 rounded-full border-2 border-blue-500"

//                 />

//             </div>

//         </header>

//     );

// };

// export default DashboardNavbar;