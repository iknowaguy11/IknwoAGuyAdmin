import axios from "axios"
import { failureMessage, successMessage } from "../notifications/successError";

export const SendEmailToBidder=async(companyEmail:string,task:string,owner:string)=>{
    try {
        const upt={
            companyEmail:companyEmail,
            task:task,
            owner:owner,
            subject:'Project Refund'
        }
        const res=await axios.post('https://iknowaguyapi.onrender.com/refundmessage',upt);
        if(res.status==200){
            successMessage(String(res.data.message));
        }else{
            failureMessage(String(res.data.message));
        }
    } catch (error:any) {
        failureMessage(String(error.message));
    }

}


