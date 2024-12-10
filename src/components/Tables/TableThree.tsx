"use client"
import { useContext, useState } from "react";
import { UserActions } from "@/app/staticData/dummy";
import DefaultSelectOption from "../SelectOption/DefaultSelectOption";
import { Button } from "flowbite-react";
import { customsubmitTheme } from "@/app/customTheme/appTheme";
import { useFetchUsers } from "@/_hooks/useFetch";
import { updatePermission, updateProfile } from "@/app/Controllers/UpdateProfile";
import { AppContext } from "@/Context/appContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { failureMessage, successMessage } from "@/app/notifications/successError";
import ModalSpinnerDelete from "../Modal/ModalSpinnerDelete";
import { searchProjectByKey } from "@/app/Controllers/searchProject";

const TableProjects = () => {
  const router=useRouter();
  const {SetClientKey,SetDeleteUser,isDeleteUser}=useContext(AppContext);
  const [selectedOption, setSelectedOption] = useState(UserActions[0]);
  const {usrData}=useFetchUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const itemsPerPage = 4; // Set your items per page

  // Filter and paginate data
  const filteredData = usrData.filter((packageItem) =>
    packageItem.YourName.toLowerCase().includes(filter.toLowerCase()) ||
  packageItem.companyEmail.toLowerCase().includes(filter.toLowerCase()) || 
  packageItem.RegistrationNo.toLowerCase().includes(filter.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Handle filter change
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    setCurrentPage(1); // Reset to the first page on filter change
  };

  const HandleActions=(id:string,currntperm:string)=>{
    if(selectedOption==='---') return;
    if(selectedOption=="block/unblock"){
      updatePermission(id,{isactive:currntperm=="no" ? "yes":"no"});
    }else if(selectedOption=="delete"){
      DeleteUser(id.trim());
    }else if(selectedOption=="profile"){
      SetClientKey(id);
      router.push('/profile');
    }
  }
  const DeleteUser=async(uid:string)=>{
    //check if user is not in an projects
    SetDeleteUser(true);
    let found=false;
    found=await searchProjectByKey(uid);
    if(found==true){
      SetDeleteUser(false);
      failureMessage("User has been found in other projects. Review projects and refund their tokens.");
    }else{
      
      axios.delete('https://iknowaguyapi.onrender.com/deleteUser',{data:{uid},headers:{
        'Content-Type': 'application/json'
      }}).then(resp=>{
        if (resp.status === 200) {
          successMessage('User deleted successfully');
          SetDeleteUser(false);
          console.log(resp.data.message);
        } else {
          SetDeleteUser(false);
          console.error('Failed to delete user:', resp.data.error);
          failureMessage('Failed to delete user:'+ resp.data.error);
        }
      }).catch((err:any)=>{
        SetDeleteUser(false);
        failureMessage(String(err.message))
      })
    }
    
  }

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5 mb-3">
      <div className="px-4 py-6 md:px-6 xl:px-9 flex flex-wrap justify-between items-center">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">Users</h4>
        <div className="gap-2 flex flex-wrap">
        <input
          type="text"
          placeholder="Filter by name/reg/email"
          value={filter}
          onChange={handleFilterChange}
          className="border border-stroke p-2 rounded dark:bg-dark-3 dark:text-white"
        />
           <Button onClick={()=>router.push('/register')} theme={customsubmitTheme} type="submit" color="appsuccess">Add</Button>
        </div>
                    
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              <th className="min-w-[160px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">#</th>
              <th className="min-w-[160px] px-4 py-4 font-medium text-dark dark:text-white">Name</th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">Reg No.</th>
              <th className="min-w-[90px] px-4 py-4 font-medium text-dark dark:text-white">Membership</th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">Company Name</th>
              <th className="min-w-[90px] px-4 py-4 font-medium text-dark dark:text-white">Status</th>
              <th className="min-w-[120px] px-4 py-4 text-left font-medium text-dark dark:text-white xl:pr-7.5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((packageItem, index) => (
              <tr key={index}>
                <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5">
                  <h5 className="text-dark dark:text-white">{packageItem.YourName}</h5>
                </td>
                <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5">
                  <h5 className="text-dark dark:text-white">{packageItem.RegistrationNo=="" ? "N/A" : packageItem.RegistrationNo}</h5>
                </td>
                <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5">
                  <h5 className="text-dark dark:text-white">{packageItem.membership + (packageItem.companyName=="" && packageItem.membership=="contractor" ? " Skilled Individual" : "")}</h5>
                </td>
                <td className="border-[#eee] px-4 py-4 dark:border-dark-3">
                  <p className="text-dark dark:text-white">{packageItem.companyName=="" ? "N/A" : packageItem.companyName}</p>
                </td>
                <td className="border-[#eee] px-4 py-4 dark:border-dark-3">
                  <p className={`inline-flex rounded-full px-3.5 py-1 text-body-sm font-medium ${packageItem.isactive === "yes"
                      ? "bg-[#219653]/[0.08] text-[#219653]"
                      :  "bg-[#D34053]/[0.08] text-[#D34053]"
                    }`}>
                    {packageItem.isactive=="yes" ? "active" :'blocked'}
                    
                  </p>
                </td>
                <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 text-right">
                  {/* Actions buttons here */}
                  <DefaultSelectOption options={UserActions} setSelectedOption={setSelectedOption}/>
                  <Button onClick={()=>HandleActions(packageItem.Id,packageItem.isactive)} size="xs" className="bg-appGreen mt-1" theme={customsubmitTheme} type="submit" color="appsuccess">submit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center p-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="text-primary font-medium disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="text-primary font-medium disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <ModalSpinnerDelete isDeleteUser={isDeleteUser}/>
    </div>
  );
};

export default TableProjects;
