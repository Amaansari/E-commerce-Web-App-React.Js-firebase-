import Layout from "./Layout"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import {Navigation,Pagination} from "swiper/modules"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { useState } from "react"

const Products = ()=>{
    const [products,setProducts] = useState([
        {
            title: "New blue shirts men",
            price: 1200,
            discount: 15,
            thumbnail:"/products/a.jpg"

        },
        {
            title: "New blue shirts men",
            price: 1200,
            discount: 15,
            thumbnail:"/products/b.jpg"

        },
        {
            title: "New blue shirts men",
            price: 1200,
            discount: 15,
            thumbnail:"/products/c.jpg"

        },
        {
            title: "New blue shirts men",
            price: 1200,
            discount: 15,
            thumbnail:"/products/d.jpg"

        },
        {
            title: "New blue shirts men",
            price: 1200,
            discount: 15,
            thumbnail:"/products/e.jpg"

        },
        {
            title: "New blue shirts men",
            price: 1200,
            discount: 15,
            thumbnail:"/products/f.jpg"

        },
        {
            title: "New blue shirts men",
            price: 1200,
            discount: 15,
            thumbnail:"/products/g.jpg"

        },
        {
            title: "New blue shirts men",
            price: 1200,
            discount: 15,
            thumbnail:"/products/i.jpg"

        },
        {
            title: "New blue shirts men",
            price: 1200,
            discount: 15,
            thumbnail:"/products/j.jpg"

        },
        {
            title: "New blue shirts men",
            price: 1200,
            discount: 15,
            thumbnail:"/products/k.jpg"

        },
        {
            title: "New blue shirts men",
            price: 1200,
            discount: 15,
            thumbnail:"/products/l.jpg"

        },
        {
            title: "New blue shirts men",
            price: 1200,
            discount: 15,
            thumbnail:"/products/i.jpg"

        },
    ])
    return (
        <Layout>
            <div>


                <div className="md:p-16 p-8">
                    <h1 className="text-3xl text-center font-bold">All Products</h1>
                    <p className="text-center md:w-7/12 mx-auto text-gray-600 mt-2 mb-16" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab consequuntur enim consequatur placeat voluptatum? Accusantium?</p>
                    <div className="md:w-10/12 mx-auto grid md:grid-cols-4 gap-12">
                        {
                            products.map((item,index)=>(
                                <div key={index} className="bg-white shadow-lg border">
                                    <img src={item.thumbnail} />
                                    <div className="p-4">
                                        <h1 className="text-lg font-semibold">{item.title}</h1>
                                        <div className="space-x-2">
                                            <label className="font-bold text-lg">₹{item.price-(item.price*item.discount)/100}</label>
                                            <del>₹{item.price}</del>
                                            <label className="text-gray-600">({item.discount}%)</label>
                                        </div>
                                        <button className="bg-green-500 py-2 w-full rounded mt-4 text-white font-semibold">Buy Now</button>
                                        <button className="bg-rose-500 py-2 w-full rounded mt-2 text-white font-semibold">
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
export default Products