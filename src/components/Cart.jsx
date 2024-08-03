import { useState , useEffect } from "react";
import Layout from "./Layout"
import firebaseAppConfig from "../util/firebase-config";
import { getFirestore, getDocs, collection, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseAppConfig)
const auth = getAuth(firebaseAppConfig)

const Cart = ()=>{
    const [products, setProducts] = useState([])

    const [session,setSession] = useState(null)

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setSession(user)
            }
            else{
                setSession(null)
            }
        })
    },[])

    useEffect(()=>{
        const req = async ()=>{
            if(session){
                const col = collection(db,"carts")
                const q = query(col,where("userId", "==",session.uid))
                const snapshot = await getDocs(q)
                let temp = []
                snapshot.forEach((doc)=>{
                    const document = doc.data();
                    temp.push(document)
                })
                setProducts(temp)
            }
        }
        req()

    },[session])

    
    return (
        <Layout>
            <div className="md:w-7/12 mx-auto md:my-16 p-8 bg-white shadow-lg border rounded-md">
                <div className="flex items-center gap-4">
                    <i className="ri-shopping-cart-line text-4xl"></i>
                    <h1 className="text-3xl font-semibold">Cart</h1>
                </div>
                <hr className="my-6"/>

                <div className="space-y-12">
                    {
                        products.map((item,index)=>(
                            <div key={index} className="flex gap-4">
                                <img src={item.image} alt="product-image" className="w-[100px] border border-3 border-white shadow" />
                                <div>
                                    <h1 className="font-semibold capitalize text-lg">{item.title}</h1>
                                    <div className="flex flex-col gap-4">
                                        <div className="space-x-3">
                                            <label className="text-lg font-semibold">₹{item.price-(item.price*item.discount)/100}</label>
                                            <del>₹{item.price}</del>
                                            <label className="text-gray-500">{item.discount}% Discount</label>
                                        </div>
                                        <button className="w-fit bg-rose-600 px-4 py-2 text-white rounded">
                                            <i className="ri-delete-bin-line mr-2"></i>
                                            Remove
                                        </button>
                                    </div>
                                   
                                </div>
                            </div>
                        ))
                    }
                </div>

                <hr className="my-6" />
                
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Total : ₹57,000</h1>
                    <button className="w-fit bg-green-500 px-12 py-3 text-white rounded font-semibold text-center hover:bg-rose-600">
                        <i className="ri-shopping-bag-4-line mr-2"></i>
                        Buy Now
                    </button>
                </div>
            </div>  
        </Layout>
        
    )
}
export default Cart;