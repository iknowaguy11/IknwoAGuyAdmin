import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";

export const metadata: Metadata = {
  title:
    "Iknow A Guy Dashboard | Find Trusted, Reliable Contractors For Your Home",
  description: "Post a project and tell us what you need done. Receive up to 5 bids from home services professionals. Hire the person who best suits your needs and budget.",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
