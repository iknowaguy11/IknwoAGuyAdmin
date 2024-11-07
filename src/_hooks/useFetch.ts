import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DefaultProjectObject, IAdmins, IBidCredits, IMedia_Inspirations, IProjects, IProvince, IReviews, IServices, IUser } from "../Interfaces/appInterfaces";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../DB/firebaseConnection";


export const useFetchProvinces = () => {

    const [ProvinceData, SetProvinceData] = useState<IProvince[]>([]);
    const [DataError, SetDataError] = useState<unknown>(null);
    const [isLoading, SetisLoading] = useState<boolean>(false);
    try {
        useEffect(() => {
            const colRef = collection(db, "Provinces");
            var tempData: IProvince[] = [];
            SetisLoading(true);
            const unsubscribe = onSnapshot(colRef, (snapshot) => {
                tempData = [];
                snapshot?.docs.forEach((doc) => {
                    tempData.push(
                        {
                            Id: doc.id, province: doc.data()?.ProvinceName, Towns: doc.data()?.Towns
                        }
                    );
                    SetProvinceData(tempData);
                    SetisLoading(false);
                });
            })
            return () => unsubscribe();
        }, []);

    } catch (error) {
        SetisLoading(false);
        SetDataError(error);
    }
    finally {
        return { ProvinceData, DataError, isLoading };
    }
}

export const useFetchProjects = () => {

    const [ProjData, SetProjectData] = useState<IProjects[]>([]);
    const [pDataError, SetpDataError] = useState<unknown>(null);
    const [pisLoading, SetpisLoading] = useState<boolean>(false);
    try {
        useEffect(() => {
            const colRef = collection(db, "Projects");
            var tempData: IProjects[] = [];
            SetpisLoading(true);
            const unsubscribe = onSnapshot(colRef, (snapshot) => {
                tempData = [];
                snapshot?.docs.forEach((doc) => {
                    tempData.push(
                        {
                            ProjectId: doc.id,
                            ownerId: doc.data()?.ownerId,
                            owner: doc.data()?.owner,
                            Profpic: doc.data()?.Profpic,
                            task: doc.data()?.task,
                            email: doc.data()?.email,
                            phone: doc.data()?.phone,
                            addrs: doc.data()?.addrs,
                            postTime: doc.data()?.postTime,
                            AllcontactorKeys: doc.data()?.AllcontactorKeys,
                            description: doc.data()?.description,
                            budget: doc.data()?.budget,
                            otherOffers: doc.data()?.otherOffers,
                            bestOffer: doc.data()?.bestOffer,
                            Status: doc.data()?.Status,
                            winnerId: doc.data()?.winnerId,
                            bstOffrId: doc.data()?.bstOffrId,
                            tncs: doc.data()?.tncs,
                        }
                    );
                    SetProjectData(tempData);
                    SetpisLoading(false);
                });
            })
            return () => unsubscribe();
        }, []);

    } catch (error) {
        SetpisLoading(false);
        SetpDataError(error);
    }
    finally {
        return { ProjData, pDataError, pisLoading };
    }
}

