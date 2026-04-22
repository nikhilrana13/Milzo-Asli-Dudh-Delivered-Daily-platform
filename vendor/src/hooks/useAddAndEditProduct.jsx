import { api } from '@/utils/api';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const useAddAndEditProduct = ({ isEdit, productId, onSuccess }) => {
    const [loading, setLoading] = useState(false);

    const submitProduct = async (data, selectedImages,existingImages) => {
        const formdata = new FormData();
        formdata.append("productName", data.productName);
        formdata.append("description", data.description);
        formdata.append("category", data.category);
        formdata.append("priceOptions", JSON.stringify(data.priceOptions));
        selectedImages.forEach((file) => {
            formdata.append("images", file);
        });
        if(isEdit){
            formdata.append("existingImages",JSON.stringify(existingImages))
        }
        try {
            setLoading(true);
            const response = isEdit
                ? await api.put(`/api/products/update/${productId}`, formdata)
                : await api.post(`/api/products/add-product`, formdata);

            if (response?.status === "success") {
                toast.success(response.message);
                onSuccess && onSuccess();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    return {submitProduct,loading}
}

export default useAddAndEditProduct;
