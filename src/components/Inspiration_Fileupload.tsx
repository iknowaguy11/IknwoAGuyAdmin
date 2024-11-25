"use client";

import { customsubmitTheme } from "@/app/customTheme/appTheme";
import { failureMessage, successMessage } from "@/app/notifications/successError";
import { db, storage } from "@/DB/firebaseConnection";
import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Button, FileInput, Label } from "flowbite-react";
import { useState } from "react";
import { v4 } from "uuid";

const InspirationFileUpload = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);

    const validateImageFile = (file: File): boolean => {
        const maxFileSizeMB = 5; // Restrict to 5MB
        const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];

        if (!allowedFileTypes.includes(file.type)) {
            alert('Only JPEG, PNG, and JPG files are allowed.');
            return false;
        }
        if (file.size > maxFileSizeMB * 1024 * 1024) {
            alert(`File size should not exceed ${maxFileSizeMB} MB.`);
            return false;
        }
        return true;
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && validateImageFile(file)) {
            setImageFile(file);
        }
    };

    const uploadProfileImage = async () => {
        if (!imageFile) {
            alert("No file selected.");
            return;
        }

        const filename = `${imageFile.name}_${v4()}`;
        const filepath = `Media_Inspirations/Kitchenz/${filename}`;
        const imageRef = ref(storage, filepath);

        try {
            await uploadBytes(imageRef, imageFile);
            const imageUrl = await getDownloadURL(imageRef);

            if (imageUrl) {
                const mediaCollection = collection(db, "Media_Inspirations");
                const q = query(mediaCollection, where("category", "==", "Kitchenz"));

                const snapshot = await getDocs(q);

                if (snapshot.empty) {
                    await addDoc(mediaCollection, {
                        category: "Kitchen",
                        media: [{ category: "Kitchen", name: filename, url: imageUrl }],
                    });
                    successMessage("Image successfully uploaded and added.");
                    window.location.reload();
                } else {
                    const docId = snapshot.docs[0].id;
                    const existingMedia = snapshot.docs[0].data().media || [];
                    await setDoc(
                        doc(db, "Media_Inspirations", docId),
                        { media: [...existingMedia, { category: "Kitchen", name: filename, url: imageUrl }] },
                        { merge: true }
                    );
                    successMessage("Image successfully added to the existing collection.");
                    window.location.reload();
                }
            }
        } catch (error: any) {
            failureMessage(`Error uploading image: ${error.message}`);
        }
    };

    return (
        <div>
            <Label htmlFor="file-upload-helper-text" value="Upload file" />
            <FileInput
                onChange={handleImageChange}
                id="file-upload-helper-text"
                accept="image/jpeg, image/png, image/jpg"
                helperText="Allowed formats: JPEG, PNG, JPG"
            />
            <Button
                onClick={uploadProfileImage}
                size="xs"
                className="text-nowrap"
                theme={customsubmitTheme}
                color="appsuccess"
            >
                UPLOAD
            </Button>
        </div>
    );
};

export default InspirationFileUpload;