export const useFetchUsers = ()=>{
    const [usrData, SetusrData] = useState<IUser[]>([]);
    const [usrDataError, SetusrDataError] = useState<unknown>(null);
    const [usrisLoading, SetusrisLoading] = useState<boolean>(false);
    try {
        useEffect(() => {
            const colRef = collection(db, "Users");
            var tempData: IUser[] = [];
            SetusrisLoading(true);
            const unsubscribe = onSnapshot(colRef, (snapshot) => {
                tempData = [];
                snapshot?.docs.forEach((doc) => {
                    tempData.push(
                        {
                            Id: doc.id,
                            companyName: doc.data()?.companyName,
                            companyEmail: doc.data()?.companyEmail,
                            phone: doc.data()?.phone,
                            Address: doc.data()?.Address,
                            profileImage: doc.data()?.profileImage,
                            certificate: doc.data()?.certificate,
                            imgfilename: doc.data()?.imgfilename,
                            pdffilename: doc.data()?.pdffilename,
                            isactive: doc.data()?.isactive,
                            membership: doc.data()?.membership,
                            Services: doc.data()?.Services,
                            tncs: doc.data()?.tncs,
                            YourName: doc.data()?.YourName,
                            YourSurName: doc.data()?.YourSurName,
                            RegistrationNo: doc.data()?.RegistrationNo,
                            YourID: doc.data()?.YourID,
                            formSubmitted: doc.data()?.formSubmitted,
                            AdvertisingMsg: doc.data()?.AdvertisingMsg,
                        }
                    );
                    SetusrData(tempData);
                    SetusrisLoading(false);
                });
            })
            return () => unsubscribe();
        }, []);

    } catch (error) {
        SetusrisLoading(false);
        SetusrDataError(error);
    }
    finally {
        return { usrData, usrDataError, usrisLoading };
    }

}
export const useFetchAdmin= (ukey: string | null) => {

    const [AdminData, SetAdminData] = useState<IAdmins[]>([]);
    const [AdminError, SetAdminError] = useState<unknown>(null);
    const [isGettingAdmin, SetisGettingAdmin] = useState<boolean>(false);
    try {
        useEffect(() => {
            getAdminData(ukey, SetAdminData, SetAdminError, SetisGettingAdmin);
        }, [ukey]);

    } catch (error) {
        SetisGettingAdmin(false);
        SetAdminError(error);
    }
    finally {
        return { AdminData, AdminError, isGettingAdmin };
    }
}
const getAdminData = async (ukey: string | null, SetUserData: Dispatch<SetStateAction<IAdmins[]>>, SetaccountError: Dispatch<SetStateAction<unknown>>, SetisGettingAccount: Dispatch<SetStateAction<boolean>>) => {
    if (await ukey !== null) {
        const colRef = collection(db, "Admins");
        var tempData: IAdmins[] = [];
        SetisGettingAccount(true);
        const unsubscribe = onSnapshot(colRef, (snapshot) => {
            tempData = [];
            snapshot?.docs?.forEach(async (doc) => {
                if (doc?.id?.trim() === await ukey?.trim()) {
                    tempData.push(
                        {
                            Id: doc.id,
                            email: doc.data()?.email,
                            name: doc.data()?.name,
                            previledges: doc.data()?.previledges,
                            sur: doc.data()?.sur,
                            supperAdmn:doc.data()?.supperAdmn,
                        }
                    );
                }
                SetUserData(tempData);
                SetisGettingAccount(false);
            });
        })
        return () => unsubscribe();
    }
}

export const useFetchServices = () => {

    const [ServiceData, SetServiceData] = useState<IServices[]>([]);
    const [serviceError, SetserviceError] = useState<unknown>(null);
    const [isLoadingservies, SetisLoadingservies] = useState<boolean>(false);
    try {
        useEffect(() => {
            const colRef = collection(db, "Services");
            var tempData: IServices[] = [];
            SetisLoadingservies(true);
            const unsubscribe = onSnapshot(colRef, (snapshot) => {
                tempData = [];
                snapshot?.docs.forEach((doc) => {
                    tempData.push(
                        {
                            Id: doc.id, ServiceType: doc.data()?.ServiceType, actualTask: doc.data()?.actualTask
                        }
                    );
                    SetServiceData(tempData);
                    SetisLoadingservies(false);
                });
            })
            return () => unsubscribe();
        }, []);

    } catch (error) {
        SetisLoadingservies(false);
        SetserviceError(error);
    }
    finally {
        return { ServiceData, serviceError, isLoadingservies };
    }
}

export const useFetchInspirations = (category: string) => {

    const [InspirationData, SetInspiration] = useState<IMedia_Inspirations[]>([]);
    const [DataError, SetDataError] = useState<unknown>(null);
    const [isLoading, SetisLoading] = useState<boolean>(true);

    try {
        useEffect(() => {
            const GetImages = async () => {
                const q = query(collection(db, "Media_Inspirations"), where("category", "==", category.trim()));
                const querySnapshot = await getDocs(q);
                var tempData: IMedia_Inspirations[] = [];
                SetisLoading(true);
                querySnapshot.forEach((doc) => {
                    tempData.push({
                        documentId: doc.id,
                        category: doc.data()?.category,
                        media: doc.data()?.media
                    })
                    SetInspiration(tempData);
                });
                SetisLoading(false);
            }
            GetImages();
        }, [category]);
    } catch (error) {
        SetisLoading(false);
        SetDataError(error);
    } finally {
        
        return { InspirationData, DataError, isLoading };
    }

}

