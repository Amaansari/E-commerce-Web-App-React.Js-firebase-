const Razorpay = require('razorpay')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const instance = new Razorpay({
    key_id:"ssodkfdofksedewpp",
    key_secret:"dkokdwedkwkke"
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
app.listen(8080)


app.get('/payments',async (req,res)=>{
    try{
        const payments = await instance.payments.all()
        res.json(payments)

    }
    catch(err){
        res.status(500).json(err)
    }
})
app.post('/order',async (req,res)=>{
    try{
        const newOrder = instance.orders.create({
            amount : await (req.body.amount*100),
            receipt: 'CO_RP_'+Date.now()
        })
        res.json({
            amount:newOrder.amount,
            orderId:newOrder.id
        })

    }
    catch(err){
        res.status(500).json(err)
    }
})