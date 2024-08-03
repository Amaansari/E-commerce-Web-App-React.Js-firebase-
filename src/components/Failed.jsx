import { Link } from "react-router-dom"

const Failed = ()=>{
    return (
        <div className="h-screen flex justify-center items-center ">
            <div className="w-6/12 text-center space-y-6">
                <img src="/images/failed.svg" className="w-8/12 mx-auto" alt="failed-icon" />
                <h1 className="text-5xl font-bold">Payment Failed !</h1>
                <Link 
                    className="bg-indigo-600 text-white block w-fit px-4 py-2 mx-auto rounded" 
                    to="/"
                >
                    Go Back !
                </Link>
            </div>
        </div>
    )
}
export default Failed