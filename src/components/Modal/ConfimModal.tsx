
"use client";

import { handlerDelete } from "@/app/Controllers/DeleteDocument";
import { Button, Modal } from "flowbite-react";
import { Dispatch, SetStateAction } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function ConfirmModal({size,ownerEmail,pId, message, confModal, setconfModal }: { size: string,ownerEmail:string,pId:string ,message: string, confModal: boolean, setconfModal: Dispatch<SetStateAction<boolean>> }) {
    console.log(pId);

    return (
        <>
            
            <Modal show={confModal} size={size} onClose={() => setconfModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            {message}
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => {
                                handlerDelete("Projects",pId.trim(),ownerEmail);
                                setconfModal(false);
                            }}>
                                {"Yes, I'm sure"}
                            </Button>
                            <Button color="gray" onClick={() => setconfModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
