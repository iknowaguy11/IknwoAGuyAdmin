import React, { Dispatch, SetStateAction, useState } from "react";
import ClickOutside from "@/components/ClickOutside";
import { Select } from "flowbite-react";
import { customselectTheme } from "@/app/customTheme/appTheme";

const DefaultSelectOption = ({ options,setSelectedOption }: {setSelectedOption:Dispatch<SetStateAction<string>>,options:any}) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <ClickOutside onClick={() => setIsOpen(false)}>
      <Select onChange={(e) => handleOptionSelect(e?.target.value)} className="max-w-md" id="Service" theme={customselectTheme} color={"success"} required>
        {
          options?.map((op:any)=>(
            <option>{op}</option>
          ))
        }
      </Select>
    </ClickOutside>
  );
};

export default DefaultSelectOption;
