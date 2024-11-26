'use client';
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { Alert, Button, Spinner } from "flowbite-react";
import { customsubmitTheme } from "@/app/customTheme/appTheme";
import { useFetchInspirations } from "@/_hooks/useFetch";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Inspiration_Fileupload from "@/components/Inspiration_Fileupload";
import { DeleteFirebase_file } from "@/app/Controllers/Deletemediafile";


const Inspirations = ({ params }: { params: { slug: string[] } }) => {
    const router = useRouter();
    const { InspirationData, isLoading } = useFetchInspirations(params?.slug[0].trim());
    const paths_Segments = [
        "Bedroom", "Bathroom", "Kitchen", "Interior-Decor", "Landscape", "Home-Exterior", "Dining-Room", "Kids-Room"
    ]
    if (paths_Segments.includes(params.slug[0]) && (params?.slug[1] == undefined || params?.slug[1] == null)) {
        return (
            <DefaultLayout>
                <div className={InspirationData?.length == 0 ? "h-dvh" : "mt-20 "}>
                    <Inspiration_Fileupload category={params.slug[0]}/>
                    <div className="flex-row justify-between m-4 grid gap-3 sm:grid-cols-2 md:grid-cols-2 xm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 xs:grid-cols-1 justify-items-center mt-5 bg-slate-50 overflow-hidden p-2 rounded-md">
                        {InspirationData[0]?.media?.map((item, index) => (
                            <div
                                key={index} className="max-w-sm relative overflow-hidden rounded-md hover:cursor-pointer"
                            >
                                <Image
                                    onClick={() => router.push(item?.url)}
                                    src={item.url}
                                    alt="inspiration"
                                    width={2000}
                                    height={900}
                                    priority
                                    className="aspect-[3/4] object-cover"
                                />
                                <div className="flex-wrap absolute z-10 bottom-0 bg-opacity-75 bg-black p-3">

                                    <div className="flex flex-wrap gap-1">
                                        
                                        <Button size="xs" className="text-nowrap" onClick={() => router.push(item?.url)} theme={customsubmitTheme} color="appsuccess">Full View</Button>
                                        <Button size="xs" className="text-nowrap" onClick={() => navigator?.clipboard.writeText(item?.url)} theme={customsubmitTheme} color="appsuccess">Share Image</Button>
                                        <Button size="xs" className="text-nowrap" onClick={()=>DeleteFirebase_file(item.category,item.name,params.slug[0],item.url,"Media_Inspirations")} theme={customsubmitTheme} color="failure">Delete</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {InspirationData?.length == 0 ? <div className="ml-4 mt-10">

                        <Alert color="warning" rounded>
                            {isLoading ? <Spinner className="m-2" aria-label="Extra large spinner" size="xl" /> : <><span className="font-medium">Info alert!</span> No Inspiration Images found in this category</>}
                            <Button onClick={() => router.replace('/')} theme={customsubmitTheme} color="appsuccess">Home</Button>
                        </Alert>
                        

                    </div> : null}

                </div>
            </DefaultLayout>
        );
    }

    else {
        notFound();
    }
}

export default Inspirations;