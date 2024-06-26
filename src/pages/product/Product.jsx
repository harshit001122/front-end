import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { singleProduct } from "../../redux/slices/SignleProduct";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {toast} from "react-toastify";

const Product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const singleProductData = useSelector((state) => state.singleProduct);

    const getsingleProductData = async () => {
        const res = await dispatch(singleProduct(id));
        if (res?.error?.message === "Rejected") {
            toast.error(res?.payload?.message);
        }
    };

    useEffect(() => {
        getsingleProductData();
    }, [id]);

    return (
        <div className="container flex flex-col md:flex-row items-center mt-10 mb-10">
            {singleProductData?.status === "loading" && (
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}

            <div className="md:w-1/2">
                <img src={singleProductData?.data?.product?.imagePath} alt="product" className="w-full h-auto shadow-lg rounded-lg" />
            </div>
            <div className="md:w-1/2 md:pl-10">
                <h2 className="text-3xl font-bold text-blue-800 mt-4 mb-6">{singleProductData?.data?.product?.name}</h2>
                <div className="mb-6">
                    <p className="text-lg text-gray-700 mb-2">
                        <span className="font-semibold">Brand:</span> {singleProductData?.data?.product?.brand}
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                        <span className="font-semibold">Quantity:</span> {singleProductData?.data?.product?.quantity}
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                        <span className="font-semibold">Category:</span> {singleProductData?.data?.product?.category}
                    </p>
                </div>
                <div className="mb-6">
                    <p className="text-xl text-gray-800 font-semibold mb-2">
                        Price: {singleProductData?.data?.product?.price}
                    </p>
                    <hr className="mb-6" />
                    <p className="text-lg text-gray-700">
                        <span className="font-semibold">Description:</span> {singleProductData?.data?.product?.description}
                    </p>
                </div>
                <div className="flex justify-between">
                    <Link to="/" className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-transparent hover:text-black transition">
                        Back to Home
                    </Link>
                    <Link to={`/buy-product/${id}`} className="border border-gray-300 text-gray-600 py-2 px-4 rounded hover:text-black transition">
                        Order Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Product;