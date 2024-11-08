
import { Badge, Button } from "flowbite-react";
import { HiOutlineBriefcase, HiCollection, HiLocationMarker, HiCash, HiClock } from 'react-icons/hi';
import Image from "next/image";
import { IProjects } from "../Interfaces/appInterfaces";
import ShowContactDetails from "./ShowContactDetails";
import { customsubmitTheme } from "@/app/customTheme/appTheme";

const MyBids = ({ item, MyKey }: { item: IProjects, MyKey: string }) => {
    return (
        <div className="border w-full z-10 m-2 p-1 rounded-md shadow">
            <div className="gridCont grid">
                <div className="imageNownwer">
                    <Image
                        //{item?.Status == "Closed" && item?.winnerId == MyKey ? item.Profpic : caponlycrop}
                        src={item.Profpic}
                        alt="company logo"
                        height={40}
                        width={40}
                        className="aspect-square rounded border mt-2 mb-2 mr-2"
                    />
                </div>

                <div className="items-center gap-1">
                    <Badge className="w-fit p-1" color={"gray"} icon={HiLocationMarker}> {item?.addrs}</Badge>
                    <Badge className="w-fit p-1 mt-1" color={"gray"} icon={HiClock}> {item?.postTime}</Badge>
                    <Badge className="w-fit p-1 mt-1" color={"success"} icon={HiClock}> {"Status: " + item?.Status}</Badge>
                </div>

            </div>
            <Badge icon={HiOutlineBriefcase} color={"gray"} className="w-fit p-1 mt-1"> Job/Project : {item?.task}</Badge>
            <Badge icon={HiCash} color={"gray"} className="w-fit p-1 mt-1"> Budget : R{parseFloat(item?.budget).toFixed(2)}</Badge>
            <Badge icon={HiCash} color={"gray"} className="w-fit p-1 mt-1"> Competing Offer : R{item?.bestOffer} {item?.winnerId == MyKey && item?.Status == "Closed" ? "🤝🏽✅" : null}</Badge>
            <p className="text-clip text-wrap">{item?.description}</p>
            <Badge icon={HiCollection} color={"light"} className="w-fit p-1 mt-1"> N0. of Bids Received : {item?.AllcontactorKeys?.length}</Badge>
            {!item.AllcontactorKeys.includes(MyKey?.trim()) && <Button className="place-self-end" theme={customsubmitTheme} type="button" color="appsuccess">Bid</Button>}

            {
                item?.winnerId == MyKey && item.Status.toLowerCase() == "closed" ?
                    (
                        <div className="w-64 p-3">
                            <div className="mb-2 flex items-center justify-between">
                                <a href="#">
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src={item?.Profpic}
                                        alt="project owner"
                                    />
                                </a>
                                <div>
                                    <p>{item?.phone}</p>
                                </div>
                            </div>

                            <p id="profile-popover" className="text-base font-semibold leading-none text-gray-900 dark:text-white">
                                <p>{item?.owner}</p>
                            </p>
                            <p className="mb-3 text-sm font-normal">
                                {item?.email}
                            </p>

                            <Badge className="w-fit" color="warning">Congratulation 🤝🏽✅</Badge>
                        </div>
                    ) : <ShowContactDetails item={item} /> //was rendering null here before this <ShowContactDetails item={item}/> component to hide contact details for non-won bids

            }

            {
                item?.winnerId !== MyKey && item.Status.toLowerCase() == "closed" ?
                    <Badge className="w-fit mt-1" color="failure">Lost</Badge>
                    : null
            }

        </div>
    );
}

export default MyBids;