
"use client";
import { Offline, Online } from "react-detect-offline";
import { Alert, Button, FooterDivider, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { NetworkMessage, NetworkTitle, customInputBoxTheme, customsubmitTheme } from "../customTheme/appTheme";
import { HiInformationCircle, HiMail } from "react-icons/hi";
import { useState } from "react";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { failureMessage, successMessage } from "../notifications/successError";
import { app } from "../DB/firebaseConnection";
import validator from 'validator';

export default function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [loading, setloading] = useState(false);
    const SendResetLink = () => {
        if (email !== "") {
            if(!validator.isEmail(email?.trim())) return failureMessage(String("Invalid Email format."));
            const auth = getAuth(app);
            setloading(true);
            sendPasswordResetEmail(auth, email.trim()).then(() => {
                successMessage('Password reset link has been sent to :' + email);
                setloading(false);
                setEmail("");
            }).catch((err) => {
                failureMessage(String(err));
                setloading(false);
            });
        } else {
            failureMessage("Email is required");
            setloading(false);
        }
    }
    return (
        <div className="w-full h-full mt-20 mb-8 flex items-center justify-center">
            <div>
                <form className="flex max-w-md flex-col gap-4 w-screen flex-grow border p-7 rounded-md shadow-md">
                    <h2 className="text-lg font-bold">Send Password Reset</h2>
                    <p className="text-gray-600 font-light">Enter your email address below. We`ll look for your account and send you a password reset email.</p>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your Email" />
                        </div>
                        <TextInput value={email} onChange={(e) => setEmail(e.target.value)} theme={customInputBoxTheme} color={"focuscolor"} icon={HiMail} id="email1" type="email" placeholder="name@mailprovider.com" required />
                    </div>
                    <Online><Button isProcessing={loading} disabled={loading} onClick={() => SendResetLink()} theme={customsubmitTheme} type="button" color="appsuccess">Sent Password Reset</Button></Online>
                    <Offline>
                        <Alert color="warning" icon={HiInformationCircle}>
                            <span className="font-medium">Info alert!</span> {NetworkTitle}
                            <p className="text-xs text-gray-500">{NetworkMessage}</p>
                        </Alert></Offline>
                    <FooterDivider></FooterDivider>
                    <div className="flex justify-end gap-2">
                        <p>Already have an account?</p> <Link className="text-appGreen" href={"/login"}> Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
