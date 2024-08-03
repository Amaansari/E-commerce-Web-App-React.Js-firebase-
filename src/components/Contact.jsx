import Layout from "./Layout"
const Contact = ()=>{
    return (
        <Layout>
            <div>
                <header className="md:w-6/12 mx-auto md:my-16 md:shadow-lg bg-white border">
                    <img src="/images/contact-banner.jpg" alt="contact-icon" className="w-full"/>
                    <div className="p-8">
                        <form className="space-y-6">
                        
                            <div className="flex flex-col">
                                <label className="text-lg font-semibold mb-1">Your name</label> 
                                <input  
                                    required
                                    name="fullname"
                                    type="text"
                                    placeholder="Joh Doe"
                                    className="p-3 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-lg font-semibold mb-1">Email id</label> 
                                <input  
                                    required
                                    name="email"
                                    type="email"
                                    placeholder="example@mail.com"
                                    className="p-3 border border-gray-300 rounded"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-lg font-semibold mb-1">Message</label> 
                                <textarea 
                                    required
                                    name="message"
                                    placeholder="Enter your message here"
                                    className="p-3 border border-gray-300 rounded"
                                    rows={4}
                                />
                            </div>

                            <button className="py-3 px-8 rounded bg-blue-600 text-white font-semibold hover:bg-rose-600">Get Quote</button>
                        </form>
                    </div>
                </header>
            </div>
        </Layout>
    )
}
export default Contact