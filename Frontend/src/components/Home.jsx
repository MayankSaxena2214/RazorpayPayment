import React from 'react'
import axios from "axios"
const Home = () => {
    const handleBuy=async(amount)=>{
        const response=await axios.get("http://localhost:4000/api/getkey",{withCredentials:true});
        const key=response.data.key;
        // console.log(key);
        const {data} =await axios.post("http://localhost:4000/api/checkout",{amount},{withCredentials:true})
        console.log(data);
        const options = {
            key: key, // Enter the Key ID generated from the Dashboard
            amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Mayank pvt ltd",
            description: "tutorial of razor pay",
            image: "https://avatars.githubusercontent.com/u/148477562?s=400&u=3ea4c406ef6d138e85f03e2fe803fc6d040729af&v=4",
            order_id: data.order.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            // making the call to the paymentverification api
            callback_url: "http://localhost:4000/api/paymentverification",
            prefill: {
                // details of user who make the payment
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };
        const  rzp1 = new window.Razorpay(options);
        rzp1.open();
        
    }
  return (
    <div className="container">
        <div className="products">
            <div className="image">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT95zNHMzK7E1QlchpAhSzUOhkx40bj6xTJ1g&s" alt="" />
            </div>
            <div className="amount">
                <button onClick={()=>handleBuy(5000)}>5000</button>
            </div>
        </div>
    </div>
  )
}

export default Home