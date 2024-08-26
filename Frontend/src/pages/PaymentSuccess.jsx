import React from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {
    const params=useSearchParams()[0];
    console.log(params.get("reference"));
  return (
    <>
    <div>PaymentSuccess and your reference is {params.get("reference")}  </div>
    <Link to={"/"}>Go to home</Link>
    </>
  )
}

export default PaymentSuccess