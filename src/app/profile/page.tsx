'use client';

import { useContext, useEffect } from "react";

import { useRouter } from "next/navigation";
import { AppContext } from "@/Context/appContext";
import { useFetchUserAccount } from "@/_hooks/useFetch";
import ContractorProfile from "@/components/ContractorProfile";
import HomeOwnerProfile from "@/components/HomeOwnerProfile";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

const Profile = () => {

    const { clientKey,isAuthenticated } = useContext(AppContext);
    const { UserData, accountError, isGettingAccount } = useFetchUserAccount(clientKey);
    const router = useRouter();
    useEffect(()=>{
        if(isAuthenticated==false || clientKey=="" || clientKey==null){
            window.location.replace('/');
        }
    })
    useEffect(() => {
        if (window?.sessionStorage?.getItem("ukey") == undefined || window?.sessionStorage?.getItem("ukey") == null || window?.sessionStorage?.getItem("ukey") == "") {
            //router.replace('/');
            window.location.replace('/');
            
        }

    }, [router]);
    return (
        <>
            {
                isGettingAccount ? <p>Loading profile data</p> :
                    <DefaultLayout>

                        <div className={UserData[0]?.membership == "contractor" ? "w-full h-full mt-16 mb-8 grid lg:grid-cols-2 xl:lg:grid-cols-2 md:lg:grid-cols-2 sm:lg:grid-cols-1 items-center justify-items-center justify-center" : "w-full h-full mt-16 mb-8 flex items-center justify-items-center justify-center"}>
                            {
                                UserData[0]?.membership == "contractor" ? <ContractorProfile UserData={UserData} /> : UserData[0]?.membership == "homeowner" ? <HomeOwnerProfile UserData={UserData} /> : null
                            }
                        </div>
                    </DefaultLayout>
            }
        </>
    );
}

export default Profile;