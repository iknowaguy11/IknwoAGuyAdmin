import { doc, setDoc } from "firebase/firestore";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { db, storage } from "../DB/firebaseConnection";
import { failureMessage, successMessage } from "../notifications/successError";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export const updateProfile = async (e: FormEvent<HTMLFormElement>, router: any, updateData: any, _id: string,Imageupload:File | null,SetIsprocessing:Dispatch<SetStateAction<boolean>>) => {
    e.preventDefault();

    var imgfilename: string;
    imgfilename = "";
    let image_url: string;
    image_url = "";
    if (Imageupload == null) {
        SetIsprocessing(true);
        setDoc(doc(db, 'Users', _id.trim()), updateData, { merge: true }).then(() => {
            SetIsprocessing(false);
            successMessage("Updated profile");
            window?.location?.reload();
            router.refresh();
        }).catch((error: any) => {
            SetIsprocessing(false);
            failureMessage("Error: " + error?.message);
        });

    } else {
        imgfilename = Imageupload?.name + v4();
        var filepath = `ProfileImages/${imgfilename}`;
        const imageRef = ref(storage, filepath);
        try {
            SetIsprocessing(true);
            await uploadBytes(imageRef, Imageupload);
            image_url = await getDownloadURL(ref(storage, filepath));
            if (image_url !== null && image_url?.includes("http")){
                setDoc(doc(db, 'Users', _id.trim()), {...updateData,imgfilename,profileImage:image_url}, { merge: true }).then(() => {
                    SetIsprocessing(false);
                    successMessage("Updated profile");
                    window?.location?.reload();
                    router.refresh();
                }).catch((error: any) => {
                    SetIsprocessing(false);
                    failureMessage("Error: " + error?.message);
                });
            }
        } catch (err: any) {
            SetIsprocessing(false);
            failureMessage(err?.message);
        }
    }

}

