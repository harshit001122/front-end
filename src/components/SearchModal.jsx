// import * as React from "react";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import { FaSearch, FaStar, FaCartPlus, FaInfoCircle } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux"
// import { handleCartAction } from "../redux/slices/CartSlice";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: { xs: 300, sm: 450, md: 600 },
//   maxHeight: "85%",
//   borderRadius: "10px",
//   bgcolor: "background.paper",
//   border: "1px solid #ccc",
//   boxShadow: 24,
//   overflow: "hidden",
//   p: 4,
// };

// export default function SearchModal({ openModal, handleCloseModal }) {
//   const [addItemId, setAddItemId] = React.useState(null);
//   const [filterItems, setFilterItems] = React.useState([]);
//   const { posts } = useSelector((state) => state.getProducts);
//   const cartData = useSelector((state) => state.cart);
//   const loginData = useSelector((state) => state.login.status);
//   const registerData = useSelector((state) => state.register.status);
//   const dispatch = useDispatch();

//   let token = Cookies.get("token");
//   let userData;
//   if (token) {
//     userData = jwtDecode(token);
//   }
//   const AddToCart = async (_id, price, imagePath, name) => {
//     setAddItemId(_id);
//     const payload = {
//       productId: _id,
//       price: price,
//       userId: userData.id,
//       itemName: name,
//       productImage: imagePath,
//     };
//     try {
//       const res = await dispatch(
//         handleCartAction({ actionType: "add", payload })
//       );
//       if (res.payload.success === true) {
//         toast.success(res?.payload?.message);
//       } else {
//         toast.error(res?.payload?.message);
//       }
//     } catch (error) {
//       toast.error(error?.message);
//     }
//     finally{
//         handleCloseModal();
//     }
//   };

//   const handleSearch = (searchTerm) => {
//     const filterdata = posts?.products?.filter(
//       (data) =>
//         data.name && data.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilterItems(filterdata);
//   };

//   React.useEffect(() => {
//     token = Cookies.get("token");
//   }, [loginData, registerData]);

//   return (
//     <>
//       <Modal
//         open={openModal}
//         onClose={handleCloseModal}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <div className="text-center text-2xl font-bold text-gray-700 mb-4">
//             Search Items
//           </div>
//           <div className="flex justify-center mb-4">
//             <input
//               type="text"
//               name="search"
//               id="search"
//               autoFocus={true}
//               className="w-full md:w-96 border border-gray-300 py-2 px-3 rounded-l-md focus:ring-2 focus:ring-primary focus:outline-none"
//               placeholder="Search products by name..."
//               onChange={(e) => {
//                 const value = e.target.value;
//                 handleSearch(value);
//               }}
//             />
//             <button className="bg-primary text-white px-4 rounded-r-md hover:bg-primary-dark transition">
//               <FaSearch />
//             </button>
//           </div>
//           <div className="overflow-y-auto h-[350px]">
//             {filterItems?.length > 0 ? (
//               filterItems.map((product) => (
//                 <div
//                   key={product?._id}
//                   className="bg-white mb-4 p-4 shadow rounded-md flex items-center"
//                 >
//                   <img
//                     src={product?.imagePath}
//                     alt={product?.name}
//                     className="w-20 h-20 object-cover rounded mr-4"
//                   />
//                   <div className="flex-1">
//                     <Link
//                       onClick={handleCloseModal}
//                       to={`/product/${product?._id}`}
//                       className="text-lg font-semibold text-gray-800 hover:text-primary transition"
//                     >
//                       {product?.name}
//                     </Link>
//                     <div className="text-sm text-gray-600">${product?.price}</div>
//                     <div className="flex items-center mt-2">
//                       <div className="flex gap-1 text-yellow-400">
//                         {Array.from({ length: 5 }).map((_, index) => (
//                           <FaStar key={index} />
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-center">
//                     <button
//                       onClick={() => AddToCart(product?._id, product?.price, product?.imagePath, product?.name)}
//                       className="bg-primary text-white px-2 py-1 rounded mb-2 hover:bg-primary-dark transition"
//                     >
//                       {addItemId === product?._id && cartData?.status === "loading" ? (
//                         <div className="w-4 h-4 border-4 border-dashed rounded-full animate-spin border-white"></div>
//                       ) : (
//                         <FaCartPlus />
//                       )}
//                     </button>
//                     <Link
//                       onClick={handleCloseModal}
//                       to={`/buy-product/${product?._id}`}
//                       className="bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300 transition"
//                     >
//                       <FaInfoCircle />
//                     </Link>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center text-gray-600">No products found</div>
//             )}
//           </div>
//         </Box>
//       </Modal>
//     </>
//   );
// }
