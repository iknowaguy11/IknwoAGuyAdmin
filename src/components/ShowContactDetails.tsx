
const ShowContactDetails = ({ item }: any) => {
    return (
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
        </div>
    );
}

export default ShowContactDetails;