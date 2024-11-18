import { deleteDoc, doc} from "firebase/firestore";
import { failureMessage, successMessage } from "../notifications/successError";
import { db } from "../DB/firebaseConnection";
import { SendEmailProjectDeleted } from "./SendEmailProjectDeleted";

export function handlerDelete(collectionTable: string, key: string,ownerEmail:string) {
  deleteDoc(doc(db, collectionTable.trim(), key)).then(() => {
    successMessage('Item Removed');
    // if(ownerEmail!=="" && ownerEmail!==undefined && ownerEmail!==""){
    //   SendEmailProjectDeleted(ownerEmail,"Project Deleted");
    // }
    console.log(key);
  }).catch((err) => {
    failureMessage(String(err.message));
  });
}