export const useFetchBidCredits = (Ukey: string) => {
    const [BidCredits, SetBidCredits] = useState<IBidCredits[]>([]);
    const [BidCreditError, SetBidCreditError] = useState<unknown>(null);
    const [isLoadingCredits, SetisLoadingCredits] = useState<boolean>(false);

    useEffect(() => {
        const colRef = collection(db, "BidCredits");
        SetisLoadingCredits(true);

        const unsubscribe = onSnapshot(colRef, (snapshot) => {
            const tempData: IBidCredits[] = [];
            snapshot.docs.forEach((doc) => {
                if (doc.id === Ukey) {
                    tempData.push({
                        credit: doc.data()?.credit,
                        tokens: doc.data()?.tokens
                    });
                }
            });
            SetBidCredits(tempData);
            SetisLoadingCredits(false);
        }, (error) => {
            SetisLoadingCredits(false);
            SetBidCreditError(error);
        });

        return () => unsubscribe();
    }, []);

    return { BidCredits, BidCreditError, isLoadingCredits };
};

export const useFetchUserAccount = (ukey: string | null) => {

    const [UserData, SetUserData] = useState<IUser[]>([]);
    const [accountError, SetaccountError] = useState<unknown>(null);
    const [isGettingAccount, SetisGettingAccount] = useState<boolean>(false);
    try {
        useEffect(() => {
            getUserData(ukey, SetUserData, SetaccountError, SetisGettingAccount);
        }, [ukey]);

    } catch (error) {
        SetisGettingAccount(false);
        SetaccountError(error);
    }
    finally {
        return { UserData, accountError, isGettingAccount };
    }
}

const getUserData = async (ukey: string | null, SetUserData: Dispatch<SetStateAction<IUser[]>>, SetaccountError: Dispatch<SetStateAction<unknown>>, SetisGettingAccount: Dispatch<SetStateAction<boolean>>) => {
    if (await ukey !== null) {
        const colRef = collection(db, "Users");
        var tempData: IUser[] = [];
        SetisGettingAccount(true);
        const unsubscribe = onSnapshot(colRef, (snapshot) => {
            tempData = [];
            snapshot?.docs?.forEach(async (doc) => {
                if (doc?.id?.trim() === await ukey?.trim()) {
                    tempData.push(
                        {
                            Id: doc.id,
                            companyName: doc.data()?.companyName,
                            companyEmail: doc.data()?.companyEmail,
                            phone: doc.data()?.phone,
                            Address: doc.data()?.Address,
                            profileImage: doc.data()?.profileImage,
                            certificate: doc.data()?.certificate,
                            imgfilename: doc.data()?.imgfilename,
                            pdffilename: doc.data()?.pdffilename,
                            isactive: doc.data()?.isactive,
                            membership: doc.data()?.membership,
                            Services: doc.data()?.Services,
                            tncs: doc.data()?.tncs,
                            YourName: doc.data()?.YourName,
                            YourSurName: doc.data()?.YourSurName,
                            RegistrationNo: doc.data()?.RegistrationNo,
                            YourID: doc.data()?.YourID,
                            formSubmitted: doc.data()?.formSubmitted,
                            AdvertisingMsg: doc.data()?.AdvertisingMsg,
                        }
                    );
                }
                SetUserData(tempData);
                SetisGettingAccount(false);
            });
        })
        return () => unsubscribe();
    }
}

export const useFetchUserProjects = (ukey: string | null) => {

    const [UserProjects, SetUserProjects] = useState<IProjects[]>([]);
    const [ProjectsError, SetProjectsError] = useState<unknown>(null);
    const [isGettingProjects, SetisGettingProjects] = useState<boolean>(false);
    try {
        useEffect(() => {
            getUserProject(ukey, SetUserProjects, SetProjectsError, SetisGettingProjects);
        }, [ukey]);

    } catch (error) {
        SetisGettingProjects(false);
        SetProjectsError(error);
    }
    finally {
        return { UserProjects, ProjectsError, isGettingProjects };
    }
}

