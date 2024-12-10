
import { customModal } from "@/app/customTheme/appTheme";
import { Modal, Spinner } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
const ModalSpinnerDelete = ({ isDeleteUser }: { isDeleteUser: boolean }) => {
    return (
        <>
            <Modal theme={customModal} show={isDeleteUser} size="md" popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Attempting to delete user...
                        </h3>
                        <Spinner size="xl" color="failure" aria-label="Failure spinner example" />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalSpinnerDelete;