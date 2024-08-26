import { Payment } from "../models/paymentModel.js";
import { instance } from "../server.js";

import crypto from 'crypto';

const verifyPayment = (order_id, razorpay_payment_id, razorpay_signature) => {
    const secret = process.env.RAZORPAY_KEYSECRET; // Your Razorpay Key Secret
    const generated_signature = crypto
        .createHmac('sha256', secret)
        .update(`${order_id}|${razorpay_payment_id}`)
        .digest('hex');

    return generated_signature === razorpay_signature;
};
export const checkout=async(req,res,next)=>{
    // console.log("");
    const options = {
        amount:Number(req.body.amount)*100,  // amount in the smallest currency unit(paise)
        currency: "INR",
        
      };
    const order=await instance.orders.create(options);
    // console.log(order);
    res.status(200).json({
        success:true,
        order
    })
}
export const paymentVerification=async(req,res,next)=>{
    console.log(req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const isPaymentValid = verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    if (isPaymentValid) {
        // Payment is successful
        //save the payment details in database
        await Payment.create({razorpay_order_id, razorpay_payment_id, razorpay_signature})
        res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`)
        // res.status(200).send({ success: true, message: 'Payment verified successfully!' });
    } else {
        // Payment verification failed
        res.status(400).send({ success: false, message: 'Payment verification failed!' });
    }
}