const getUserProject = async (ukey: string | null, SetUserProjects: Dispatch<SetStateAction<IProjects[]>>, SetProjectsError: Dispatch<SetStateAction<unknown>>, SetisGettingProjects: Dispatch<SetStateAction<boolean>>) => {
    if (await ukey !== null) {
        const colRef = collection(db, "Projects");
        var tempData: IProjects[] = [];
        SetisGettingProjects(true);
        const unsubscribe = onSnapshot(colRef, (snapshot) => {
            tempData = [];
            snapshot?.docs?.forEach(async (doc) => {
                if (doc.data()?.ownerId.trim() === await ukey?.trim()) {
                    tempData.push(
                        {
                            ProjectId: doc.id,
                            ownerId: doc.data()?.ownerId,
                            owner: doc.data()?.owner,
                            Profpic: doc.data()?.Profpic,
                            task: doc.data()?.task,
                            email: doc.data()?.email,
                            phone: doc.data()?.phone,
                            addrs: doc.data()?.addrs,
                            postTime: doc.data()?.postTime,
                            AllcontactorKeys: doc.data()?.AllcontactorKeys,
                            description: doc.data()?.description,
                            budget: doc.data()?.budget,
                            otherOffers: doc.data()?.otherOffers,
                            bestOffer: doc.data()?.bestOffer,
                            Status: doc.data()?.Status,
                            winnerId: doc.data()?.winnerId,
                            bstOffrId: doc.data()?.bstOffrId,
                            tncs: doc.data()?.tncs,
                        }
                    );
                } else if (ukey == "") {
                    tempData.push(
                        {
                            ProjectId: doc.id,
                            ownerId: doc.data()?.ownerId,
                            owner: doc.data()?.owner,
                            Profpic: doc.data()?.Profpic,
                            task: doc.data()?.task,
                            email: doc.data()?.email,
                            phone: doc.data()?.phone,
                            addrs: doc.data()?.addrs,
                            postTime: doc.data()?.postTime,
                            AllcontactorKeys: doc.data()?.AllcontactorKeys,
                            description: doc.data()?.description,
                            budget: doc.data()?.budget,
                            otherOffers: doc.data()?.otherOffers,
                            bestOffer: doc.data()?.bestOffer,
                            Status: doc.data()?.Status,
                            winnerId: doc.data()?.winnerId,
                            bstOffrId: doc.data()?.bstOffrId,
                            tncs: doc.data()?.tncs,
                        }
                    );
                }
                SetUserProjects(tempData);
                SetisGettingProjects(false);
            });
        })
        return () => unsubscribe();
    }
}

export const useFetchgetContractorProjects = (userKey: string) => {
    const [ContractorProjects, SetContractorProjects] = useState<IProjects[]>([]);
    const [ProjectsError, SetProjectsError] = useState<unknown>(null);
    const [isGettingProjects, SetisGettingProjects] = useState<boolean>(false);
    try {
        useEffect(() => {
            const colRef = collection(db, "Projects");
            const unsubscribe = onSnapshot(colRef, (snapshot) => {
                var tempData: IProjects[] = [];
                snapshot.forEach((doc) => {
                    if (doc.data()?.otherOffers?.length > 0) {
                        doc.data().otherOffers?.forEach((item: any) => {
                            SetisGettingProjects(true);
                            if (item.CompanyKey == userKey) {
                                tempData.push({
                                    ProjectId: doc.id,
                                    ownerId: doc.data()?.ownerId,
                                    owner: doc.data()?.owner,
                                    Profpic: doc.data()?.Profpic,
                                    task: doc.data()?.task,
                                    email: doc.data()?.email,
                                    phone: doc.data()?.phone,
                                    addrs: doc.data()?.addrs,
                                    postTime: doc.data()?.postTime,
                                    AllcontactorKeys: doc.data()?.AllcontactorKeys,
                                    description: doc.data()?.description,
                                    budget: doc.data()?.budget,
                                    otherOffers: doc.data()?.otherOffers,
                                    bestOffer: doc.data()?.bestOffer,
                                    Status: doc.data()?.Status,
                                    winnerId: doc.data()?.winnerId,
                                    bstOffrId: doc.data()?.bstOffrId,
                                    tncs: doc.data()?.tncs,
                                });
                            }
                            SetisGettingProjects(false);
                            SetContractorProjects(tempData);
                        });
                    }
                });
            });
            return () => unsubscribe();
        }, [userKey]);

    } catch (error: any) {
        SetisGettingProjects(false);
        SetProjectsError(error.message);
    } finally {
        return { ContractorProjects, ProjectsError, isGettingProjects };
    }
}

