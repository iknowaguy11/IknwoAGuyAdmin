import { Avatar, Button, Popover } from "flowbite-react";
import { IAwardproject, IOtherOffers, IProjects } from "../Interfaces/appInterfaces";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../DB/firebaseConnection";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { failureMessage, successMessage } from "@/app/notifications/successError";


export default function HoverProfile({ ofrs, project }: { ofrs: IOtherOffers, project: IProjects }) {
  const [Isprocessing, SetIsprocessing] = useState(false);
  const router=useRouter();
  const AcceptOffer = () => {
    SetIsprocessing(true);
    const upt = {
      Status: "Closed",
      winnerId: ofrs?.CompanyKey
    }

    setDoc(doc(db, 'Projects', project?.ProjectId?.trim()), upt, { merge: true }).then(() => {
      SetIsprocessing(false);
      successMessage("Projects awarded to a contractor");
      let msg:IAwardproject ={
        project:project.task,
        homeowmer:project.owner,
        phoneNum:project.phone
    };
      //SendMailAcceptence(ofrs?.companyEmail?.trim(), ofrs?.companyName !== null ? ofrs?.companyName : ofrs.firstName, msg, "Project Offer");
    }).catch((error: any) => {
      SetIsprocessing(false);
      failureMessage("Error: " + error?.message);
    });


  }
  return (
    <Popover placement="left" trigger="hover"
      aria-labelledby="profile-popover"
      content={
        <div className="w-64 p-3">
          <div className="mb-2 flex items-center justify-between">
            <a href="#">
              <img
                className="h-10 w-10 rounded-full"
                src={ofrs?.profileImage}
                alt="contract potrait"
              />
            </a>
            <div className="flex gap-2">
              <Button onClick={()=>router?.push('profile/'+ofrs.CompanyKey)}
                size="xs"
                type="button"
                className="rounded-lg bg-blue-700 text-xs text-nowrap ml-1 text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Ratings & Reviews
              </Button>
              {/* <Button
                isProcessing={Isprocessing} disabled={Isprocessing}
                onClick={() => AcceptOffer()}
                size="xs"
                type="button"
                className="rounded-lg bg-blue-700 text-xs text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Accept
              </Button> */}
            </div>
          </div>
          <p>{"Representative : " + ofrs?.firstName}</p>
          <p id="profile-popover" className="text-base font-semibold leading-none text-gray-900 dark:text-white">
            {ofrs?.companyName !== "" && ofrs?.companyName !== null ? ofrs?.companyName : null}
          </p>
          {ofrs?.Address !== "" && ofrs?.Address !== null ? <p className="text-xs text-nowrap">Address : {ofrs?.Address}</p> : null}
          <p className="mb-3 text-sm font-normal">
            <a href="#" className="hover:underline">
              {ofrs?.companyEmail}
            </a>
          </p>

          <ul className="flex text-sm">

            <li>
              <a href="#" className="hover:underline">
                <span>Offer : </span>
                <span className="font-semibold text-gray-900 dark:text-white">R{ofrs?.OfferMade}</span>

              </a>
            </li>
          </ul>
        </div>
      }
    >
      <button type="button" className="bg-transparent"><Avatar img={ofrs?.profileImage} alt="avatar of contractor" rounded stacked /></button>
    </Popover>
  );
}
