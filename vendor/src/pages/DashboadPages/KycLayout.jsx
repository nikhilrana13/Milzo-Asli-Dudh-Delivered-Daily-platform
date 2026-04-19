import React from 'react';
import { useSelector } from 'react-redux';
import KycApprovedUi from './KycApprovedUi';
import KycPendingUi from './KycPendingUi';
import KycRejectedUi from './KycRejectedUi';
import KycForm from './KycForm';

const KycLayout = () => {
  const user = useSelector((state)=>state.Auth.user)
  if (!user) return null; 

  switch(user?.kycStatus){
    case "approved" : 
    return <KycApprovedUi />;
    case "pending": 
    return <KycPendingUi />; 
    case "rejected": 
    return <KycRejectedUi />
    default : 
    return <KycForm />
  }
}

export default KycLayout;
