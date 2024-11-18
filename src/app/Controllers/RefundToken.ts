import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../DB/firebaseConnection";
import { failureMessage, successMessage } from "../notifications/successError";
import { Dispatch, SetStateAction } from "react";
import { IOtherOffers } from "../Interfaces/appInterfaces";
import { SendEmailToBidder } from "./SendEmailToBidder";

export const BalanceCheckNupdate = async ( 
    uId:string,companyEmail:string,setOpenModal:Dispatch<SetStateAction<boolean>>, ProjectIdBid: string, projectBudget: string, otherOffers: IOtherOffers[], bestOffer: string, bstOffrId: string,AllcontactorKeys:string[],homeownerPhone:string,task:string,owner:string ) => {
        const docRef = doc(db, "BidCredits", uId);
        const docSnap = await getDoc(docRef);

        const projRef = doc(db, "Projects", ProjectIdBid);
        const projSnap = await getDoc(projRef);
        let Creditbalance=0;
        
        if (docSnap.exists()) {
            if (parseInt(docSnap.data()?.credit) >= 0) {
                //check if they had already place a bid here on that project
                Creditbalance=parseInt(docSnap.data()?.credit);
                //CreditType=docSnap.data()?.CreditType;
                if(projSnap.exists()){
                    if(projSnap.data()?.AllcontactorKeys?.includes(uId)){
                        //setIsProcessing(false);
                        const update = {
                            otherOffers: otherOffers.filter(it=>it.CompanyKey!==uId),
                            bstOffrId: bstOffrId==bstOffrId ? "noId":bstOffrId,
                            AllcontactorKeys:AllcontactorKeys.filter(ix=>ix!==uId),
                        };
                        setDoc(doc(db, 'Projects', ProjectIdBid.trim()), update, { merge: true }).then(async() => {
                            //setIsProcessing(false);
                            successMessage("successful refund");
                            SendEmailToBidder("futurekgaphola@gmail.com",task,owner);
                            setOpenModal(false);
                            let updateBalance={
                                credit:Creditbalance+1,
                            }
                            await setDoc(doc(db, 'BidCredits', uId), updateBalance, { merge: true });
                        });
                        //successMessage("Your have aready places a bid on this project. You can only Bid once per project");
                    }
                }else{
                    //setIsProcessing(false);
                    failureMessage("Sorry, Project may have been removed, attempt to refresh page and try again.");
                }
            } 
        } else {
            //setIsProcessing(false);
            failureMessage("Sorry, We could not verify your biding wallet. Please contact Administrator or try again");
        }
}
