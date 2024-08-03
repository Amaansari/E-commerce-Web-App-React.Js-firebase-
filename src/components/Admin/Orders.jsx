import { useEffect, useState } from "react";
import Layout from "./Layout";
import firebaseAppConfig from "../../util/firebase-config"
import { getFirestore, collection, getDocs,query, where, updateDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";

const db = getFirestore(firebaseAppConfig)

const Orders = ()=>{
    const [orders,setOrders]= useState([
        // {
        //     orderId:"12ednwe",
        //     customerName:"Amaan Ansari",
        //     email:"amaanansari1st@gmail.com",
        //     mobile:"+91 7465854658",
        //     product:"Lenovo ideaPad slim3",
        //     amount:52000,
        //     date:"15-07-2024 10:15:14 Am",
        //     status:"pending"
        // },
    ])
    const [toggleAddress,setToggleAddress] = useState(false)
    const [toggleIndex,setToggleIndex] = useState(null)

    useEffect(()=>{
        const req = async ()=>{
            const snapshot = await getDocs(collection(db,"orders"))
            let temp = []
            snapshot.forEach((doc)=>{
                const order = doc.data()
                order.orderId = doc.id
                temp.push(order)
            })
            setOrders(temp)
        }
        req() 
    },[])

    const updateOrderStatus = async (e,orderId)=>{
        const status = e.target.value 
        const ref = doc(db,"orders",orderId)
        await updateDoc(ref,{status:status})
        new Swal({
            icon:"success",
            title:"Order Status Updated !"
        })

    }

    return (
        <Layout>
            <div>
                <h1 className="text-xl font-semibold">Orders</h1>
                <div className="mt-6">
                    <table className="w-full">
                        <thead>
                            <tr className=" bg-rose-600 text-white">
                                <th className="py-4">Order Id</th>
                                <th>Customer's Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Product</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Address</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                           {
                            orders.map((item,index)=>(
                                <tr key={index} className="text-center" style={{
                                    background:(index+1)%2 === 0 ? "#f1f5f9" : "white"
                                }}>
                                    <td className="py-4">{item.orderId}</td>
                                <td className="capitalize">{item.customerName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address.mobile}</td>
                                    <td className="capitalize">{item.title}</td>
                                    <td>₹{item.price.toLocaleString()}</td>
                                    <td>{moment(item.createdAt.toDate()).format('DD MMM YYYY, hh:mm:ss A')}</td>
                                    <td>
                                        <button className="text-blue-600 font-medium" onClick={()=>{
                                            setToggleIndex(index)
                                            setToggleAddress(!toggleAddress)
                                        }}>Browse Address</button>
                                        {
                                            (toggleAddress && toggleIndex === index) && 
                                            <div>
                                                `${item.address.address}, ${item.address.city}, ${item.address.state}, ${item.address.country} ${item.address.pincode} Mob- ${item.address.mobile}`
                                            </div>
                                        }                                
                                    </td>
                                    <td onChange={(e)=>{updateOrderStatus(e,item.id)}} className="capitalize">
                                        <select className="border p-1 border-gray-200">
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="dispatched">Dispatched</option>
                                            <option value="returned">Returned</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                           }
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}
export default Orders;