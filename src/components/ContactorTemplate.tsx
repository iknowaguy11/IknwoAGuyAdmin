
'use client';

import { Badge, Card } from 'flowbite-react';
import star from '../../public/star.png';
import Image from 'next/image';
import { HiPhone, HiHome, HiBriefcase, HiClock } from 'react-icons/hi';
import { Button } from 'flowbite-react';
import { Icontractors } from '../Interfaces/appInterfaces';
import { usePathname } from 'next/navigation';
import { customsubmitTheme, customTheme } from '@/app/customTheme/appTheme';

export function ContactorTemplate({ contractors, params }: { contractors: Icontractors[], params: string[] }) {
  const pathname = usePathname();

  if (pathname.trim() == "/contractors") {
    return (
      <div>
        {
          contractors.length > 0 ? contractors?.map((item) => (
            <div key={item.id} className="bg-slate-50 sm:w-fit md:w-fit lg:w-full xl:w-full border z-10 rounded-md p-2 shadow-md m-2" >
              <div className='flex justify-between items-center'>
                <Image
                  className='object-[3/4] object-contain bg-white rounded-md w-auto'
                  src={item.imgsr}
                  alt='company'
                  width={38}
                  height={38}
                />
                <Badge className='w-fit' size={"xs"} theme={customTheme} color={"success"} icon={HiClock}> {item.experience} years </Badge>
              </div>

              <div className='flex items-center'>
                <Image
                  className='object-[3/4] object-contain'
                  src={star}
                  alt='company'
                  width={20}
                  height={20}
                />
                <p className='text-xs'>{item.rating} stars</p>

              </div>

              <div className='grid flex-row'>
                <div>
                  <h5 className="text-2xl font-bold tracking-tight text-black dark:text-white">
                    {item.company}
                  </h5>
                  <p className="antialiased font-normal text-gray-600 dark:text-white line-clamp-3">
                    {item.encouragingWords}
                  </p>
                </div>
                <Card>
                  <div className='flex items-center gap-1'>
                    <Badge theme={customTheme} color={"success"} icon={HiPhone}></Badge>
                    <p className='text-sm'>Phone : {item.phone}</p>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Badge theme={customTheme} color={"success"} icon={HiHome}></Badge>
                    <p className='text-sm'>Address : {item.address}</p>
                  </div>

                  <Button.Group outline>
                    {
                      item.jobcategory.map((i, index) => (
                        <Button key={index} theme={customsubmitTheme} color='appsuccess' size={"xs"}>
                          <HiBriefcase className="mr-3 h-4 w-4" />
                          {i}
                        </Button>
                      ))
                    }

                  </Button.Group>
                </Card>
              </div>
            </div>
          )) : <p>Opps...! We could not find a contractor(s) for this search query</p>
        }

      </div>
    );
  } else if (params[1].toLowerCase() == "all") {
    let temp: Icontractors[];
    temp = contractors.filter(contractor => contractor.jobcategory.includes(decodeURIComponent(params[0])));
    return (
      <div>
        {
          temp.length > 0 ? temp?.map((item) => (
            <div key={item.id} className="bg-slate-50 sm:w-fit md:w-fit lg:w-full xl:w-full border z-10 rounded-md p-2 shadow-md m-2" >
              <div className='flex justify-between items-center'>
                <Image
                  className='object-[3/4] object-contain bg-white rounded-md w-auto'
                  src={item.imgsr}
                  alt='company'
                  width={38}
                  height={38}
                />
                <Badge className='w-fit' size={"xs"} theme={customTheme} color={"success"} icon={HiClock}> {item.experience} years </Badge>
              </div>

              <div className='flex items-center'>
                <Image
                  className='object-[3/4] object-contain'
                  src={star}
                  alt='company'
                  width={20}
                  height={20}
                />
                <p className='text-xs'>{item.rating} stars</p>

              </div>

              <div className='grid flex-row'>
                <div>
                  <h5 className="text-2xl font-bold tracking-tight text-black dark:text-white">
                    {item.company}
                  </h5>
                  <p className="antialiased font-normal text-gray-600 dark:text-white line-clamp-3">
                    {item.encouragingWords}
                  </p>
                </div>
                <Card>
                  <div className='flex items-center gap-1'>
                    <Badge theme={customTheme} color={"success"} icon={HiPhone}></Badge>
                    <p className='text-sm'>Phone : {item.phone}</p>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Badge theme={customTheme} color={"success"} icon={HiHome}></Badge>
                    <p className='text-sm'>Address : {item.address}</p>
                  </div>

                  <Button.Group outline>
                    {
                      item.jobcategory.map((i, index) => (
                        <Button key={index} theme={customsubmitTheme} color='appsuccess' size={"xs"}>
                          <HiBriefcase className="mr-3 h-4 w-4" />
                          {i}
                        </Button>
                      ))
                    }

                  </Button.Group>
                </Card>
              </div>
            </div>
          )) : <p>Opps...! We could not find a contractor(s) for this search query</p>
        }

      </div>
    )
  } else if (params[1].toLowerCase() != "all" && params[0] != "") {

    let temp: Icontractors[];
    temp = contractors.filter(contractor => contractor.jobcategory.includes(decodeURIComponent(params[0])) && contractor.address.toLowerCase().includes(decodeURIComponent(params[1]).toLowerCase()));
    return (
      <div>
        {
          temp.length > 0 ? temp?.map((item) => (
            <div key={item.id} className="bg-slate-50 sm:w-fit md:w-fit lg:w-full xl:w-full border z-10 rounded-md p-2 shadow-md m-2" >
              <div className='flex justify-between items-center'>
                <Image
                  className='object-[3/4] object-contain bg-white rounded-md w-auto'
                  src={item.imgsr}
                  alt='company'
                  width={38}
                  height={38}
                />
                <Badge className='w-fit' size={"xs"} theme={customTheme} color={"success"} icon={HiClock}> {item.experience} years </Badge>
              </div>

              <div className='flex items-center'>
                <Image
                  className='object-[3/4] object-contain'
                  src={star}
                  alt='company'
                  width={20}
                  height={20}
                />
                <p className='text-xs'>{item.rating} stars</p>

              </div>

              <div className='grid flex-row'>
                <div>
                  <h5 className="text-2xl font-bold tracking-tight text-black dark:text-white">
                    {item.company}
                  </h5>
                  <p className="antialiased font-normal text-gray-600 dark:text-white line-clamp-3">
                    {item.encouragingWords}
                  </p>
                </div>
                <Card>
                  <div className='flex items-center gap-1'>
                    <Badge theme={customTheme} color={"success"} icon={HiPhone}></Badge>
                    <p className='text-sm'>Phone : {item.phone}</p>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Badge theme={customTheme} color={"success"} icon={HiHome}></Badge>
                    <p className='text-sm'>Address : {item.address}</p>
                  </div>

                  <Button.Group outline>
                    {
                      item.jobcategory.map((i, index) => (
                        <Button key={index} theme={customsubmitTheme} color='appsuccess' size={"xs"}>
                          <HiBriefcase className="mr-3 h-4 w-4" />
                          {i}
                        </Button>
                      ))
                    }

                  </Button.Group>
                </Card>
              </div>
            </div>
          )) : <p>Opps...! We could not find a contractor(s) for this search query</p>
        }

      </div>
    )
  }

}
