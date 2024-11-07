import { deleteDoc, doc} from "firebase/firestore";
import { failureMessage, successMessage } from "../notifications/successError";
import { db } from "../DB/firebaseConnection";

export function handlerDelete(collectionTable: string, key: string) {
  deleteDoc(doc(db, collectionTable.trim(), key)).then(() => {
    successMessage('Item Removed');
  }).catch((err) => {
    failureMessage(String(err.message));
  });
}
