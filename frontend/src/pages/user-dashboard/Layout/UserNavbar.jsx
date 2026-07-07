const UserNavbar = ({ user }) => {


    return (

        <div className="
h-16
bg-gray-900
border-b
border-gray-800
flex
items-center
justify-between
px-6
">


            <h1 className="text-xl">
                User Dashboard
            </h1>


            <div>

                <span>
                    Welcome {user?.name}
                </span>


            </div>


        </div>

    )

}


export default UserNavbar;