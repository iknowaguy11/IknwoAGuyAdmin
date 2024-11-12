import { Card,Label,TextInput, Button, Badge, Avatar } from "flowbite-react";
import {useRef, useState } from "react";
import iknown from '../../public/images/logo/logoinknow.png';
import Image from "next/image";
import { HiPlusCircle,HiTrash } from 'react-icons/hi';
import { IUser } from "../Interfaces/appInterfaces";
import { useRouter } from "next/navigation";
import { useFetchUserProjects } from "../_hooks/useFetch";
import validator from 'validator';
import { updateProfile } from "@/app/Controllers/UpdateProfile";
import { customInputBoxTheme, customsubmitTheme, customTheme } from "@/app/customTheme/appTheme";
import MyProjects from "./MyProjects";

const HomeOwnerProfile = ({UserData}:{UserData:IUser[]}) => {
    const [LastName, setLastName] = useState<string>(UserData[0]?.YourSurName);
    const [FristName, setFristName] = useState<string>(UserData[0]?.YourName);
    const [phone, setPhone] = useState<string>(UserData[0]?.phone);
    const { UserProjects } = useFetchUserProjects(UserData[0]?.Id);
    const[isProcessing,SetIsprocessing]=useState<boolean>(false);
    const router=useRouter();
    const [avatarImage, setAvatarImage] = useState<any>(null);
    const [Imageupload, setImageupload] = useState<File | null>(null);
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
    return ( 
        <>
            <div className="h-full items-center justify-items-center">
                
                <Card className='flex max-w-lg flex-grow rounded mt-3'>
                <div className="mb-2 block">
                            <Image
                                src={iknown}
                                alt="Picture of the author"
                                className="mr-3 w-auto sm:h-9"
                                width={176}
                                height={40}
                                priority
                            />
                            <p className="text-xs text-gray-500">support@iknowaguy.co.za</p>
                        </div>
                <div className="h-full items-center justify-items-center">
                <Card className='flex max-w-lg flex-grow rounded mt-3'>
                    <form onSubmit={(e)=>updateProfile(e,router,{YourName:FristName,YourSurName:LastName,phone:(validator.isMobilePhone(phone?.trim()) ? phone  : UserData[0]?.phone)},UserData[0]?.Id,Imageupload,SetIsprocessing)} className="flex max-w-lg flex-col gap-4 flex-grow">
                        <div className="mb-2 block">
                            {/* {
                                UserData[0]?.profileImage &&
                                <Image
                                src={UserData[0]?.profileImage}
                                alt="Picture of the author"
                                className="mr-3 w-auto sm:h-9"
                                width={170}
                                height={40}  
                            />
                            } */}
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
                                        <div>{"Update your " +(UserData[0].membership=="contractor" ? "company logo": "profile picture")}</div>
                                    </div>
                                    
                                </Avatar>
                                <Badge onClick={()=>{
                                        setAvatarImage(null);
                                        setImageupload(null);
                                    }} className="w-fit hover:cursor-pointer bg-appGreen text-white z-10" icon={HiTrash}>Remove</Badge>
                                </div>
                                
                            </div>
                        </div>
                        <Image
                                src={UserData[0]?.profileImage}
                                alt="Picture of the author"
                                className="mr-3"
                                width={40}
                                height={40}
                                priority
                            />
                        <p className="text-xs text-gray-500">{UserData[0]?.companyEmail}</p>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="firstname" value="First Name *" />
                            </div>
                                <TextInput theme={customInputBoxTheme} color={"focuscolor"} id="firstname" type="text" onChange={(e)=>setFristName(e.target.value)} value={FristName} placeholder="First Name" required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="lastname" value="Last Name *" />
                            </div>
                                <TextInput theme={customInputBoxTheme} color={"focuscolor"} id="lastname" type="text" onChange={(e)=>setLastName(e.target.value)} value={LastName} placeholder="Last Name" required shadow />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone" value={"User Phone No. *"} />
                            </div>
                            <TextInput theme={customInputBoxTheme} onChange={(e)=>setPhone(e.target.value)} value={phone} color={"focuscolor"} id="phone" type="tel" placeholder="Phone Numbers" maxLength={10} required shadow />
                        </div>

                        <Button isProcessing={isProcessing} theme={customsubmitTheme} type="submit" color="appsuccess">Update</Button>
                    </form>
                </Card>
            </div>
                    <form className="flex max-w-lg flex-col gap-4 flex-grow">
                        
                        <h3 className="text-lg font-bold underline">Homeowner's Projects</h3>
                        
                        {
                            UserProjects?.map((item) => (
                                <MyProjects item={item} key={item.ProjectId}/>
                            ))
                        }

                    </form>
                </Card>
            </div>
        </>
    );
}
export default HomeOwnerProfile;