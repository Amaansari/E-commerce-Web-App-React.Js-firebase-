import Layout from "./Layout"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import {Navigation,Pagination} from "swiper/modules"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { useState , useEffect } from "react"
import firebaseAppConfig from "../util/firebase-config"
import { getFirestore, collection, addDoc, getDocs ,serverTimestamp, query ,where} from "firebase/firestore"
import Swal from "sweetalert2"
import { getAuth ,onAuthStateChanged } from "firebase/auth"
import axios from "axios"
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom"


const auth = getAuth(firebaseAppConfig)
const db = getFirestore(firebaseAppConfig)

const Home = ({slider,title="Latest Products"})=>{
    const navigate = useNavigate()
    const [Razorpay] = useRazorpay();
    const [products,setProducts] = useState([])
    const [session,setSession] = useState(null)
    const [address,setAddress] = useState(null)

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
            const snapshot = await getDocs(collection(db,"products"))
            let temp = []
            snapshot.forEach((doc)=>{
                const allProducts = doc.data()
                allProducts.id = doc.id
                temp.push(allProducts)
            })
            setProducts(temp)
       }
       req()
    },[])

    useEffect(()=>{
        const req = async ()=>{
            if(session){
                const col = collection(db,"addresses")
                const q = query(col,where("userId","==",session.uid))
                const snapshot = await getDocs(q)
                snapshot.forEach((doc)=>{
                   const document =  doc.data()
                   setAddress(document)
                })
            }
        }
        req()
    },[session])
    const addToCart = async (item)=>{
        try{   
            item.userId = session.uid;
            await addDoc(collection(db,"carts"),item)
            new Swal({
                icon:"success",
                title:"Product Added !"
            })
        }
        catch(err){
            new Swal({
                icon:"error",
                title:"Failed !",
                text:err.message
            })
        }
    }

    const buyNow = async (product)=>{
        try{
            product.userId = session.uid
            product.status = "pending"
            const amount =  product.price-(product.price*product.discount)/100
            const {data} = await axios.post("http://localhost:8080/order",{amount:amount})
            const options = {
                key:'rzp_test_I8721sxIUbhro6',
                amount:data.amount,
                order_id:data.orderId,
                name:'You & Me Shop',
                description: product.title,
                image:'https://th.bing.com/th/id/OIP.210cm4Bd8NOuvV-teLtwSQAAAA?w=474&h=365&rs=1&pid=ImgDetMain',
                
                handler:async function(response){
                    product.email = session.email
                    product.customerName = session.displayName
                    product.createdAt = serverTimestamp()
                    product.address = address
                    await addDoc(collection(db,"orders"),product)
                    navigate('/profile')
                },
                notes:{
                    name:session.displayName
                }
            }
            const rzp = new Razorpay(options)
            
            rzp.open()

            rzp.on("payment.failed",function(response){
                navigate('/failed')
            })
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <Layout>
            <div>

                {    slider &&
                    <header> 
                        <Swiper
                            className="z-[-1]"
                            navigation={true}
                            pagination={true}
                            modules={[Navigation,Pagination]}

                            slidesPerView={1}
                        >
                            <SwiperSlide>
                                <img src="/images/p1.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/images/p2.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/images/p3.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/images/p4.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/images/p5.jpg" />
                            </SwiperSlide>
                        </Swiper>
                    </header>
                }

                <div className="md:p-16 p-8">
                    <h1 className="text-3xl text-center font-bold">{title}</h1>
                    <p className="text-center md:w-7/12 mx-auto text-gray-600 mt-2 mb-16" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab consequuntur enim consequatur placeat voluptatum? Accusantium?</p>
                    <div className="md:w-10/12 mx-auto grid md:grid-cols-4 gap-12">
                        {
                            products.map((item,index)=>(
                                <div key={index} className="bg-white shadow-lg border">
                                    <img src={item.image ? item.image :"/images/pt.jpg"} />
                                    <div className="p-4">
                                        <h1 className="text-lg font-semibold capitalize">{item.title}</h1>
                                        <div className="space-x-2">
                                            <label className="font-bold text-lg">₹{item.price-(item.price*item.discount)/100}</label>
                                            <del>₹{item.price}</del>
                                            <label className="text-gray-600">({item.discount}%)</label>
                                        </div>
                                        <button 
                                            onClick={()=>{buyNow(item)}}
                                            className="bg-green-500 py-2 w-full rounded mt-4 text-white font-semibold">Buy Now</button>
                                        <button 
                                            onClick={()=>{addToCart(item)}} 
                                            className="bg-rose-500 py-2 w-full rounded mt-2 text-white font-semibold">
                                            <i className="ri-shopping-cart-line mr-2"></i>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default Home