export const useFetchSingleProjects = (projectId: string) => {

    const [SingleProject, SetProject] = useState<IProjects>(DefaultProjectObject);
    const [ProjectError, SetProjectError] = useState<unknown>(null);
    const [isGettingProject, SetisGettingProject] = useState<boolean>(false);
    try {
        useEffect(() => {
            const colRef = collection(db, "Projects");
            const unsubscribe = onSnapshot(colRef, (snapshot) => {
                if (snapshot.size > 0) {
                    SetisGettingProject(true);
                    snapshot.forEach(doc => {
                        if (doc.id == projectId) {
                            SetProject(
                                {
                                    ProjectId: doc.id,
                                    ownerId: doc.data()?.ownerId,
                                    owner: doc.data()?.owner,
                                    Profpic: doc.data()?.Profpic,
                                    task: doc.data()?.task,
                                    email: doc.data()?.email,
                                    phone: doc.data()?.phone,
                                    addrs: doc.data()?.addrs,
                                    postTime: doc.data()?.postTime,
                                    AllcontactorKeys: doc.data()?.AllcontactorKeys,
                                    description: doc.data()?.description,
                                    budget: doc.data()?.budget,
                                    otherOffers: doc.data()?.otherOffers,
                                    bestOffer: doc.data()?.bestOffer,
                                    Status: doc.data()?.Status,
                                    winnerId: doc.data()?.winnerId,
                                    bstOffrId: doc.data()?.bstOffrId,
                                    tncs: doc.data()?.tncs,
                                }
                            )
                        }
                    })
                    SetisGettingProject(false);
                }

            });
        }, [projectId]);

    } catch (error: any) {
        SetisGettingProject(false);
        SetProjectError(error.message);
    } finally {
        return { SingleProject, ProjectError, isGettingProject };
    }

}

export const useFetchContractorsAccount = (prov: string | null) => {

    const [UserData, SetUserData] = useState<IUser[]>([]);
    const [accountError, SetaccountError] = useState<unknown>(null);
    const [isGettingAccount, SetisGettingAccount] = useState<boolean>(false);
    try {
        useEffect(() => {
            getContractorData(prov, SetUserData, SetaccountError, SetisGettingAccount);
        }, [prov]);

    } catch (error) {
        SetisGettingAccount(false);
        SetaccountError(error);
    }
    finally {
        return { UserData, accountError, isGettingAccount };
    }
}

