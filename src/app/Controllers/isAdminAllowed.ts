import { doc, getDoc } from "firebase/firestore";
import { db } from "../DB/firebaseConnection";

export const isGrantedAccess = async (userKey: string) => {
    if (userKey=='' || userKey==undefined) return false;
    const docRef = doc(db, "Admins", userKey);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return false;
    return docSnap.data()?.previledges?.toLocaleLowerCase().trim() =="1" ? true : false;
}