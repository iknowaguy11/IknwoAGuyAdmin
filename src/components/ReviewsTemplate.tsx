import { Avatar, Button } from "flowbite-react";
import { Rating, RatingStar } from "flowbite-react";
import { HiTrash } from "react-icons/hi";

import { IReviews } from "../Interfaces/appInterfaces";
import { useContext } from "react";
import { AppContext } from "../Context/appContext";
import { handlerDelete } from "@/app/Controllers/DeleteDocument";
import { customsubmitTheme } from "@/app/customTheme/appTheme";

const ReviewsTemplate = ({ revdata, contractorId }: { revdata: IReviews, contractorId: string }) => {
    const{ukey}=useContext(AppContext);
    return (
        <div className='w-full bg-white flex flex-col items-start rounded border z-10 p-2 m-2'>
            <Avatar img={revdata?.profilePicReviewer} rounded>
                <div className="space-y-1 font-medium dark:text-white">
                    <div>{revdata?.homeOwnerName}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        <Rating>
                            <RatingStar />
                            <RatingStar />
                            <RatingStar />
                            <RatingStar />
                            <RatingStar filled={false} />
                        </Rating>
                        {revdata?.dateReviewed}</div>
                </div>
            </Avatar>
            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-full h-1 m-4 bg-gray-200 border-0 rounded dark:bg-gray-700" />
                <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
                    <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                    </svg>
                </div>
            </div>
            
            <p className="w-full">{revdata?.comment}</p>
            {
                ukey===revdata?.homeOwnerId ? 
                <Button onClick={()=>handlerDelete("Ratings",revdata.Id,"")} color="success" size={"sm"} theme={customsubmitTheme} pill>
                <HiTrash className="mr-2 h-5 w-5" /> remove
            </Button> 
            : null
            }
           
        </div>
    );
}

export default ReviewsTemplate;