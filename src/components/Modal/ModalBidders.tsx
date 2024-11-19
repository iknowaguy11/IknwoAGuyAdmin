"use client";

import { FetchBidders } from "@/_hooks/useFetch";
import { BalanceCheckNupdate } from "@/app/Controllers/RefundToken";
import { customsubmitTheme } from "@/app/customTheme/appTheme";
import { IProjects } from "@/Interfaces/appInterfaces";
import { Alert, Button, Card, Modal } from "flowbite-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

const ModalBiddrs = ({ openModal, Buttonchoice, setOpenModal, projectData, setprojectData ,
     
}: { openModal: boolean, Buttonchoice:string, setOpenModal: Dispatch<SetStateAction<boolean>>, projectData:IProjects, setprojectData: Dispatch<SetStateAction<IProjects|any>>
}) => {
    const { users} = FetchBidders(projectData?.AllcontactorKeys);

    return (
        <>
            <Modal className="mt-4 mb-1" show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Bidders</Modal.Header>
                <Modal.Body>
                    {Buttonchoice.trim().toLocaleLowerCase()=="delete" && projectData?.AllcontactorKeys.length>0 ? (<Alert className="mb-2" color="failure" rounded>
                            <span className="font-medium">Info alert!</span> This project appears to be active and has bidders on it. Refund all bidders before attempting to delete it.
                        </Alert>) : null}
                    <div className="space-y-6">
                        
                        <Card className="">
                            <div className="mb-4 flex items-center justify-between">
                                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Bidders Found</h5>
                                <a href="#" className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                    {""}
                                </a>
                            </div>
                            <div className="flow-root">
                                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {users.map((u,index) => (
                                        <li key={index} className="py-3 sm:py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="shrink-0">
                                                    <Image
                                                        alt="Neil image"
                                                        height="32"
                                                        src={u?.profileImage}
                                                        width="32"
                                                        className="rounded-full"
                                                    />
                                                    <p>{u.formSubmitted}</p>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{u?.formSubmitted == "Registered Company" ? u?.companyName : u?.YourName + " " + u?.YourSurName}</p>
                                                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">{u?.companyEmail}</p>
                                                </div>
                                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{""}</div>
                                                <Button onClick={()=>BalanceCheckNupdate(u.id,u.companyEmail,setOpenModal, projectData.ProjectId, projectData.budget, projectData.otherOffers, projectData.bestOffer, projectData.bstOffrId,projectData.AllcontactorKeys,projectData.phone,projectData.task,projectData.owner )}
                                                    size="xs" className="bg-appGreen mt-1" theme={customsubmitTheme} type="submit" color="appsuccess">Refund Token</Button>
                                                    
                                            </div>
                                        </li>
                                    ))}

                                </ul>
                            </div>
                        </Card>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}
                        size="xs" className="bg-appGreen mt-1" theme={customsubmitTheme} type="submit" color="appsuccess">Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalBiddrs;

