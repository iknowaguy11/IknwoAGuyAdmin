import { db } from "@/DB/firebaseConnection";
import { collection, addDoc } from "firebase/firestore"; 
import { failureMessage, successMessage } from "../notifications/successError";

export const AddDocument=async(tableRef:string,service_or_Province:string)=>{
    try {
        if(service_or_Province?.trim()!=="" && tableRef?.trim()!==""){
            const docRef = await addDoc(collection(db, tableRef.trim()), tableRef=="Services" ? {
                ServiceType: service_or_Province,
                actualTask: []
              }: tableRef=="Provinces" ? {
                ProvinceName: service_or_Province,
                Towns: []
              }:null);
        
              if(docRef.id){
                successMessage("Added succesful");
              }
        }else{
            failureMessage("Please correct your form input or refresh page.");
        }
        
    } catch (error:any) {
        failureMessage(String(error.message));
    }
}