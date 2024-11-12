import { Card, Label, Tooltip, TextInput, Select, Badge, Button, Avatar, Textarea } from "flowbite-react";
import { useFetchBidCredits, useFetchProvinces, useFetchServices, useFetchgetContractorProjects } from "../_hooks/useFetch";
import { useCallback, useEffect, useRef, useState } from "react";

import iknown from '../../public/images/logo/logoinknow.png';
import certificatePng from '../../public/images/logo/certificate.png';
import Image from "next/image";
import Link from "next/link";
import { IActualTasks, ITowns, IUser } from "../Interfaces/appInterfaces";
import { useRouter } from "next/navigation";

import Select_API from 'react-select';
import validator from 'validator';
import { HiPhone, HiHome, HiBriefcase, HiTrash, HiShare } from 'react-icons/hi';
import { updateProfile } from "@/app/Controllers/UpdateProfile";
import { customInputBoxTheme, customsubmitTheme, customTheme } from "@/app/customTheme/appTheme";
import MyBids from "./MyBids";

const ContractorProfile = ({ UserData }: { UserData: IUser[] }) => {
    const { ProvinceData, DataError, isLoading } = useFetchProvinces();
    const { ServiceData, serviceError, isLoadingservies } = useFetchServices();
    const { ContractorProjects, ProjectsError, isGettingProjects } = useFetchgetContractorProjects(UserData[0]?.Id);
    const { BidCredits } = useFetchBidCredits(UserData[0]?.Id);

    const [companyName, setcompanyName] = useState<string>(UserData[0]?.companyName);
    //const [Address, setAddress] = useState<string>(UserData[0]?.Address);
    const [Bio, setBio] = useState<string>(UserData[0]?.AdvertisingMsg);
    const [phone, setPhone] = useState<string>(UserData[0]?.phone);
    const router = useRouter();
    const [avatarImage, setAvatarImage] = useState<any>(null);
    const [Imageupload, setImageupload] = useState<File | null>(null);
    const [isProcessing, SetIsprocessing] = useState<boolean>(false);
    const [selectedServices, SetSelectedServices] = useState<string[]>([]);
    const [HistoryServices, setHistoryServices] = useState<string[]>([]);
    const [HistoryAdress, setHistoryAdress] = useState<string[]>([]);

    const RemoveOldServices = (value: string) => {
        const updatedServices = HistoryServices.filter((item) => item !== value);
        setHistoryServices(updatedServices);
    }
    const RemoveOldAddress = (value: string) => {
        const updatedAddress = HistoryAdress.filter((item) => item !== value);
        setHistoryAdress(updatedAddress);
    }
    const RemoveServices = (value: string) => {
        const updatedServices = selectedServices.filter((item) => item !== value);
        SetSelectedServices(updatedServices);
    }
    const AppendSelectedServices = useCallback((value: string) => {
        if (!selectedServices.includes(value) && selectedServices.length < 15) {
            const updatedSelectedServices = [...selectedServices, value];
            SetSelectedServices(updatedSelectedServices);
        }
    }, [selectedServices, SetSelectedServices]);

    useEffect(() => {

        if (ServiceData && ServiceData.length > 0) {
            const firstService = ServiceData[0]?.actualTask[0]?.task;
            AppendSelectedServices(firstService);
        }
    }, [ServiceData]);

    useEffect(() => {
        setHistoryServices(UserData[0]?.Services);
    }, []);
    useEffect(() => {
        if(Array.isArray(UserData[0]?.Address)){
            setHistoryAdress(UserData[0]?.Address);
        }else{
            setHistoryAdress([UserData[0]?.Address]);
        }
        
    }, []);


    const fileInputRef = useRef<any>(null);

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            // Check if the selected file is an image and is not gif
            if (!file.type.startsWith('image/') || file.type === 'image/gif') {
                alert('Please select a non-GIF image file.');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event: any) => {
                // Set the image source to the selected file
                const imageDataUrl = event.target.result;
                setAvatarImage(imageDataUrl);
                setImageupload(file);
            };
            reader.readAsDataURL(file);
        }
    };
    var imgfilename: string;
    imgfilename = "";
    let image_url: string;
    image_url = "";

    const OpenImagePicker = () => {
        fileInputRef.current.click();
    };

    //

    const [Selectedsubarea, SetSelectedsubarea] = useState<string | string[]>(UserData[0]?.Address);
    const [subcategory, SetSubcategory] = useState<IActualTasks[]>([]);
    const [subareas, SetSubareas] = useState<ITowns[]>([]);
    const [provCategory, setprovCategory] = useState<string | null | undefined>("Select Provice");
    const [ServiceCategory, setServiceCategory] = useState<string | null | undefined>("Select Service");
    const [selectedAddress, SetSelectedAddress] = useState<string[]>([]);//adress

    const Services = [
        { value: "PLUMBING", label: "PLUMBING" },
        { value: "HANDYMAN", label: "HANDYMAN" },
        { value: "ELECTRICAL", label: "ELECTRICAL" },
        { value: "PAINTING", label: "PAINTING" },
        { value: "CARPENTRY", label: "CARPENTRY" },
        { value: "GARDEN AND LANDSCAPING", label: "GARDEN AND LANDSCAPING" },
        { value: "BUILDING AND RENOVATIONS", label: "BUILDING AND RENOVATIONS" },
        { value: "MORE CATEGORIES", label: "MORE CATEGORIES" },
    ];

    const provinces = [
        { value: "Limpopo", label: "Limpopo" },
        { value: "Gauteng", label: "Gauteng" },
        { value: "Eastern Cape", label: "Eastern Cape" },
        { value: "Free State", label: "Free State" },
        { value: "KwaZulu Natal", label: "KwaZulu Natal" },
        { value: "Mpumalanga", label: "Mpumalanga" },
        { value: "North West", label: "North West" },
        { value: "Northern Cape", label: "Northern Cape" },
        { value: "Western Cape", label: "Western Cape" }

    ];

    const SetSelectedService = (category: string | null | undefined) => {
        setServiceCategory(category);
        if (category !== "" && category !== "Select Service") {
            ServiceData?.forEach((item) => {
                if (item?.ServiceType == category?.replace("🛠️", '').trim()) {
                    SetSubcategory(item?.actualTask);
                }
            })
        } else {
            SetSubcategory([]);
        }
    }

    const AppendSelectedAddress = useCallback((value: string) => {
        if (!selectedAddress.includes(value) && selectedAddress.length < 15) {
            SetSelectedAddress((prev) => [...prev, value]);
        }
    }, [selectedAddress]);

    const RemoveAddress = (value: string) => {
        SetSelectedAddress((prev) => prev.filter((item) => item !== value));
    };


    //dead code... ignore
    const SetProvince = (category: string | null | undefined) => {
        setprovCategory(category);
        if (category !== "" && category !== "Select Provice") {
            ProvinceData?.forEach((item) => {
                if (item?.province == category?.replace("🛠️", '').trim()) {
                    SetSubareas(item?.Towns);
                }
            })
        } else {
            SetSubareas([]);
        }
    }

    //
    return (
        <>
            <div className="h-full items-center justify-items-center">
                <Card className='flex max-w-lg flex-grow rounded mt-3'>
                    <form onSubmit={(e) => updateProfile(e, router, { companyName: companyName, Address:[...new Set([...selectedAddress, ...HistoryAdress])], phone: (validator.isMobilePhone(phone?.trim()) ? phone : UserData[0]?.phone), AdvertisingMsg: Bio, Services: [...new Set([...selectedServices, ...HistoryServices])] }, UserData[0]?.Id, Imageupload, SetIsprocessing)} className="flex max-w-lg flex-col gap-4 flex-grow">
                        <div className="mb-2 block">
                            {
                                UserData[0]?.profileImage &&
                                <Image
                                    src={UserData[0]?.profileImage}
                                    alt="Picture of the author"
                                    className="mr-3 w-auto sm:h-9"
                                    width={170}
                                    height={40}

                                />
                            }
                            <div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />
                                <div className="w-fit">
                                    <Avatar size={"lg"} className='hover:cursor-pointer relative' onClick={OpenImagePicker} img={avatarImage == null ? "" : avatarImage}>
                                        <div className="space-y-1 font-medium dark:text-white">
                                            <div>{"Update your " + (UserData[0].membership == "contractor" ? "company logo" : "profile picture")}</div>
                                        </div>

                                    </Avatar>
                                    <Badge onClick={() => {
                                        setAvatarImage(null);
                                        setImageupload(null);
                                    }} className="w-fit hover:cursor-pointer bg-appGreen text-white z-10" icon={HiTrash}>Remove</Badge>
                                </div>

                            </div>
                        </div>
                        <p className="text-sm text-gray-200">{UserData[0]?.companyEmail}</p>
                        <p>{(UserData[0].formSubmitted)}</p>
                        <Button onClick={() => router?.push('profile/' + UserData[0]?.Id)}
                            size="xs"
                            type="button"
                            className="rounded-lg bg-blue-700 text-xs text-nowrap ml-1 text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Ratings & Reviews
                        </Button>
                        <div>


                            {companyName || UserData[0]?.formSubmitted !== "Skilled Individual" ?
                                <>
                                    <div className="mb-2 block">
                                        <Label htmlFor="contemail" value="Company Name *" />
                                        <p className="text-xs text-gray-500">{companyName || UserData[0]?.companyName}</p>
                                    </div>
                                    <TextInput theme={customInputBoxTheme} color={"focuscolor"} id="contemail" type="text" value={companyName} onChange={(e) => setcompanyName(e?.target.value)} placeholder="Company Name" required shadow />

                                </>

                                : null}

                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="bio" value="Profile Bio *" />
                            </div>

                            <Textarea rows={4} theme={customInputBoxTheme} onChange={(e) => setBio(e?.target.value?.trim())} color={"success"} id="bio" value={Bio} placeholder="Company Bio" shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Town" value="Address *" />
                                <p className="text-xs text-gray-500">Home owners use this Address to search for you</p>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="Town" value="Compay's Address *" />
                                    <span className="text-xs text-gray-600 font-light text-wrap"> Limit : 15</span>
                                </div>
                                <Select_API placeholder={"Select Provice"} options={provinces} onChange={(e) => SetProvince(e?.value)} />

                                {
                                    subareas.length > 0 &&

                                    <Select
                                        className="max-w-lg rounded mt-1 mb-1"
                                        onChange={(e) => e?.target.value !== "Select A Sub Area" ? AppendSelectedAddress(e?.target.value) : null}
                                    >
                                        <option>Select A Sub Area</option>
                                        {subareas?.map((item) => (
                                            <option key={item.area} value={item.area}>{item.area}</option>
                                        ))}
                                    </Select>
                                }
                                <div className="grid grid-cols-3 gap-1 pt-2">
                                    {selectedAddress.map((address, index) => (
                                        <div key={index} className="flex flex-wrap gap-2">
                                            <Badge onClick={() => RemoveAddress(address)} className="w-fit hover:cursor-pointer bg-appGreen text-white" icon={HiTrash} color="success">
                                                {address}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>

                            </div>
                            {
                                Array.isArray(HistoryAdress) ?
                                    <>
                                        <ul>
                                            {
                                                HistoryAdress.map((adr, index) => (
                                                    <div key={index} className='flex mb-1 mt-1'>
                                                       <HiTrash onClick={()=>RemoveOldAddress(adr.trim())} className="h-6 w-6 hover:cursor-pointer"/>
                                                         <Badge
                                                         theme={customTheme} color={"success"} icon={HiHome}></Badge>
                                                        <li className='text-sm'> {adr}</li>
                                                    </div>
                                                ))
                                            } </ul>
                                    </> :
                                    <div className='flex mb-1 mt-1 w-fit'>
                                        <HiTrash onClick={()=>RemoveOldAddress(HistoryAdress)} className="h-6 w-6 hover:cursor-pointer"/>
                                        <Badge theme={customTheme} color={"success"} icon={HiHome}></Badge>
                                        <p className='text-sm'> {HistoryAdress}</p>
                                    </div>
                            }
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone" value={"Company Phone No. as recorded : " + UserData[0]?.phone} />
                            </div>
                            <TextInput theme={customInputBoxTheme} onChange={(e) => setPhone(e.target.value)} value={phone} color={"focuscolor"} id="addr" type="tel" placeholder="The company's phone numbers" maxLength={10} required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="certificate" value="Company Certificate" />
                            </div>
                            {
                                UserData[0]?.certificate && <Link href={UserData[0]?.certificate} target="_blank">
                                    <Image
                                        alt="certificate pdf"
                                        src={certificatePng}
                                        width={35}
                                        height={35}
                                    />
                                </Link>
                            }
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="specialty" value="Specialities" />
                            </div>
                            <div className="grid grid-cols-3  gap-1 pt-2">
                                {
                                    HistoryServices?.map((serv, index) => (
                                        <div key={index} className='flex flex-wrap gap-2'>
                                            <Badge onClick={() => RemoveOldServices(serv)} icon={HiTrash} className="bg-appGreen text-white hover:cursor-pointer" color="success">{serv}</Badge>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>

                        <Select_API placeholder={"Select Service"} options={Services} onChange={(e) => SetSelectedService(e?.value)} />

                        {subcategory.length > 0 &&

                            <Select
                                className="rounded mt-1 mb-1"
                                onChange={(e) => e?.target.value !== "Select A Sub Service" ? AppendSelectedServices(e?.target.value) : null}
                            >
                                <option>Select A Sub Service</option>
                                {
                                    subcategory?.map((item, index) => (
                                        <option key={item?.task}>{item?.task}</option>
                                    ))
                                }
                            </Select>
                        }
                        <div className="grid grid-cols-3  gap-1 pt-2">
                            {selectedServices?.map((itm, index) => (
                                <div key={index} className='flex flex-wrap gap-2'>
                                    <Badge onClick={() => RemoveServices(itm)} className="w-fit hover:cursor-pointer bg-appGreen text-white" icon={HiTrash} color="success">{itm}</Badge>
                                </div>
                            ))}
                        </div>

                        <Button isProcessing={isProcessing} theme={customsubmitTheme} type="submit" color="appsuccess">Update</Button>
                    </form>
                </Card>
            </div>

            {/*second col*/}

            <div className="h-full items-center justify-items-center">
                <Card className='flex max-w-lg flex-grow rounded mt-3'>
                    <form className="flex max-w-lg flex-col gap-4 flex-grow">
                        <div className="mb-2 block">
                            <Image
                                src={iknown}
                                alt="Picture of the author"
                                className="mr-3 w-auto sm:h-9"
                                width={176}
                                height={40}
                                priority
                            />
                        </div>
                        <p className="text-xs text-gray-500">support@iknowaguy.co.za</p>
                        {/* <Button
                            onClick={() => router.push('purchase')}
                            size={"sm"}
                            theme={customsubmitTheme}
                            color="appsuccess"
                            type="button"
                            className="inline-flex w-full justify-center rounded-lg text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-200"
                        >
                            <HiShoppingCart className="mr-2 h-5 w-5" /> Purchase Bid Credits
                        </Button> */}
                        <p className="text-md text-gray-800">Balance:{BidCredits[0]?.credit || 0} Credit(s)</p>
                        {
                            ContractorProjects?.map((item) => (
                                <MyBids item={item} key={item.ProjectId} MyKey={UserData[0]?.Id} />
                            ))
                        }
                    </form>
                </Card>
            </div>
        </>
    );
}

export default ContractorProfile;