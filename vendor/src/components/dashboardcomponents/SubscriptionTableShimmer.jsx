import React from "react";

const SubscriptionsTableShimmer = () => {
    return (
        <>
            {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-t animate-pulse">
                    <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                            <div className="flex flex-col gap-2">
                                <div className="h-3 w-24 bg-gray-200 rounded"></div>
                                <div className="h-2 w-32 bg-gray-100 rounded"></div>
                            </div>
                        </div>
                    </td>
                    <td className="px-4 py-4">
                        <div className="h-3 w-20 bg-gray-200 rounded"></div>
                    </td>
                    <td className="px-4 py-4">
                        <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    </td>
                    <td className="px-4 py-4">
                        <div className="h-3 w-20 bg-gray-200 rounded"></div>
                    </td>
                    <td className="px-4 py-4">
                        <div className="h-3 w-20 bg-gray-200 rounded"></div>
                    </td>
                    <td className="px-4 py-4">
                        <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                    </td>
                    <td className="px-4 py-4">
                        <div className="flex flex-col gap-2">
                            <div className="h-3 w-32 bg-gray-200 rounded"></div>
                            <div className="h-2 w-24 bg-gray-100 rounded"></div>
                        </div>
                    </td>
                    <td className="px-4 py-4">
                        <div className="h-5 w-14 bg-gray-200 rounded-full"></div>
                    </td>
                    <td className="px-9 py-4">
                        <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default SubscriptionsTableShimmer;