"use client"
import { useState } from "react";
import { Package } from "@/types/package";
import { IUser } from "@/app/Interfaces/appInterfaces";
import { UserActions, userData } from "@/app/staticData/dummy";
import DefaultSelectOption from "../SelectOption/DefaultSelectOption";
import { Button } from "flowbite-react";
import { customsubmitTheme } from "@/app/customTheme/appTheme";



const TableProjects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const itemsPerPage = 2; // Set your items per page

  // Filter and paginate data
  const filteredData = userData.filter((packageItem) =>
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

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5 mb-3">
      <div className="px-4 py-6 md:px-6 xl:px-9 flex justify-between items-center">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">Users</h4>
        <input
          type="text"
          placeholder="Filter by name/reg/email"
          value={filter}
          onChange={handleFilterChange}
          className="border border-stroke p-2 rounded dark:bg-dark-3 dark:text-white"
        />
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
                  <h5 className="text-dark dark:text-white">{packageItem.RegistrationNo}</h5>
                </td>
                <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5">
                  <h5 className="text-dark dark:text-white">{packageItem.companyName}</h5>
                </td>
                <td className="border-[#eee] px-4 py-4 dark:border-dark-3">
                  <p className="text-dark dark:text-white">{packageItem.isactive}</p>
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
                  <DefaultSelectOption options={UserActions}/>
                  <Button size="xs" className="bg-appGreen mt-1" theme={customsubmitTheme} type="submit" color="appsuccess">submit</Button>
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
    </div>
  );
};

export default TableProjects;
