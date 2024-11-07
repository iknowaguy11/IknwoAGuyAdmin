
"use client";
import { Offline, Online } from "react-detect-offline";
import { Alert, Button, FooterDivider, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { NetworkMessage, NetworkTitle, customInputBoxTheme, customsubmitTheme } from "../customTheme/appTheme";
import { HiMail } from "react-icons/hi";
import { FormEvent, useContext, useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../DB/firebaseConnection";
import { useRouter } from "next/navigation";
import { HiInformationCircle } from 'react-icons/hi';
import { failureMessage, successMessage } from "../notifications/successError";
import { AppContext } from "../../Context/appContext";
import { QuotaExceededError } from "../../Interfaces/appInterfaces";
import { isGrantedAccess } from "../Controllers/isAdminAllowed";
import validator from 'validator';

export default function Login() {
    const { setLoggedIn } = useContext(AppContext);
    const [username, SetUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setloading] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        if (window?.sessionStorage?.getItem("ukey") !== undefined && window?.sessionStorage?.getItem("ukey") !== null && window?.sessionStorage?.getItem("ukey") !== "") {
            router.replace('/');
        }
    },[router]);
    const AttemptLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username !== "" && password !== "") {
            if(!validator.isEmail(username?.trim())) return failureMessage(String("Invalid Email format"));
            try {
                const auth = getAuth(app);
                setloading(true);
                let resp = await signInWithEmailAndPassword(auth, username.trim(), password);
                if (resp?.user?.uid !== "") {
                    setloading(false);
                    SetUserName("");
                    setPassword("");
                    try {
                        if(await isGrantedAccess((resp?.user?.uid?.trim()).toString())){
                            window.sessionStorage.setItem("ukey", resp?.user?.uid?.trim());
                            successMessage("Succesful login in...");
                            setLoggedIn(true);
                            router.replace("/");
                        }else{
                            failureMessage("Your account is suspended or still under admin review.\n Contact Adminstrator for more details");
                            setLoggedIn(false);
                            auth.signOut();
                        }
                        
                    } catch (error: QuotaExceededError | any) {
                        failureMessage(String(error?.message));
                        console.log(error);
                    }

                } else {
                    setloading(false);
                    failureMessage(String("No user found"));
                }
            } catch (error: any) {
                setPassword("");
                setloading(false);
                failureMessage(String(error?.message));
            }
        }
    }
    return (
        <div className="w-full h-full mt-20 mb-8 flex items-center justify-center">
            <div>
                <form onSubmit={(e) => AttemptLogin(e)} className="flex max-w-md flex-col gap-4 w-screen flex-grow border p-7 rounded-md shadow-md">
                    <h2 className="text-lg">Log Into Your Account</h2>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your Email" />
                        </div>
                        <TextInput onChange={(e) => SetUserName(e.target.value)} value={username} theme={customInputBoxTheme} color={"focuscolor"} icon={HiMail} id="email1" type="email" placeholder="name@mailprovider.com" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Your password" />
                        </div>
                        <TextInput onChange={(e) => setPassword(e.target.value)} value={password} theme={customInputBoxTheme} color={"focuscolor"} id="password1" type="password" required />
                    </div>
                    <Online>
                        <Button isProcessing={loading} disabled={loading} theme={customsubmitTheme} type="submit" color="appsuccess">Log In</Button>
                    </Online>
                    <Offline>
                        <Alert color="warning" icon={HiInformationCircle}>
                            <span className="font-medium">Info alert!</span> {NetworkTitle}
                            <p className="text-xs text-gray-500">{NetworkMessage}</p>
                        </Alert></Offline>
                    <FooterDivider></FooterDivider>
                    <div className="flex justify-between">
                        
                        <Link href={"/forgotpassword"}>Forgot password?</Link>
                    </div>

                </form>
            </div>
        </div>

    );
}
