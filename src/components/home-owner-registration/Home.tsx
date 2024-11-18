'use client';
import { Offline, Online } from "react-detect-offline";
import { Button, Checkbox, Label, TextInput, Card, Avatar, Alert } from 'flowbite-react';
import Link from 'next/link';
import { NetworkMessage, NetworkTitle, customCheckboxTheme, customInputBoxTheme, customselectTheme, customsubmitTheme } from '@/app/customTheme/appTheme';
import { FormEvent, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from "uuid";
import { HiInformationCircle } from 'react-icons/hi';
import { db, storage } from '../../DB/firebaseConnection';
import { failureMessage, successMessage } from "@/app/notifications/successError";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import moment from 'moment';
import ReCAPTCHA from 'react-google-recaptcha';
import validator from 'validator';

const HomeOwnerRegistration = () => {

    let image_url: string;
    const router = useRouter();
    const [avatarImage, setAvatarImage] = useState<any>(null);
    const [Imageupload, setImageupload] = useState<File | null>(null);
    const [firstName, setFristName] = useState<string>("");
    const [LastName, setLastName] = useState<string>("");
    const [HomeownerEmail, setHomeOwnerEmail] = useState<string>("");
    const [HomeOwnerpassword, setpassword] = useState<string>("");
    const [ConfirmPassword, setConfirmPassword] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [tncs, setTnCs] = useState<boolean>(false);
    const [isprocessing, Setprocessing] = useState<boolean>(false);
    const [Visibility, setVisibility] = useState<boolean>(true);
    var imgfilename: string;
    let responseMessage: string;
    const setResponseMessage = (msg: any) => responseMessage = msg;
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

    const fileInputRef = useRef<any>(null);

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            // Check if the selected file is an image and is not gif
            if (!file.type.startsWith('image/') || file.type === 'image/gif') {
                alert('Please select a non-GIF image file.');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event: any) => {
                // Set the image source to the selected file
                const imageDataUrl = event.target.result;
                setAvatarImage(imageDataUrl);
                setImageupload(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const OpenImagePicker = () => {
        // Open the file picker by clicking the hidden file input
        fileInputRef.current.click();
    };
    const handleRecaptchaChange = (token: string | null) => {
        setRecaptchaToken(token);
    };

    const RegisterMember = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Setprocessing(true);
        await uploadProfileImage();
        if (image_url !== null && image_url?.includes("http")) {
            if (IsError()) return;
            AddFirestoreData();
        } else {
            Setprocessing(false);
            failureMessage("Please select a image to upload as your profile picture and try again");
        }
    }
    const uploadProfileImage = async () => {
        if (Imageupload == null) return;
        imgfilename = Imageupload?.name + v4();
        var filepath = `ProfileImages/${imgfilename}`;
        const imageRef = ref(storage, filepath);
        try {
            await uploadBytes(imageRef, Imageupload);
            image_url = await getDownloadURL(ref(storage, filepath));
        } catch (err: any) {
            failureMessage(err?.message);
        }
    }
    const AddFirestoreData = async () => {
        try {
            const response = await fetch('https://payfastpaymentvalidator.onrender.com/verify-recaptcha/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: recaptchaToken }),
            });

            const data = await response.json();
            setResponseMessage(data.message);

            if (data.message == "reCAPTCHA verification successful" && data.success == true) {
                try {
                    const auth = getAuth();
                    const profileData = {
                        companyName: "",
                        companyEmail: HomeownerEmail.toLowerCase(),
                        phone,
                        Address: "",
                        YourName:firstName,
                        YourSurName:LastName,
                        RegistrationNo:"",
                        YourID:"",
                        formSubmitted: "Home owner form",
                        AdvertisingMsg:"",
                        profileImage: image_url,
                        certificate: "",
                        imgfilename,
                        pdffilename: "",
                        isactive: "yes",
                        membership: "homeowner",
                        Services: [],
                        tncs: tncs ? "agreed" : "not agreed but registered",
                        TimeRegistered: moment().format('MMMM Do YYYY, h:mm a')
                    }
                    let resp = await createUserWithEmailAndPassword(auth, HomeownerEmail.trim(), HomeOwnerpassword);
                    if (resp?.user?.uid !== undefined && resp?.user?.uid !== null) {
                        setDoc(doc(db, 'Users', resp?.user?.uid.trim()), profileData).then(() => {
                            Setprocessing(false);
                            successMessage("Sucessfully registered");
                            setVisibility(false);
                            setTimeout(VisibileRegisterButton, 4000);
                        }).catch((err: any) => {
                            Setprocessing(false);
                            failureMessage(err?.message);
                        });
                    }
                } catch (error: any) {
                    Setprocessing(false);
                    failureMessage(error?.message);
                }
            } else {
                Setprocessing(false);
                failureMessage(responseMessage);
            }
        } catch (error) {
            Setprocessing(false);
            console.error('Error submitting reCAPTCHA token:', error);
            setResponseMessage('Error submitting reCAPTCHA token');
            failureMessage("Error submitting reCAPTCHA token");
        }
    }

    const IsError = () => {
        let found: Boolean;
        found = false;
        if (!validator.isEmail(HomeownerEmail?.trim()) || HomeownerEmail == "" || HomeOwnerpassword == "" ||
            firstName == "" || LastName == "" || ConfirmPassword == "" ||
            !validator.isMobilePhone(phone?.trim()) || phone == "" || image_url == "" || imgfilename == "") {
            found = true;
            Setprocessing(false);
            failureMessage("Please correct your form entry.");
        }
        
        if (!tncs) {
            found = true;
            Setprocessing(false);
            failureMessage("Please agree to the terms and conditions.");
        };
        return found;
    }

    const VisibileRegisterButton = () => {
        cleanUp();
        setVisibility(true);
        router.replace('/');
    }

    const cleanUp = () => {
        setFristName("");
        setLastName("");
        setPhone("");
        setpassword("");
        setConfirmPassword("");
        image_url = "";
        imgfilename = "";
        setTnCs(false);
    }

    return (
        <div className="bg-slate-50 w-full gap-4">
            <div className="h-full flex justify-center bg-slate-50">
                <Card className='flex max-w-lg flex-grow rounded top-0 mt-2 mb-3 ml-1 mr-1'>
                    <form onSubmit={(e) => RegisterMember(e)} className="flex max-w-lg flex-col gap-4 flex-grow">
                        <div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                            <Avatar size={"lg"} className='hover:cursor-pointer' onClick={OpenImagePicker} img={avatarImage == null ? "" : avatarImage}>
                                <div className="space-y-1 font-medium dark:text-white">
                                    <div>Your Facial Image</div>
                                </div>
                            </Avatar>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="First Name *" />
                            </div>
                            <TextInput onChange={(e) => setFristName(e.target.value)} value={firstName} theme={customInputBoxTheme} color={"focuscolor"} id="name" type="text" placeholder="First Name" required shadow />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="lstN" value="Last Name *" />
                            </div>
                            <TextInput onChange={(e) => setLastName(e.target.value)} value={LastName} theme={customInputBoxTheme} color={"focuscolor"} id="lstN" type="text" placeholder="Last Name" required shadow />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="emailclient" value="Your Email *" />
                            </div>
                            <TextInput onChange={(e) => setHomeOwnerEmail(e.target.value)} value={HomeownerEmail} theme={customInputBoxTheme} color={"focuscolor"} id="emailclient" type="email" placeholder="Your Email" required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="pass" value="Your Password *" />
                            </div>
                            <TextInput onChange={(e) => setpassword(e.target.value)} value={HomeOwnerpassword} theme={customInputBoxTheme} color={"focuscolor"} id="pass" type="password" placeholder="Your Password" required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Cpass" value="Confirm Your Password *" />
                            </div>
                            <TextInput onChange={(e) => setConfirmPassword(e.target.value)} value={ConfirmPassword} theme={customInputBoxTheme} color={"focuscolor"} id="Cpass" type="password" placeholder="Confirm Your Password" required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Town" value="Phone No. *" />
                            </div>
                            <TextInput onChange={(e) => setPhone(e.target.value)} value={phone} theme={customInputBoxTheme} color={"focuscolor"} id="addr" type="tel" placeholder="Phone numbers" maxLength={10} required shadow />
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox checked={tncs} onChange={() => setTnCs(tncs ? false : true)} id="agree" theme={customCheckboxTheme} color="success" />
                            <Label htmlFor="agree" className="flex">
                                I agree with the&nbsp;
                                <Link href="/terms-and-conditions" target='_blank' className="text-appGreen hover:underline dark:text-appGreen">
                                    terms and conditions
                                </Link>
                            </Label>
                        </div>
                        {Visibility ? <Online><Button disabled={isprocessing ? true : false} isProcessing={isprocessing} theme={customsubmitTheme} type="submit" color="appsuccess">Register</Button></Online>
                            : <Alert color="warning" rounded>
                                <span className="font-medium">Welcome!</span> Thank You For Registering With Us.
                            </Alert>}
                        <Offline>
                            <Alert color="warning" icon={HiInformationCircle}>
                                <span className="font-medium">Info alert!. </span> {NetworkTitle}
                                <p className="text-xs text-gray-500">{NetworkMessage}</p>
                            </Alert></Offline>
                    </form>
                    <ReCAPTCHA
                        className='self-center'
                        sitekey={(process?.env?.NEXT_PUBLIC_SITE_KEY)?.toString() || ""}
                        onChange={(e) => handleRecaptchaChange(e)}
                    />
                </Card>
            </div>
        </div>
    );
}

export default HomeOwnerRegistration;