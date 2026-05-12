import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SavedAddressBox from './SavedAddressBox';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import { useGetUserSavedAddressesQuery } from '@/redux/api/UsersavedAddressesApi';
import SavedAddressShimmer from './SavedAddressShimmer';
import EmptySavedAddress from './EmptySavedAddress';
import { useUserLocation } from '@/context/LocationContext';
import { useDialog } from '@/context/DialogContext';
import useSearchLocation from '@/hooks/useSearchLocation';
import LocationSearchInput from './LocationSearchInput';
import CurrentLocationButton from './CurrentLocationButton';
import LocationSuggestionList from './LocationSuggestionList'
import AddnewAddress from './AddnewAddress';
import UpdateAddress from './UpdateAddress';
import { IoArrowBack } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';




const LocationSelectDialog = ({ onClose }) => {
    const user = useSelector((state) => state.Auth.user)
    useLockBodyScroll(true)
    const addressQuery = useGetUserSavedAddressesQuery(undefined, {
        skip: !user
    })
    const savedaddresses = addressQuery?.data?.data?.addresses || []
    const [selectedAddressId, setSelectedAddressId] = useState(
        localStorage.getItem("selectedAddressId") || null
    )
    const { setActiveDialog, dialogStep, setDialogStep } = useDialog()
    const search = useSearchLocation()
    const { setSelectedLocation, fetchUserCurrentLocation } = useUserLocation()
    const isSearchingUi = search?.loading || search?.showSuggestions || (search?.hasSearched && search.query.length >= 1)


    const handleSelectAddress = (address) => {
        localStorage.setItem("selectedAddressId", address?._id)
        setSelectedAddressId(address?._id)
    }
    const handleFetchCurrentLocation = () => {
        fetchUserCurrentLocation()
        setActiveDialog(null)
    }

    return (
        <>
            {/* backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                className="fixed inset-0 z-[99998] bg-black/20 backdrop-blur-[2px]"
            />
            {/* dialog */}
            <motion.div
                initial={{
                    opacity: 0,
                    x: 100
                }}
                animate={{
                    opacity: 1,
                    x: 0
                }}
                exit={{
                    opacity: 0,
                    x: 100
                }}
                transition={{
                    type: "spring",
                    damping: 26,
                    stiffness: 260,
                }}
                onClick={(e) => e.stopPropagation()} className="fixed inset-x-0 bottom-0 top-0 md:top-[72px] md:right-6 lg:right-30 md:left-auto z-[99999] w-full md:max-w-md  md:rounded-3xl border-l md:border bg-white shadow-2xl overflow-y-auto md:h-[500px] custom-scrollbar scroll-smooth">

                <div className="sticky top-0 z-20 bg-white border-b">
                    {/* drag indicator mobile only */}
                    <div className="flex justify-center pt-3 md:hidden">
                        <div className="h-1.5 w-12 rounded-full bg-gray-300" />
                    </div>
                    <div className="flex items-center gap-3 p-4 md:p-6">
                        {/* back button */}
                        {dialogStep === 1 && (
                             <button
                            onClick={onClose}
                            className="h-10 w-10 rounded-full flex items-center justify-center  hover:bg-gray-100 transition-all"
                        >
                            <IoArrowBack size={22} />
                        </button>
                        )}
                       
                        {dialogStep > 1 && (
                            <button
                                onClick={() => setDialogStep(1)}
                                className="h-10 w-10 rounded-full flex items-center justify-center  hover:bg-gray-100 transition-all"
                            >
                                <IoArrowBack size={22} />
                            </button>
                        )}
                        <div>
                            <h2 className="text-xl font-semibold text-[#191c1e]">
                                {dialogStep === 1 && "Select Location"}
                                {dialogStep === 2 && "Add New Address"}
                                {dialogStep === 3 && "Update Address"}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Manage your delivery location
                            </p>
                        </div>
                    </div>
                </div>
                {/* content */}
                {dialogStep === 1 && (
                    <div className="p-6 space-y-5">
                        {/* search input and location suggestions */}
                        <div className="relative w-full">
                            <LocationSearchInput search={search} />
                            {/* dropdown */}
                            <LocationSuggestionList search={search} setSelectedLocation={setSelectedLocation}
                                setActiveDialog={setActiveDialog} />
                        </div>
                        {/* saved adresses  */}
                        {!isSearchingUi && (
                            <>
                                <CurrentLocationButton onClick={handleFetchCurrentLocation} />
                                {user && (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-semibold text-gray-700">
                                                Saved Addresses
                                            </h3>

                                            <button onClick={() => setDialogStep(2)} className="text-sm font-medium text-[#16a34a]">
                                                Add New
                                            </button>
                                        </div>
                                        {/* address card */}
                                        {addressQuery.isLoading ? (
                                            ([1, 2, 3].map((_, i) => {
                                                return (
                                                    <SavedAddressShimmer key={i} />
                                                )
                                            }))
                                        ) : addressQuery?.isError ? (
                                            <p className='text-[1rem] text-center text-red-500 py-4'>
                                                Error loading saved addresses. Please try again.
                                            </p>
                                        ) : savedaddresses?.length > 0 ? (
                                            savedaddresses?.map((address) => {
                                                return (
                                                    <SavedAddressBox onClick={() => handleSelectAddress(address)} key={address?._id} address={address} isSelected={selectedAddressId === address?._id} />
                                                )
                                            })
                                        ) : (
                                            <EmptySavedAddress />
                                        )
                                        }
                                    </div>
                                )}
                                {!user && (
                                    <div className="rounded-2xl bg-[#f0fdf4] p-4 border border-[#dcfce7]">
                                        <p className="text-sm text-[#166534]">
                                            Login to save addresses for faster checkout ⚡
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
                {/* add new address ui */}
                {dialogStep === 2 && (
                    <AddnewAddress />
                )}
                {/* update address */}
                {dialogStep === 3 && (
                    <UpdateAddress />
                )}
            </motion.div>
        </>
    );
}

export default LocationSelectDialog;
