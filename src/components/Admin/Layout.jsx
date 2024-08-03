import { Children, useState } from "react";
import { Link , useLocation } from "react-router-dom";


const Layout=({children})=>{
    const [mobileSize,setMobileSize] = useState(0)
    const [size,setSize] = useState(280)
    const [accountMenu,setAccountMenu] = useState(false)
    const location = useLocation();
  
    const menus = [
        {
            label:"Dashboard",
            icon:  <i className="ri-dashboard-3-line mr-2"></i>,
            link: "/admin/dashboard"
        },
        {
            label:"Customers",
            icon:  <i className="ri-user-3-line mr-2"></i>,
            link: "/admin/customers"
        },
        {
            label:"Products",
            icon:  <i className="ri-shopping-cart-line mr-2"></i>,
            link: "/admin/products"
        },
        {
            label:"Orders",
            icon:  <i className="ri-shape-line mr-2"></i>,
            link: "/admin/orders"
        },
        {
            label:"Payments",
            icon:  <i className="ri-money-dollar-circle-line mr-2"></i>,
            link: "/admin/payments"
        },
        {
            label:"Settings",
            icon:  <i className="ri-settings-3-line mr-2"></i>,
            link: "/admin/settings"
        }
    ]

    return (
        <>
            <div className="md:block hidden">
            <aside 
                className="h-full bg-indigo-600 fixed top-0 left-0 overflow-hidden"
                style={{
                    width:size,
                    transition:"0.3s"
                }}
            >
                <div className="flex flex-col">
                    {
                        menus.map((item,index)=>(
                            <Link 
                                key={index}
                                to={item.link} 
                                className="px-4 py-3 text-[17.5px] text-gray-50 hover:bg-rose-600 hover:text-white"
                                style={{
                                    background: (location.pathname === item.link) ? "#E11D48" : "transparent" 
                                }}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        ))
                    }

                    <button  className="px-4 py-3 text-left text-[17.5px] text-gray-50 hover:bg-rose-600 hover:text-white">
                        <i className="ri-logout-circle-r-line mr-2"></i>
                        Logout
                    </button>
                
                </div>

            </aside>
            <section 
                className="bg-gray-100 min-h-screen"
                style={{
                    marginLeft:size,
                    transition:"0.3s"
                }}
            >
                <nav className="bg-white p-6 shadow flex items-center justify-between sticky top-0 left-0">
                    <div className="flex gap-4 items-center">
                        <button  
                            className="bg-gray-50 w-8 h-8 hover:text-white hover:bg-indigo-600 border"
                            onClick={()=>{setSize(size === 280 ? 0 : 280)}}
                        >
                            <i className="ri-menu-2-line text-xl"></i>
                        </button>
                        <h1 className="text-md font-semibold">Shopcode</h1>
                    </div>

                    <div>
                        <button className="relative">
                            <img 
                                onClick={()=>{setAccountMenu(!accountMenu)}} 
                                src="/images/avt.avif" 
                                alt="avatar" 
                                className="w-10 h-10 rounded-full" 
                            />
                            {   accountMenu && 
                                    <div className="p-6 bg-white absolute top-18 right-0 w-[200px] shadow-lg">
                                        <div>
                                            <h1 className="text">Er Amaan</h1>
                                            <p>example@gmail.com</p>
                                            <div className="h-px bg-gray-200 my-4"></div>
                                            <button >
                                                <i className="ri-logout-circle-r-line mr-2"></i>
                                                Logout
                                            </button>
                                        </div>
                                    </div> 
                            }
                        </button>
                    </div>
                </nav>
                <div className="p-6">
                    {children}
                </div>
            </section>
            </div>

            <div className="md:hidden block">
            <aside 
                className="h-full bg-indigo-600 fixed top-0 left-0 z-50 overflow-hidden"
                style={{
                    width:mobileSize,
                    transition:"0.3s"
                }}
            >

                <div className="flex flex-col">
                    <button 
                        className="text-left mx-4 mt-4"
                        onClick={()=>{setMobileSize(mobileSize === 0 ? 280 : 0)}}
                    >
                        <i className="ri-menu-2-fill text-white text-xl text-left"></i>
                    </button>
                    {
                        menus.map((item,index)=>(
                            <Link 
                                key={index}
                                to={item.link} 
                                className="px-4 py-3 text-[17.5px] text-gray-50 hover:bg-rose-600 hover:text-white"
                                style={{
                                    background: (location.pathname === item.link) ? "#E11D48" : "transparent" 
                                }}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        ))
                    }
                    
                    <button  className="px-4 py-3 text-left text-[17.5px] text-gray-50 hover:bg-rose-600 hover:text-white">
                        <i className="ri-logout-circle-r-line mr-2"></i>
                        Logout
                    </button>
                
                </div>

            </aside>
            <section 
                className="bg-gray-100 h-screen"
               
            >
                <nav className="bg-white p-6 shadow flex items-center justify-between sticky top-0 left-0">
                    <div className="flex gap-4 items-center">
                        <button  
                            className="bg-gray-50 w-8 h-8 hover:text-white hover:bg-indigo-600 border"
                            onClick={()=>{setMobileSize(mobileSize === 0 ? 280 : 0)}}
                        >
                            <i className="ri-menu-2-line text-xl"></i>
                        </button>
                        <h1 className="text-md font-semibold">Shopcode</h1>
                    </div>

                    <div>
                        <button className="relative">
                            <img 
                                onClick={()=>{setAccountMenu(!accountMenu)}} 
                                src="/images/avt.avif" 
                                alt="avatar" 
                                className="w-10 h-10 rounded-full" 
                            />
                            {   accountMenu && 
                                    <div className="p-6 bg-white absolute top-18 right-0 w-[200px] shadow-lg">
                                        <div>
                                            <h1 className="text">Er Amaan</h1>
                                            <p>example@gmail.com</p>
                                            <div className="h-px bg-gray-200 my-4"></div>
                                            <button >
                                                <i className="ri-logout-circle-r-line mr-2"></i>
                                                Logout
                                            </button>
                                        </div>
                                    </div> 
                            }
                        </button>
                    </div>
                </nav>
                <div className="p-6">
                    {children}
                </div>
            </section>
            </div>
           
        </>
        
    )
}
export default Layout;