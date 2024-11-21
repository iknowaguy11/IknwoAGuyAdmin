import Bedroom from '../../public/images/inspirations/Bedroom.jpg';
import Bathroom from '../../public/images/inspirations/Bathroom.jpg';
import Kitchen from '../../public/images/inspirations/Kitchen.jpg';
import Image from 'next/image';


const InsiprationFullView = ({paths_Segments,inpiration_folder}:{inpiration_folder:string,paths_Segments:string[]}) => {
    const InspirationGroups:any=[
        {id:1,imgArray:[Bedroom,Bathroom,Bedroom,Bathroom,Bedroom,Bathroom]},
        {id:2,imgArray:[Kitchen,Kitchen,Kitchen]},
    ];
    return ( 
        <div className="w-fit mt-18 mb-8 items-center flex-row justify-between m-4 grid gap-3 sm:grid-cols-2 md:grid-cols-2 xm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 xs:grid-cols-1 bg-slate-50">
            {
                InspirationGroups.map((itm:any)=>{
                    if(parseInt(itm.id)==parseInt(inpiration_folder)){
                        return (
                            itm.imgArray.map((imgf:any,index:any)=> {
                                return (
                                    <Image key={index}
                                    className="m-2 aspect-[4/3] object-cover"
                                    alt='inspiration image'
                                    src={imgf}
                                    width={500}
                                    height={500}
                                    />
                                )
                            } )
                        )
                    }
                }
                )
            }
        </div>

     );
}
 
export default InsiprationFullView;