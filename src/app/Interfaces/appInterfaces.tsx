import { StaticImageData } from "next/image";

export interface Ijobs {
    id: string,
    jobname: string,
    imgsr: StaticImageData,
    def: string,
    duties: string[]
};
export interface IOtherOffers{
    Id: string,
    companyName: string,
    companyEmail: string,
    firstName: string,
    LastName: string,
    phone: string,
    profileImage: string,
    Address: string | string[],
    membership: string,
    CompanyKey:string,
    OfferMade:string,
}

export interface IProjects {
    owner: string,
    ownerId: string,
    Profpic: string,
    task: string,
    email: string,
    phone: string,
    addrs: string,
    postTime: string,
    AllcontactorKeys:string[],
    description: string,
    budget: string,
    otherOffers: IOtherOffers[],
    bestOffer: string,
    Status: string,
    winnerId: string,
    bstOffrId: string,
    tncs: string,
    ProjectId:string,
}
export interface Bidders {
    id: string;
    YourName: string;
    companyEmail: string;
    YourSurName:string;
    companyName:string;
    formSubmitted:string;
    profileImage:string;
  }
export interface IReviews{
    Id: string,
    comment:string,
    contractorId:string,
    homeOwnerId:string,
    homeOwnerName:string,
    stars:string,
    dateReviewed:string,
    profilePicReviewer:string
}

export interface IhowItwors {
    tittle: string,
    imgsr: StaticImageData,
}

export interface Iservices {
    serviceType: string
}
export interface Iinspirations {
    id: string,
    tittle: string,
    imgsr: StaticImageData,
    caption: string,
    sharelink: string
}
export interface Icontractors {
    id: string,
    company: string,
    imgsr: StaticImageData,
    encouragingWords: string,
    rating: number,
    jobcategory: string[],
    experience: number,
    phone: string,
    address: string
}

export interface ITowns {
    area: string,
    prov: string,
}

export interface IProvince {
    Id: string,
    province: string,
    Towns: ITowns[],
}

export interface IActualTasks {
    category: string,
    task: string,
}

export interface IServices {
    Id: string,
    ServiceType: string,
    actualTask: IActualTasks[],
}

export type QuotaExceededError = {
    message: "Opps...! Could not initialize session for your account. plase update your browser or use another browser.",
}

export interface IUser {
    Id: string,
    companyName: string,
    companyEmail: string,
    phone: string,
    Address: string[],
    profileImage: string,
    certificate: string,
    imgfilename: string,
    pdffilename: string,
    isactive: string,
    membership: string,
    Services: string[],
    tncs: string,
    YourName:string,
    YourSurName:string,
    RegistrationNo:string,
    YourID:string,
    formSubmitted:string,
    AdvertisingMsg:string,
}


export interface IPlans{
    id:number,
    Package:string,
    Offering:string,
    Price:number,
    bid:number
}

export interface ITokens{
    BidsGenerated:string,
    Time_stamp:string,
    Tokencost:string,
    purchaseToken:string
}

export interface IBidCredits{
    credit:string,
    tokens:ITokens[]
}

export const DefaultProjectObject =
{
    ProjectId: "",
    ownerId: "",
    owner: "",
    Profpic: "",
    task: "",
    email: "",
    phone: "",
    addrs: "",
    postTime: "",
    AllcontactorKeys:[],
    description: "",
    budget: "",
    otherOffers: [
        {
            Id: "",
            companyName: "",
            companyEmail: "",
            firstName: "",
            LastName: "",
            phone: "",
            profileImage: "",
            Address: "",
            membership: "",
            CompanyKey: "",
            OfferMade: "",
        }
    ],
    bestOffer: "",
    Status: "",
    winnerId: "",
    bstOffrId: "",
    tncs: "",
}

interface Media{
    category:string,
    Filename:string,
    url:string
}
export interface IMedia_Inspirations{
    documentId:string,
    category:string,
    media:Media[]
}
export interface IRecommendationDetails{
    contName:string,
    cmpName:string,
    cmpPhone:string,
    cmpAddr:string[],
    cmpService:string[],
    recomName:string,
    relation:string,
    dateOfReccomnd:string
}
export interface IAwardproject{
    project:string,
    homeowmer:string,
    phoneNum:string
}

