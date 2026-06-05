import { useGetAllVendorsQuery } from '@/redux/api/VendorApi';
import React from 'react';

const Vendors = () => {
   const vendorQuery = useGetAllVendorsQuery()
   const vendors = vendorQuery?.data?.data?.vendors ?? []
  //  console.log("vendors",vendors)

  return (
    <div>
      vendors
    </div>
  );
}

export default Vendors;
