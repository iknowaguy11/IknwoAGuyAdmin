"use client"

import React, { useContext, useEffect, useState } from "react";
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Metadata } from "next";
import Login from "@/components/Login";
import { AppContext } from "@/Context/appContext";


export default function Home() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);
  useEffect(() => {
    const ukey = window?.sessionStorage?.getItem("ukey");
    setIsAuthenticated(!!ukey);
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <DefaultLayout>
          <ECommerce />
        </DefaultLayout>
      ) : (
        <Login />
      )}
    </>
  );
}
