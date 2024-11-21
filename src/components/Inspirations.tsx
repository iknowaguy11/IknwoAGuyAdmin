import Bedroom from '../../public/images/inspirations/Bedroom.jpg';
import Bathroom from '../../public/images/inspirations/Bathroom.jpg';
import Kitchen from '../../public/images/inspirations/Kitchen.jpg';
import InteriorDecor from '../../public/images/inspirations/Interior-Decor.jpg';
import Landscape from '../../public/images/inspirations/Landscape.jpg';
import HouseExterior from '../../public/images/inspirations/House-Exterior.jpg';
import Diningroom from '../../public/images/inspirations/Dining-room.jpg';
import KidsRoom from '../../public/images/inspirations/Kids-Room.jpg';
import { Iinspirations } from "@/Interfaces/appInterfaces";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Inspirations = () => {
    const inspirations: Iinspirations[] = [
        { id: '0', tittle: 'Bedroom', imgsr: Bedroom, caption: "", sharelink: "Bedroom" },
        { id: '1', tittle: 'Bathroom', imgsr: Bathroom, caption: "", sharelink: "Bathroom" },
        { id: '2', tittle: 'Kitchen', imgsr: Kitchen, caption: "", sharelink: "Kitchen" },
        { id: '3', tittle: 'Interior Decor', imgsr: InteriorDecor, caption: "", sharelink: "Interior-Decor" },
        { id: '4', tittle: 'Landscape', imgsr: Landscape, caption: "", sharelink: "Landscape" },
        { id: '5', tittle: 'Home Exterior', imgsr: HouseExterior, caption: "", sharelink: "Home-Exterior" },
        { id: '6', tittle: 'Dining Room', imgsr: Diningroom, caption: "", sharelink: "Dining-Room" },
        { id: '7', tittle: 'Kids Room', imgsr: KidsRoom, caption: "", sharelink: "Kids-Room" },
    ]
    const router=useRouter();
    return ( 
        <>
        <div className="flex flex-col justify-center items-center gap-2 p-6">
                <h1 className="text-4xl">Get Inspired</h1>
                <p className="text-gray-600 ml-5 mr-5">Find your inspiration and make it a reality</p>
                <div className="flex-row justify-between m-4 grid gap-3 sm:grid-cols-2 md:grid-cols-2 xm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 xs:grid-cols-1 justify-items-center mt-5 bg-slate-50 overflow-hidden p-2 rounded-md">
                    {inspirations?.map((item, index) => (
                        <div
                            key={item.id} className="max-w-sm relative overflow-hidden rounded-md hover:cursor-pointer"
                        >
                            {/* <Badge onClick={() =>copylink("https://"+(window?.location?.hostname).toString()+"/inspirations/"+item.sharelink)} theme={customTheme} color={"success"} className="absolute z-10 w-fit top-0 m-1 hover:cursor-pointer" icon={HiShare}>copy link</Badge> */}
                            <Image
                                onClick={() => router.push("inspirations/" + item.sharelink)}
                                src={item.imgsr}
                                alt="inspiration"
                                className="aspect-[4/3] object-cover"
                            />
                            <div className="flex-wrap absolute z-10 bottom-0 bg-opacity-75 bg-black p-3">
                                <h5 id={index == 4 ? 'inspirations' : ''} className="text-2xl font-bold tracking-tight text-white dark:text-white hover:text-appGreen">
                                    {item.tittle}
                                </h5>
                                <p className="font-normal text-stone-100 dark:text-stone-100">
                                    {item.caption}
                                </p>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
     );
}
 
export default Inspirations;