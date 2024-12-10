"use client";
import React, { useContext, useEffect } from "react";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import TableThree from "../Tables/TableThree";
import TableProjects from "../Tables/TableProjects";
import { useRouter } from "next/navigation";
import { AppContext } from "@/Context/appContext";
import SerachEngine from "../SearchEngine";
import Inspirations from "../Inspirations";

const ECommerce: React.FC = () => {
  const router = useRouter();
  const {Tab}=useContext(AppContext);
    useEffect(() => {
        if (window?.sessionStorage?.getItem("ukey") == undefined || window?.sessionStorage?.getItem("ukey") == null || window?.sessionStorage?.getItem("ukey") == "") {
            router.replace('/');
            window.location.href='/';
        }

    }, [router]);
  return (
    <>
      <DataStatsOne />
      <div className="gap-3 pt-3 pb-3">

      {
        Tab=="first" ?
        (
          <>
        <TableThree />
        <TableProjects />
        </>
        ) : Tab=="second" ?
        (
          <SerachEngine/>
        ) : Tab=="third" ? 
        (<Inspirations/>) :null
      }
      </div>
    </>
  );
};

export default ECommerce;
