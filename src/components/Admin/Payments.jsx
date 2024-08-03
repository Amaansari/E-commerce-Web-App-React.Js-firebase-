import { useState,useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import moment from "moment"

const Payments = ()=>{
    const [payments,setPayments]= useState([
        // {
        //     paymentId:"12ednwe",
        //     customerName:"Amaan Ansari",
        //     email:"amaanansari1st@gmail.com",
        //     mobile:"+91 7465854658",
        //     product:"Lenovo ideaPad slim3",
        //     amount:52000,
        //     date:"15-07-2024 10:15:14 Am",

        // },
        // {
        //     paymentId:"12ednwe",
        //     customerName:"Amaan Ansari",
        //     email:"amaanansari1st@gmail.com",
        //     mobile:"+91 7465854658",
        //     product:"Lenovo ideaPad slim3",
        //     amount:52000,
        //     date:"15-07-2024 10:15:14 Am",

        // },
        // {
        //     paymentId:"12ednwe",
        //     customerName:"Amaan Ansari",
        //     email:"amaanansari1st@gmail.com",
        //     mobile:"+91 7465854658",
        //     product:"Lenovo ideaPad slim3",
        //     amount:52000,
        //     date:"15-07-2024 10:15:14 Am",

        // },
        
    ])

    useEffect(()=>{
        const req = async ()=>{
            try{
                const {data} = await axios.get("http://localhost:8080/payments")
                setPayments(data.items)
            }
            catch(err){
                console.log(err)
            }
        }
        req()
    },[])

    return (
        <Layout>
            <div>
                <h1 className="text-xl font-semibold">Payments</h1>
                <div className="mt-6">
                    <table className="w-full">
                        <thead>
                            <tr className=" bg-rose-600 text-white ">
                                <th className="p-4">Payment Id</th>
                                <th>Customer's Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Product</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                           {
                            payments.map((item,index)=>(
                                <tr key={index} className="text-center" style={{
                                    background:(index+1)%2 === 0 ? "#f1f5f9" : "white"
                                }}>
                                    <td className="py-4">{item.id}</td>
                                    <td className="capitalize">{item.notes.name ? item.notes.name : 'John Doe'}</td>
                                    <td>{item.email}</td>
                                    <td>{item.contact}</td>
                                    <td className="capitalize">{item.description}</td>
                                    <td>₹{item.amount.toLocaleString()}</td>
                                    <td>{moment.unix(item.created_at).format('DD MMM YYYY, hh:mm:ss A')}</td>
                                    
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
export default Payments;