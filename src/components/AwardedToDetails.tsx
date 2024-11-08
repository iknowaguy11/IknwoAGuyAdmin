import { Avatar, Button, Modal, Rating, Textarea } from "flowbite-react";
import { useFetchUserAccount } from "../_hooks/useFetch";
import { FormEvent, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../DB/firebaseConnection";
import moment from 'moment';
import { useRouter } from "next/navigation";
import { failureMessage, successMessage } from "@/app/notifications/successError";
import { customInputBoxTheme, customsubmitTheme } from "@/app/customTheme/appTheme";
const AwardedToDetails = ({ contractorId, homeOwnerId, owner, profpic }: { contractorId: string, homeOwnerId: String, owner: string, profpic: string }) => {
    const [openModal, setOpenModal] = useState(false);
    const { UserData } = useFetchUserAccount(contractorId);
    const [FilledOne, setFilledOne] = useState(false);
    const [FilledTwo, setFilledTwo] = useState(false);
    const [FilledThree, setFilledThree] = useState(false);
    const [FilledFour, setFilledFour] = useState(false);
    const [FilledFive, setFilledFive] = useState(false);
    const [Comment, SetComment] = useState("");
    const [Isprocessing, SetIsprocessing] = useState(false);
    const router=useRouter();
    const SendReview = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            SetIsprocessing(true);
            const myCollection = collection(db, 'Ratings');
            const myDocumentData = {
                contractorId: contractorId,
                homeOwnerId: homeOwnerId,
                homeOwnerName: owner,
                dateRated: moment().format('MMMM Do YYYY, h:mm a'),
                profilePicReviewer: profpic,
                stars: FilledFive ? "5" : FilledFour ? "4" : FilledThree ? "3" : FilledTwo ? "2" : FilledOne ? "1" : "0",
                comment: Comment?.trim() == "" ? "no comment" : Comment.trim()
            };
            const newDocRef = await addDoc(myCollection, myDocumentData);
            if (newDocRef?.id) {
                SetIsprocessing(false);
                SetComment("");
                setOpenModal(false);
                successMessage("Sucessfully Added a Review");
            }
        } catch (error: any) {
            SetIsprocessing(false);
            failureMessage(String(error?.message));
        }
    }
    return (
        <>
            <Avatar img={UserData[0]?.profileImage} rounded>
                <div className="space-y-1 font-medium dark:text-white">
                    <div>{UserData[0]?.companyName == "" ? UserData[0]?.YourName : UserData[0]?.companyName}</div>
                    {/* <div className="text-sm text-gray-500 dark:text-gray-400">{UserData[0]?.membership}</div> */}
                </div>
                <div className="flex gap-2">
                {/* <Button onClick={() => setOpenModal(true)} color="success" size={"xs"} pill>
                    Rate
                </Button> */}
                <Button onClick={() => router?.push('profile/' +decodeURIComponent(UserData[0]?.Id))}
                    size="xs"
                    type="button"
                    className="rounded-lg bg-blue-700 text-xs text-nowrap ml-1 text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Ratings & Reviews
                </Button>
                </div>
            </Avatar>
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center gap-2">
                        <Avatar img={UserData[0]?.profileImage} rounded></Avatar>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Your rating will be much appriciated.
                        </h3>
                        <form onSubmit={(e) => SendReview(e)}>
                            <Rating size="md" className="items-center justify-center m-2">
                                <Rating.Star onClick={() => setFilledOne(!FilledOne)} filled={FilledOne || FilledTwo || FilledThree || FilledFour || FilledFive} />
                                <Rating.Star onClick={() => setFilledTwo(!FilledTwo)} filled={FilledTwo || FilledThree || FilledFour || FilledFive} />
                                <Rating.Star onClick={() => setFilledThree(!FilledThree)} filled={FilledThree || FilledFour || FilledFive} />
                                <Rating.Star onClick={() => setFilledFour(!FilledFour)} filled={FilledFour || FilledFive} />
                                <Rating.Star onClick={() => setFilledFive(!FilledFive)} filled={FilledFive} />
                            </Rating>
                            <h4>{FilledFive ? "5 stars" : FilledFour ? "4 stars" : FilledThree ? "3 stars" : FilledTwo ? "2 stars" : FilledOne ? "1 star" : "0 star(s)"}</h4>
                            <Textarea className="m-2" value={Comment} onChange={(e) => SetComment(e?.target?.value)} theme={customInputBoxTheme} color={"success"} id="comment" placeholder="Leave a comment..." required rows={3} />
                            <div className="flex justify-center gap-4">
                                <Button isProcessing={Isprocessing} disabled={Isprocessing} type="submit" color="success" theme={customsubmitTheme}>
                                    {"Yes, Rate"}
                                </Button>
                                <Button color="gray" onClick={() => setOpenModal(false)}>
                                    No, Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>

    );
}

export default AwardedToDetails;