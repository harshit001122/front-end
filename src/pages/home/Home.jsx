import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AllProduct from "../../components/AllProduct";

const Home = () => {
  return (
    <div className="bg-gray-800 min-h-screen">
      <div className="relative h-64 md:h-96 bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 to-transparent"></div>
        <div className="container mx-auto px-4 py-20 text-center text-white">
          <h1 className="text-3xl md:text-5xl text-white mb-4">Discover the Best Home Decor</h1>
          <p className="text-base md:text-lg mb-8">Elevate your space with our exquisite collection.</p>
          <Link
            to="/shop"
            className="bg-transparent border-2 border-white text-white px-8 py-3 font-medium rounded-md hover:bg-white hover:text-gray-800 transition duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center bg-white shadow-lg p-6 rounded-md">
            <div className="mr-4">
              <img src="images/icons/delivery-van.svg" alt="Free Shipping" className="w-12 h-12" />
            </div>
            <div>
              <h4 className="font-medium text-lg">Free Shipping</h4>
              <p className="text-gray-500 text-sm">On orders over $200</p>
            </div>
          </div>
          <div className="flex items-center bg-white shadow-lg p-6 rounded-md">
            <div className="mr-4">
              <img src="images/icons/money-back.svg" alt="Money Returns" className="w-12 h-12" />
            </div>
            <div>
              <h4 className="font-medium text-lg">30 Days Returns</h4>
              <p className="text-gray-500 text-sm">Hassle-free returns</p>
            </div>
          </div>
          <div className="flex items-center bg-white shadow-lg p-6 rounded-md">
            <div className="mr-4">
              <img src="images/icons/service-hours.svg" alt="24/7 Support" className="w-12 h-12" />
            </div>
            <div>
              <h4 className="font-medium text-lg">24/7 Support</h4>
              <p className="text-gray-500 text-sm">Customer support anytime</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-medium text-gray-800 mb-6">Top New Arrivals</h2>
        <AllProduct />
      </div>


      
    </div>
  );
};

export default Home;