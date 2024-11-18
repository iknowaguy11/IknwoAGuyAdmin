'use client';
import ContractorRegistration from "@/components/contractor-registration/Contractor";
import HomeOwnerRegistration from "@/components/home-owner-registration/Home";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

const Register = () => {
    return ( 
        <DefaultLayout>
        <Tabs aria-label="Tabs with underline" variant="underline">
      <Tabs.Item active title="Home-owner" icon={HiUserCircle}>
        {
            <HomeOwnerRegistration/>
        }
      </Tabs.Item>
      <Tabs.Item title="Cotractor" icon={HiUserCircle}>
        
        {
            <ContractorRegistration/>
        }
      </Tabs.Item>
      
    </Tabs>
        </DefaultLayout>
     );
}
 
export default Register;