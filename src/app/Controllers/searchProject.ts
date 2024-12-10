
import { db } from "@/DB/firebaseConnection";
import { collection, getDocs, query, where } from "firebase/firestore";
import { failureMessage } from "../notifications/successError";

export async function searchProjectByKey(userKey: string): Promise<boolean> {
  try {
    const projectsRef = collection(db, 'Projects');
    const q = query(projectsRef, where('AllcontactorKeys', 'array-contains', userKey?.trim()));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return false; // No project contains the user key
    }

    return true; // A project contains the user key
  } catch (error:any) {
    console.error("Error searching for key:", error);
    failureMessage("Error searching for key:"+error?.message);
    return false;
  }
}