const getContractorData = async (Address: string | null, SetUserData: Dispatch<SetStateAction<IUser[]>>, SetaccountError: Dispatch<SetStateAction<unknown>>, SetisGettingAccount: Dispatch<SetStateAction<boolean>>) => {
    if (await Address !== null) {
        
        const colRef = collection(db, "Users");
        var tempData: IUser[] = [];
        SetisGettingAccount(true);
        const unsubscribe = onSnapshot(colRef, (snapshot) => {
            tempData = [];
            snapshot?.docs?.forEach(async (doc) => {
                if(await Address?.trim().toLocaleLowerCase() !== "all" && Array.isArray(doc.data()?.Address)){
                    if (doc.data()?.Address?.includes(await Address?.trim())
                        && doc.data()?.membership === "contractor") {
                        tempData.push(
                            {
                                Id: doc.id,
                                companyName: doc.data()?.companyName,
                                companyEmail: doc.data()?.companyEmail,
                                phone: doc.data()?.phone,
                                Address: doc.data()?.Address,
                                profileImage: doc.data()?.profileImage,
                                certificate: doc.data()?.certificate,
                                imgfilename: doc.data()?.imgfilename,
                                pdffilename: doc.data()?.pdffilename,
                                isactive: doc.data()?.isactive,
                                membership: doc.data()?.membership,
                                Services: doc.data()?.Services,
                                tncs: doc.data()?.tncs,
                                YourName: doc.data()?.YourName,
                                YourSurName: doc.data()?.YourSurName,
                                RegistrationNo: doc.data()?.RegistrationNo,
                                YourID: doc.data()?.YourID,
                                formSubmitted: doc.data()?.formSubmitted,
                                AdvertisingMsg: doc.data()?.AdvertisingMsg,
                            }
                        );
                    }
                }else
                if ( await Address?.trim().toLocaleLowerCase() !== "all" && doc.data()?.Address?.trim().toLocaleLowerCase()===await Address?.trim().toLocaleLowerCase() 
                    && doc.data()?.membership === "contractor") {
                    tempData.push(
                        {
                            Id: doc.id,
                            companyName: doc.data()?.companyName,
                            companyEmail: doc.data()?.companyEmail,
                            phone: doc.data()?.phone,
                            Address: doc.data()?.Address,
                            profileImage: doc.data()?.profileImage,
                            certificate: doc.data()?.certificate,
                            imgfilename: doc.data()?.imgfilename,
                            pdffilename: doc.data()?.pdffilename,
                            isactive: doc.data()?.isactive,
                            membership: doc.data()?.membership,
                            Services: doc.data()?.Services,
                            tncs: doc.data()?.tncs,
                            YourName: doc.data()?.YourName,
                            YourSurName: doc.data()?.YourSurName,
                            RegistrationNo: doc.data()?.RegistrationNo,
                            YourID: doc.data()?.YourID,
                            formSubmitted: doc.data()?.formSubmitted,
                            AdvertisingMsg: doc.data()?.AdvertisingMsg,
                        }
                    );
                } else if (await Address?.trim().toLocaleLowerCase() == "all" && doc.data()?.membership === "contractor") {
                    
                    tempData.push(
                        {
                            Id: doc.id,
                            companyName: doc.data()?.companyName,
                            companyEmail: doc.data()?.companyEmail,
                            phone: doc.data()?.phone,
                            Address: doc.data()?.Address,
                            profileImage: doc.data()?.profileImage,
                            certificate: doc.data()?.certificate,
                            imgfilename: doc.data()?.imgfilename,
                            pdffilename: doc.data()?.pdffilename,
                            isactive: doc.data()?.isactive,
                            membership: doc.data()?.membership,
                            Services: doc.data()?.Services,
                            tncs: doc.data()?.tncs,
                            YourName: doc.data()?.YourName,
                            YourSurName: doc.data()?.YourSurName,
                            RegistrationNo: doc.data()?.RegistrationNo,
                            YourID: doc.data()?.YourID,
                            formSubmitted: doc.data()?.formSubmitted,
                            AdvertisingMsg: doc.data()?.AdvertisingMsg,
                        }
                    );
                }
                SetUserData(tempData);
                SetisGettingAccount(false);
            });
        })
        return () => unsubscribe();
    }
}

export const useFetchReviews = (contractorId: string) => {

    const [userReviews, SetuserReviews] = useState<IReviews[]>([]);
    const [ReviewsError, SetReviewsError] = useState<unknown>(null);
    const [isGettingReviews, SetisGettingReviews] = useState<boolean>(false);
    try {

        useEffect(() => {
            const colRef = collection(db, "Ratings");

            const unsubscribe = onSnapshot(colRef, (snapshot) => {
                var tempData: IReviews[] = [];
                snapshot.forEach((doc) => {
                    if (doc?.data()?.contractorId == contractorId) {
                        SetisGettingReviews(true);
                        tempData.push({
                            Id: doc.id,
                            comment: doc?.data()?.comment,
                            contractorId: doc?.data()?.contractorId,
                            homeOwnerId: doc?.data()?.homeOwnerId,
                            homeOwnerName: doc?.data()?.homeOwnerName,
                            stars: doc?.data()?.stars,
                            dateReviewed: doc?.data()?.dateRated,
                            profilePicReviewer: doc?.data()?.profilePicReviewer
                        })
                    }

                });
                SetuserReviews(tempData);
                SetisGettingReviews(false);
            });
            return () => unsubscribe();
        }, []);
    } catch (error: any) {
        SetuserReviews([]);
        SetisGettingReviews(false);
        SetReviewsError(error.message);
    } finally {
        return { userReviews, ReviewsError, isGettingReviews };
    }

}