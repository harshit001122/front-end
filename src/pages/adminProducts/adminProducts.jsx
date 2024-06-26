import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux"
import { GetProduct } from '../../redux/slices/getProducts';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { deleteCartItem } from '../../redux/slices/deleteProduct';
import NoITemFound from '../../components/NoITemFound';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
    const [productsElements, setProductsElements] = useState([])
    const [addItemId, setAddItemId] = useState(null)
    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.cart)
    const productData = useSelector((state) => state.getProducts)
    const deleteProducts = useSelector((state) => state.deleteProducts)

    const getAllProduct = async () => {
        const res = await dispatch(GetProduct());
        setProductsElements(res?.payload?.products)
    }

    const removeItem = async (_id) => {
        setAddItemId(_id)
        const payload = {
            productId: _id,
        }
        try {
            const res = await dispatch(deleteCartItem(payload));
            if (res.payload?.success === true) {
                toast.success(res?.payload?.message)
            } else {
                toast.error(res?.payload?.message)
            }
        } catch (error) {
            toast.error(error?.message)
        }
    }

    useEffect(() => {
        getAllProduct();
    }, [deleteProducts?.data?.product?.quantity, deleteProducts?.data?.product?.price])

    return (
        <>
            <div className="container pb-10 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productData?.status === "loading" &&
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={true}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                }
                {productsElements?.length > 0 && productsElements?.map((product) => (
                    <div key={product?._id}
                        className="bg-white shadow-lg rounded overflow-hidden group">
                        <img
                            src={product?.imagePath}
                            alt={product?.name}
                            className='w-full h-48 object-cover'
                        />
                        <div className="p-4">
                            <h4 className="uppercase font-medium text-lg mb-2 text-gray-800 hover:text-primary transition">
                                {product?.name}
                            </h4>
                            <div className="flex items-baseline mb-1 space-x-2">
                                <p className="text-lg text-lime-700 font-semibold">
                                    ${product?.price}
                                </p>
                                <p className="text-sm text-gray-400 line-through">$55.90</p>
                            </div>
                            <div className="flex items-center">
                                <div className="flex gap-1 text-sm text-yellow-400">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <span key={index}>
                                            <FaStar />
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between items-center p-4'>
                            <button
                                onClick={() => removeItem(product?._id)}
                                className="w-full py-2 text-center text-white bg-red-500 border border-red-500 rounded-b hover:bg-transparent hover:text-red-500 cursor-pointer transition">
                                {addItemId == product?._id && deleteProducts?.status == "loading" ?
                                    <div className="flex justify-center items-center">
                                        <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-orange-600"></div>
                                    </div>
                                    : 'Delete Item'}
                            </button>
                            <Link to={`/update-product/${product?._id}`}
                                className="w-full py-2 text-center text-white bg-blue-500 border border-blue-500 rounded-b hover:bg-transparent hover:text-blue-500 transition">
                                Update Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {(cartData.status == "succeeded" && productsElements?.length < 1) &&
                <NoITemFound title="Admin Panel"/>
            }
        </>
    )
}

export default AdminProducts