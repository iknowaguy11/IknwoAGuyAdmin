"use client";

import { FetchBidders } from "@/_hooks/useFetch";
import { customsubmitTheme } from "@/app/customTheme/appTheme";
import { failureMessage } from "@/app/notifications/successError";
import { Alert, Button, Card, Modal } from "flowbite-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

const ModalBiddrs = ({ openModal, Buttonchoice, setOpenModal, Competitors, setCompetitors }: { openModal: boolean, Buttonchoice:string, setOpenModal: Dispatch<SetStateAction<boolean>>, Competitors: string[], setCompetitors: Dispatch<SetStateAction<string[]>> }) => {
    const { users, loading, error } = FetchBidders(Competitors);

    return (
        <>
            <Modal className="mt-4 mb-1" dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Bidders</Modal.Header>
                <Modal.Body>
                    {Buttonchoice.trim().toLocaleLowerCase()=="delete" && Competitors.length>0 ? (<Alert className="mb-2" color="failure" rounded>
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
                                    {users.map((u) => (
                                        <li className="py-3 sm:py-4">
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
                                                <Button
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

