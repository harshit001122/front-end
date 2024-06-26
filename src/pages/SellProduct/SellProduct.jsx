import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axios';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { AddProduct } from '../../redux/slices/productsSlice';
import Cookies from "js-cookie";
import { productSchema } from '../../validations';
import { useParams, useNavigate } from 'react-router-dom';
import { singleProduct } from '../../redux/slices/SignleProduct';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { updateCartDetails } from '../../redux/slices/updateProduct';

const SellProduct = () => {
    const [fileData, setFileData] = useState([]);
    const dispatch = useDispatch();
    const productsData = useSelector((state) => state.products);
    const updateditemData = useSelector((state) => state.updateProduct);
    const navigate = useNavigate();

    const { setValues, values, errors, touched, resetForm, handleChange, handleBlur, handleSubmit, setFieldValue } =
        useFormik({
            initialValues: {
                name: "",
                description: "",
                price: "",
                quantity: "",
                uploadfile: "",
                brand: "",
                category: "",
            },
            validationSchema: productSchema,
            onSubmit: async (values, { resetForm }) => {
                const payload = {
                    name: values.name,
                    description: values.description,
                    price: values.price,
                    quantity: values.quantity,
                    imagePath: fileData.imagePath,
                    filename: fileData.filename,
                    originalname: fileData.originalname,
                    brand: values.brand,
                    category: values.category,
                };
                try {
                    const res = await dispatch(AddProduct(payload));
                    resetForm();
                    setFileData([]);
                    if (res.payload.success === true) {
                        toast.success(res.payload.message);
                    } else {
                        toast.error(res.payload.message);
                    }
                } catch (error) {
                    console.log(error);
                    toast.error("Some error occurred while processing!");
                }
            },
        });

    const handleFileUpload = async (e, setFieldValue) => {
        const ImageData = new FormData();
        ImageData.append('photo', e.target.files?.[0]);
        const token = Cookies.get('token');
        try {
            const res = await axiosInstance.post("product/addProductImage", ImageData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                setFileData(res.data);
                setFieldValue('uploadfile', res.data.filename);
                toast.success(res.data.message);
            }
        } catch (err) {
            console.error('Error uploading file', err);
            toast.error("Some error occurred while uploading file");
        }
    };

    const singleProductData = useSelector((state) => state.singleProduct);
    const { id } = useParams();

    const getProductsdetails = async () => {
        const { payload } = await dispatch(singleProduct(id));
        const { name, filename, description, imagePath, price, quantity, brand, category } = payload.product;
        setValues({
            name: name,
            price: price,
            uploadfile: imagePath,
            quantity: quantity,
            description: description,
            brand: brand,
            category: category,
        });
        setFileData({
            imagePath: imagePath,
            filename: filename,
        });
    };

    const updateDetails = async () => {
        const payloadData = {
            name: values?.name,
            description: values?.description,
            price: values?.price,
            quantity: values?.quantity,
            brand: values?.brand,
            category: values?.category,
            productId: id,
        };
        const { payload } = await dispatch(updateCartDetails(payloadData));
        if (payload.success === true) {
            toast.success(payload?.message);
            resetForm();
            setFileData([]);
            navigate('/');
        } else {
            toast.error(payload?.message);
        }
    };

    useEffect(() => {
        if (id) {
            console.log(id);
            getProductsdetails();
        }
    }, [id]);

    return (
        <>
            {singleProductData.status === "loading" && (
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
            <div className="w-full flex flex-col justify-center items-center mt-10">
                <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
                    <div className="flex flex-col items-center">
                        <div className="w-full flex flex-col items-center">
                            {fileData.filename && (
                                <img src={fileData.imagePath} alt={fileData.originalname} className="h-56 w-full object-cover mb-5 rounded-lg" />
                            )}
                            <label className={`w-full flex flex-col items-center px-4 py-6 bg-blue-500 text-white rounded-lg shadow-md tracking-wide uppercase border border-blue cursor-pointer`}>
                                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                </svg>
                                <span className="mt-2 text-base leading-normal">Upload a file</span>
                                <input disabled={id ? true : false} type='file' name='uploadfile' className="hidden" onChange={(e) => handleFileUpload(e, setFieldValue)} />
                            </label>
                        </div>
                        {errors.uploadfile && touched.uploadfile ? (
                            <div className="text-red-500 text-center mt-4 sm:text-2xl text-[12px] italic">{errors.uploadfile}</div>
                        ) : null}
                    </div>
                    <form onSubmit={handleSubmit} className="w-full mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="text-gray-600 mb-1 block">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="Product Name"
                                />
                                {errors.name && touched.name ? (
                                    <div className="text-red-500 text-[12px] italic">{errors.name}</div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="description" className="text-gray-600 mb-1 block">Product Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="Product Description"
                                />
                                {errors.description && touched.description ? (
                                    <div className="text-red-500 text-[12px] italic">{errors.description}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div>
                                <label htmlFor="price" className="text-gray-600 mb-1 block">Product Price ($)</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={values.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="Product Price"
                                />
                                {errors.price && touched.price ? (
                                    <div className="text-red-500 text-[12px] italic">{errors.price}</div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="quantity" className="text-gray-600 mb-1 block">Product Quantity</label>
                                <input
                                    type="text"
                                    name="quantity"
                                    value={values.quantity}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="Product Quantity"
                                />
                                {errors.quantity && touched.quantity ? (
                                    <div className="text-red-500 text-[12px] italic">{errors.quantity}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div>
                                <label htmlFor="brand" className="text-gray-600 mb-1 block">Product Brand</label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={values.brand}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="Product Brand"
                                />
                                {errors.brand && touched.brand ? (
                                    <div className="text-red-500 text-[12px] italic">{errors.brand}</div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="category" className="text-gray-600 mb-1 block">Product Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={values.category}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="Product Category"
                                />
                                {errors.category && touched.category ? (
                                    <div className="text-red-500 text-[12px] italic">{errors.category}</div>
                                ) : null}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="block w-full py-3 mt-6 bg-blue-500 text-black border-black rounded-lg hover:bg-blue-600 transition uppercase font-medium"
                        >
                            {(productsData.status === "loading" || updateditemData.status === "loading") ? (
                                <div className="flex justify-center items-center">
                                    <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-orange-600"></div>
                                </div>
                            ) : (
                                id ? <div onClick={updateDetails}>Update Product</div> : <div onClick={handleSubmit}>Upload Product</div>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SellProduct;
