import { useState, useEffect } from "react";
import Layout from "./Layout";
import firebaseAppConfig from "../../util/firebase-config"
import { getFirestore, addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import uploadFile from "../../util/storage";

const db = getFirestore(firebaseAppConfig)
const Product = ()=>{
    const [updateUi,setUpdateUi] = useState(false)
    const [products,setProducts] = useState([
        // {
        //     title:"Men's shirt blue denim",
        //     description:"I am related to men's product",
        //     price:2000,
        //     discount:15,
        //     image:"/products/a.jpg"
        // },
        // {
        //     title:"Men's shirt blue denim",
        //     description:"I am related to men's product",
        //     price:2000,
        //     discount:15,
        //     image:"/products/b.jpg"
        // },
        // {
        //     title:"Men's shirt blue denim",
        //     description:"I am related to men's product",
        //     price:2000,
        //     discount:15,
        //     image:"/products/c.jpg"
        // },
        // {
        //     title:"Men's shirt blue denim",
        //     description:"I am related to men's product",
        //     price:2000,
        //     discount:15,
        //     image:"/products/d.jpg"
        // },
        // {
        //     title:"Men's shirt blue denim",
        //     description:"I am related to men's product",
        //     price:2000,
        //     discount:15,
        //     image:"/products/e.jpg"
        // },
        // {
        //     title:"Men's shirt blue denim",
        //     description:"I am related to men's product",
        //     price:2000,
        //     discount:15,
        //     image:"/products/f.jpg"
        // },
        // {
        //     title:"Men's shirt blue denim",
        //     description:"I am related to men's product",
        //     price:2000,
        //     discount:15,
        //     image:"/products/g.jpg"
        // },
        // {
        //     title:"Men's shirt blue denim",
        //     description:"I am related to men's product",
        //     price:2000,
        //     discount:15,
        //     image:"/products/i.jpg"
        // },
        // {
        //     title:"Men's shirt blue denim",
        //     description:"I am related to men's product",
        //     price:2000,
        //     discount:15,
        //     image:"/products/j.jpg"
        // },
        // {
        //     title:"Men's shirt blue denim",
        //     description:"I am related to men's product",
        //     price:2000,
        //     discount:15,
        //     image:"/products/k.jpg"
        // },
        // {
        //     title:"Men's shirt blue denim",
        //     description:"I am related to men's product",
        //     price:2000,
        //     discount:15,
        //     image:"/products/l.jpg"
        // },
        // {
        //     title:"Men's shirt blue denim",
        //     description:"I am related to men's product",
        //     price:2000,
        //     discount:15,
        //     image:"/products/a.jpg"
        // },
    ])
    const model = {
        title:'',
        price:'',
        discount:'',
        description:''
    }
    const [productForm, setProductForm] = useState(model)
    const [edit,setEdit] = useState(null)
    const [productModel,setProductModel] = useState(false)
    const [applyCloseAnimation,setApplyCloseAnimation] = useState(false)

    useEffect(()=>{
        const req = async ()=>{
            const snapshot = await getDocs(collection(db,"products"))
            let temp = []
            snapshot.forEach((doc)=>{
                const allProduct = doc.data()
                allProduct.id = doc.id
                temp.push(allProduct)
            })
            setProducts(temp)
        }
        req()
    },[updateUi])

    const handleModelClose = ()=>{
        setApplyCloseAnimation(true)
        setTimeout(()=>{
            setProductModel(false)
        },700)
    }

    const handleOpenModel = ()=>{
        setApplyCloseAnimation(false)
        setProductModel(true)
    }

    const handleProductForm = (e)=>{
        const input = e.target 
        const name = input.name 
        const value = input.value 
        setProductForm({
            ...productForm,
            [name]:value
        })
    }

    const createProduct = async (e)=>{
        try{
            e.preventDefault();
            await addDoc(collection(db,"products"),productForm)
            setProductForm(model)
            handleModelClose()
            setUpdateUi(!updateUi)
            new Swal({
                icon:"success",
                title: "Product Added !"
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

    const uploadProductImage = async (e,id)=>{
        const input = e.target
        const file = input.files[0]
        const path = `products/${Date.now()}.png`
        const url = await uploadFile(file,path)
        const ref = doc(db,"products",id)
        await updateDoc(ref,{image:url})
        setUpdateUi(!updateUi)
    }
    
    const deleteProduct = async (id)=>{
        try{
            const ref = doc(db,"products",id);
            await deleteDoc(ref);
            setUpdateUi(!updateUi)
        }
        catch(err){
            new Swal({
                icon : "error",
                title: "Failed to delete this product !"
            })
        }
    }

    const saveData = async (e)=>{
        try{
            e.preventDefault()
            const ref = doc(db,"products",edit.id)
            updateDoc(ref,productForm)
            setProductForm(model)
            setProductModel(false)
            setEdit(null)
            setUpdateUi(!updateUi)
        }
        catch(err){
            new Swal({
                icon : "error",
                title: "Failed to update this product !"
            })
        }
    }

    const editProduct = (item)=>{
        setEdit(item)
        setProductForm(item)
        handleOpenModel()
    }

    return (            
        <Layout>
            <div>
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold mb-4">Products</h1>
                    <button 
                        onClick={handleOpenModel}
                        className="bg-indigo-600 text-white rounded py-2 px-4">
                        <i className="ri-sticky-note-add-line mr-2"></i>
                        New Product
                    </button>
                </div>
                <div className="grid md:grid-cols-4 gap-8 mt-8">
                    {
                        products.map((item,index)=>(
                            <div key={index} className="bg-white rounded-md shadow-lg">
                                <div className="relative">
                                    <img 
                                        src={item.image ? item.image :"/images/pt.jpg"} 
                                        className="rounded-t-md w-full h-[270px] object-cover"
                                    />
                                    <input 
                                        onChange={(e)=>{uploadProductImage(e,item.id)}}
                                        type="file" 
                                        accept="image/*" 
                                        className="opacity-0 w-full h-full absolute left-0 top-0"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between">
                                        <h1 className="font-semibold text-lg capitalize">{item.title}</h1>
                                        <div className="space-x-2">
                                            <button onClick={()=>{editProduct(item)}}>
                                                <i className="ri-edit-box-line text-violet-600"></i>
                                            </button>

                                            <button onClick={()=>{deleteProduct(item.id)}}>
                                                <i className="ri-delete-bin-6-line text-rose-600"></i>
                                            </button>
                                        </div>

                                    </div>
                                    
                                    <div className="flex gap-2 mt-1">
                                        <label>₹{item.price-(item.price*item.discount)/100}</label>
                                        <del className="font-semibold">₹{item.price}</del>
                                        <label className="text-gray-600">({item.discount}% Off)</label>
                                    </div>
                                </div>
                                
                            </div>
                        ))
                    }
                </div>
                {
                    productModel &&
                    <div className={`animate__animated ${applyCloseAnimation ? 'animate__fadeOut':'animate__fadeIn'} bg-black bg-opacity-80 top-0 left-0 absolute h-full w-full flex justify-center items-center`}>
                        <div className={`animate__animated ${applyCloseAnimation ? 'animate__zoomOut':'animate__zoomIn'} animate__faster bg-white w-5/12 py-5 px-6 rounded-md border border-1 relative`}>
                            <button onClick={handleModelClose} className="absolute top-2 right-3">
                                <i className="ri-close-line text-lg"></i>
                            </button>
                            <h1 className="text-lg font-semibold" >New Product</h1>
                            <form onSubmit={edit ? saveData : createProduct} className="grid grid-cols-2 gap-6 mt-4">
                                <input 
                                    required
                                    type="text" 
                                    name = "title"
                                    placeholder="Enter Product Title Here"
                                    className="p-2 border border-gray-300 rounded col-span-2"
                                    onChange={handleProductForm}
                                    value={productForm.title}
                                />

                                <input 
                                    required
                                    type="number" 
                                    name = "price"
                                    placeholder="Price"
                                    className="p-2 border border-gray-300 rounded"
                                    onChange={handleProductForm}
                                    value={productForm.price}
                                />

                                <input 
                                    required
                                    type="number" 
                                    name = "discount"
                                    placeholder="Discount "
                                    className="p-2 border border-gray-300 rounded"
                                    onChange={handleProductForm}
                                    value={productForm.discount}
                                />

                                <textarea 
                                    required
                                    name = "description"
                                    placeholder="Description "
                                    className="p-2 border border-gray-300 rounded col-span-2"
                                    rows={8}
                                    onChange={handleProductForm}
                                    value={productForm.description}
                                />

                                <div>
                                    <button className="bg-indigo-600 text-white rounded px-4 py-2">Submit</button>
                                </div>
        
                            </form>
                        </div>
                    </div>
                }
            </div>
        </Layout> 
    )
}
export default Product;