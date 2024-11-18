import axios from "axios";
import { failureMessage, successMessage } from "../notifications/successError";

export const SendEmailProjectDeleted=async(ownerEmail:string,subject:string)=>{
    try {
        const upt={
            ownerEmail:ownerEmail,
            subject:subject
        }
        const res=await axios.post('https://payfastpaymentvalidator.onrender.com/projdelete',upt);
        if(res.status==200){
            successMessage(String(res.data.message));
            window.location.reload();
        }else{
            failureMessage(String(res.data.message));
        }
    } catch (error:any) {
        failureMessage(String(error.message));
    }

}