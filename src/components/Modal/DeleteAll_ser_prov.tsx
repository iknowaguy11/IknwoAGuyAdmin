
"use client";

import { handlerDelete } from "@/app/Controllers/DeleteDocument";
import { Button, Modal } from "flowbite-react";
import { Dispatch, SetStateAction, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function Del_All({ delParent, setDeleteParent, provDeleteId, table }: { delParent: boolean, setDeleteParent: Dispatch<SetStateAction<boolean>>, provDeleteId: string, table: string }) {

    return (
        <>
            <Modal show={delParent} size="md" onClose={() => setDeleteParent(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this ?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => {
                                handlerDelete(table, provDeleteId, "");
                                setDeleteParent(false);
                            }}>
                                {"Yes, I'm sure"}
                            </Button>
                            <Button color="gray" onClick={() => setDeleteParent(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
