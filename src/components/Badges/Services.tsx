
"use client";

import { customsubmitTheme, NetworkMessage, NetworkTitle } from "@/app/customTheme/appTheme";
import { failureMessage, successMessage } from "@/app/notifications/successError";
import { db } from "@/DB/firebaseConnection";
import { doc, setDoc } from "firebase/firestore";
import { Alert, Badge, Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { Offline, Online } from "react-detect-offline";
import { HiTrash } from "react-icons/hi";
import { HiInformationCircle } from 'react-icons/hi';

export function SubServices({table, filteredDeleteTowns,setfilteredDeleteTowns,provDeleteId,setProvDeleteId }:
   {table:string, filteredDeleteTowns: any,setfilteredDeleteTowns:Dispatch<SetStateAction<any>>,provDeleteId:string,setProvDeleteId:Dispatch<SetStateAction<string>> }) {
    const [Isprocessing,SetIsprocessing]=useState<boolean>(false);
    const router=useRouter();
    
    const HandleUpdate=()=>{
      
      setDoc(doc(db, table.trim(), provDeleteId.trim()), table=="Provinces" ? {Towns:filteredDeleteTowns} : table=="Services" ? {actualTask:filteredDeleteTowns}:null, { merge: true }).then(() => {
        SetIsprocessing(false);
        successMessage("Updated Services data");
        router.refresh();
    }).catch((error: any) => {
        SetIsprocessing(false);
        failureMessage("Error: " + error?.message);
    });
    }
  return (
    <div className="flex flex-wrap gap-2 m-2">
      {
        filteredDeleteTowns?.map((i: any,index:any) => (
          <Badge color="warning" key={index} onClick={()=>
            setfilteredDeleteTowns(filteredDeleteTowns.filter((ar:any)=>ar.task!==i.task))} className="hover:cursor-pointer" icon={HiTrash}>{i.task}</Badge>
        ))
      }
      {
        filteredDeleteTowns?.length >= 0 ? (
          <>
            <Online>
              <Button onClick={()=>HandleUpdate()} isProcessing={Isprocessing} disabled={Isprocessing} theme={customsubmitTheme} type="submit" color="appsuccess">
                Update sub-sevices
              </Button>
            </Online>
            <Offline>
              <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Info alert! </span>{NetworkTitle}
                <p className="text-xs text-gray-500">{NetworkMessage}</p>
              </Alert>
            </Offline>
          </>
        ) : null
      }

    </div>
  );
}
