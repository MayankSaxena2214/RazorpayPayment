import { app } from "./app.js";
import Razorpay from "razorpay";
import { dbConnection } from "./database/dbConnect.js";

// Razorpay setup
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEYID,
    key_secret: process.env.RAZORPAY_KEYSECRET,
});

// Start server
dbConnection();
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on the port ${process.env.PORT}`);
});
