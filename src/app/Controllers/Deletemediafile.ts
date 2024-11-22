import { collection, onSnapshot, query, setDoc, where,doc } from "firebase/firestore";
import { failureMessage, successMessage } from "../notifications/successError"
import { getStorage, ref, deleteObject } from "firebase/storage";
import { db } from "@/DB/firebaseConnection";

export const DeleteFirebase_file = (category:string,fileName:string,folder:string,url:string,CollectionTable:string) => {
    try {
        const storage = getStorage();
        // Create a reference to the file to delete
        let desertRef:any;
        desertRef=null;
        if(category!==""){
            console.log(fileName);
            desertRef = ref(storage, `${CollectionTable}/${category}/${fileName}`);
        }else if(category==""){
            desertRef = ref(storage, `${CollectionTable}/${fileName}`);
        }

        // Delete the file
        deleteObject(desertRef).then(() => {
            // File deleted successfully
            UpdateCollection(category,CollectionTable,url);

        }).catch((error:any) => {
            // Uh-oh, an error occurred!
            failureMessage(String("Storage Error 1: "+error?.message));
        });
    } catch (error: any) {
        failureMessage(String("Storage Error 2: "+error?.message));
    }
}

export const UpdateCollection=(category:string,CollectionTable:string,url_p:any)=>{
    const q = query(collection(db, CollectionTable.trim()), where("category", "==", category.trim()));
    const unsubscribe = onSnapshot(q, (querySnapshot:any) => {
            let temp:any = [];
            querySnapshot.forEach((doc_:any) => {
                const mediagroupID=doc_.id;
                const tempMdia= doc_?.data().media?.filter((u:any)=>u.url!==url_p);
                setDoc(doc(db, 'Media_Inspirations', mediagroupID.trim()), {media:tempMdia}, { merge: true }).then(()=>{
                    successMessage("File deleted successfully");
                    window.location.reload();
                }).catch((error:any)=>{
                    failureMessage(String("Firetore Database: "+error?.message));
                })
            });
        });

        return () => unsubscribe();
}