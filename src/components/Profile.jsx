import firebaseAppConfig from "../util/firebase-config";
import { getAuth , onAuthStateChanged, updateProfile } from "firebase/auth"
import Layout from "./Layout";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"
import { getFirestore, collection, addDoc ,getDocs,query, where, doc, updateDoc } from "firebase/firestore";
import uploadFile from "../util/storage";

const auth = getAuth(firebaseAppConfig)
const db = getFirestore(firebaseAppConfig)

const Profile = ()=>{
    const [orders,setOrders] = useState([])
    const [session,setSession] = useState(null)
    const [isAddress,setIsAddress] = useState(false)
    const navigate = useNavigate()
    const [uploading,setUploading] = useState(false)
    const [docId,setDocId] = useState(null)
    const [isUpdated,setIsUpdated] = useState(false)
    const [formValue,setFormValue] = useState({
        fullname:"",
        email:''     
    })
    const [addressFormValue,setAddressFormValue] = useState({
        address:'',
        city:'',
        state:'',
        country:'',
        pincode:'',
        userId:'',
        mobile:''  
    })
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setSession(user)
            }
            else{
                setSession(false)
                navigate('/login')
            }
        })
    },[])


    useEffect(()=>{
        const req = async ()=>{
            if(session){
                setFormValue({
                    ...formValue,
                    fullname:session.displayName,
                    mobile: (session.phoneNumber ? session.phoneNumber : "")
                })
                setAddressFormValue({
                    ...addressFormValue,
                    userId:session.uid
                })
                //fetching address

                const col =collection(db,"addresses")
                const q = query(col,where("userId","==",session.uid))
                const snapshot = await getDocs(q)

                setIsAddress(!snapshot.empty)

                snapshot.forEach((doc)=>{     
                    const address = doc.data()
                    setDocId(doc.id)
                    setAddressFormValue({
                        ...addressFormValue,
                        ...address
                    })
                })
            }
        }
        req()
    },[session,isUpdated])

    useEffect(()=>{
        const req = async ()=>{
            if(session){
                const col = collection(db,"orders")
                const q = query(col,where("userId","==",session.uid))
                const snapshot = await getDocs(q)
                let temp = []
                snapshot.forEach((doc)=>{
                    temp.push(doc.data())
                })
                setOrders(temp)
            }
        }
        req()
    },[session])

    const setProfilePicture = async (e)=>{
        const input = e.target;
        const file = input.files[0]
        const filenameArray = file.name.split(".")
        const ext = filenameArray[filenameArray.length-1]
        const filename = Date.now()+"."+ext
        const path =  `pictures/${filename}`
        setUploading(true)
        const url = await uploadFile(file,path);
        await updateProfile(auth.currentUser,{photoURL:url});
        setUploading(false)
        setSession({
            ...session,
            photoURL : url
        })
    }

    const handleFormValue = (e)=>{
        const input = e.target;
        const key = input.name;
        const value = input.value;
        setFormValue({
            ...formValue,
            [key]:value
        })
    }
    
    const saveProfileInfo = async (e)=>{
        e.preventDefault()
        await updateProfile(auth.currentUser,{
            displayName:formValue.fullname,
            phoneNumber:formValue.mobile
        })
        new Swal({
            icon:"success",
            title:"Profile Saved !"
        })
    }
    const setAddress = async (e)=>{
        try{
            e.preventDefault();
            const x = await addDoc(collection(db,"addresses"),addressFormValue);
            setIsAddress(true)
            setIsUpdated(!isUpdated)
            new Swal({
                icon:"success",
                title:"Address Saved !"
            })
        }
        catch(err){
            new Swal({
                icon:"error",
                title:"Failed !",
                text: err.message
            })
        }
    
    }

    const updateAddress = async (e)=>{
        try{
            e.preventDefault();
            const ref = doc(db,"addresses",docId)
            updateDoc(ref,addressFormValue)
            new Swal({
                icon:"success",
                title:"Address Updated !"
            })
        }
        catch(err){
            new Swal({
                icon:"error",
                title:"Failed !",
                text: err.message
            })
        }
    
    }

    const handleAddressFormValue = (e)=>{
        const input = e.target
        const name = input.name
        const value = input.value
        setAddressFormValue({
            ...addressFormValue,
            [name]:value
        })
    }

    const getStatusColor = (status)=>{
        if(status === "processing"){
            return "bg-blue-600"
        }
        else if(status === "pending"){
            return 'bg-indigo-600'
        }
        else if(status === "dispatched"){
            return "bg-rose-600"
        }
        else if(status === "returned"){
            return "bg-orange-600"
        }
        else{
            return "bg-cyan-600"
        }
    }

    if(session === null){
        return (
            <div className="w-full h-full fixed top-0 left-0 bg-gray-100 flex justify-center items-center">
                <span className="relative flex h-6 w-6 ">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-sky-500"></span>
                </span>
            </div>     
        )
    }
    return (
        <Layout>
            <div className="md:w-7/12 mx-auto md:my-16 bg-white shadow-lg rounded-md border p-8">
                <div className="flex gap-3">
                    <i className="ri-shopping-cart-line text-4xl"></i>
                    <h1 className="text-3xl font-semibold">Orders</h1>
                </div>

                <hr className="my-6"/>

                {
                    orders.map((item,index)=>(
                        <div key={index} className="flex gap-3 mb-8">
                            <img src={item.image} alt="product-img" className="w-[100px]" />
                            <div>
                                <h1 className="text-lg font-semibold capitalize">{item.title}</h1>
                                <p className="text-gray-600">{item.description.slice(0,50)}</p>
                            </div>
                            <div className="space-x-2">
                                <label className="text-bold text-lg">
                                    ₹{item.price-(item.price*item.discount)/100}
                                </label>
                                <del>₹{item.price}</del>
                                <label>({item.discount})% off</label>
                            </div>
                            <button className={`mt-2 ${getStatusColor(item.status)} px-3 py-1 rounded text-xs text-white font-medium capitalize`}>{item.status}</button>

                        </div>
                    ))
                }

                
            </div>

            <div className="md:w-7/12 mx-auto md:my-16 bg-white shadow-lg rounded-md border p-8">
                <div className="flex gap-3">
                    <i className="ri-user-line text-4xl"></i>
                    <h1 className="text-3xl font-semibold">Profile</h1>
                </div>
                <hr className="my-6"/>

                <div className="mx-auto w-24 h-24 mb-6 relative">
                    {
                        uploading ?
                        <img src="/images/loading.gif"  />
                        :
                        <img src={session.photoURL ? session.photoURL :"/images/avt.avif"} className="w-24 h-24 rounded-full mx-auto " alt="profile-pic" />
                    }
                    <input type="file" accept="image/*" className="opacity-0 absolute top-0 left-0 w-full h-full" onChange={setProfilePicture}/>
                </div>

                <form className="grid grid-cols-2 gap-6" onSubmit={saveProfileInfo}>
                    <div className="flex flex-col gap-2">
                        <label  className="text-lg font-semibold" >Fullname</label>
                        <input 
                            onChange = {handleFormValue}
                            required
                            type="text" 
                            name="fullname"
                            className="p-2 border border-gray-300 rounded"
                            value={formValue.fullname}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label  className="text-lg font-semibold" >Email</label>
                        <input 
                            disabled
                            onChange = {handleFormValue}
                            required
                            type="email" 
                            name="email"
                            className="p-2 border border-gray-300 rounded"
                            value={session.email}
                        />
                    </div>

                    {/* <div/> */}

                    <button className="bg-rose-600 px-4 py-2 text-white rounded w-fit hover:bg-green-600">
                        <i className="ri-save-line mr-2"></i>
                        Save
                    </button>

                </form>
            </div>

            <div className="md:w-7/12 mx-auto md:my-16 bg-white shadow-lg rounded-md border p-8">
                <div className="flex gap-3">
                    <i className="ri-link-unlink-m text-4xl"></i>
                    <h1 className="text-3xl font-semibold">Delivery Address</h1>
                </div>
                <hr className="my-6"/>


                <form className="grid grid-cols-2 gap-6" onSubmit={isAddress ? updateAddress : setAddress}>  

                    <div className="flex flex-col gap-2 col-span-2">
                        <label  className="text-lg font-semibold" >Area/Street/Vill</label>
                        <input 
                            onChange = {handleAddressFormValue}
                            required
                            type="text" 
                            name="address"
                            className="p-2 border border-gray-300 rounded"
                            value={addressFormValue.address}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label  className="text-lg font-semibold" >City</label>
                        <input 
                            onChange =  {handleAddressFormValue}
                            required
                            type="text" 
                            name="city"
                            className="p-2 border border-gray-300 rounded"
                            value={addressFormValue.city}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label  className="text-lg font-semibold" >State</label>
                        <input 
                            onChange = {handleAddressFormValue}
                            required
                            type="text" 
                            name="state"
                            className="p-2 border border-gray-300 rounded"
                            value={addressFormValue.state}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label  className="text-lg font-semibold" >Country</label>
                        <input 
                            onChange = {handleAddressFormValue}
                            required
                            type="text" 
                            name="country"
                            className="p-2 border border-gray-300 rounded"
                            value={addressFormValue.country}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label  className="text-lg font-semibold" >Pincode</label>
                        <input 
                            onChange = {handleAddressFormValue}
                            required
                            type="number" 
                            name="pincode"
                            className="p-2 border border-gray-300 rounded"
                            value={addressFormValue.pincode}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label  className="text-lg font-semibold" >Mobile</label>
                        <input
                            onChange = {handleAddressFormValue} 
                            required
                            type="number" 
                            name="mobile"
                            className="p-2 border border-gray-300 rounded"
                            value={addressFormValue.mobile}
                        />
                    </div>

                    <div className="col-span-2">
                        {
                            isAddress ?
                            <button className="bg-rose-600 px-4 py-2 text-white rounded w-fit hover:bg-green-600">
                                <i className="ri-save-line mr-2"></i>
                                Save
                            </button>
                            :
                            <button className="bg-green-600 px-4 py-2 text-white rounded w-fit hover:bg-green-600">
                                <i className="ri-save-line mr-2"></i>
                                Submit
                            </button>
                        }
                    </div>

                    
                    

                </form>
            </div>
        </Layout>
    )
}
export default Profile;