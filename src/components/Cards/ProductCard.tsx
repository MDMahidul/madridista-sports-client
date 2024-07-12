import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import { TProduct } from "@/types/types";

type TProductCardProps ={
  product: TProduct;
}

const ProductCard = ({product}:TProductCardProps) => {
    const {imageLink,off,quantity,name,brand,category,ratings,price}=product;
    return (
      <div>
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 relative hover:shadow-lg">
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              className="rounded-t-lg product_card_img"
              src={imageLink}
              alt="product image"
            />
            {off > 0 ? <div className="absolute top-4 left-4 bg-tertiary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              {off}% OFF
            </div> : ''}
            <div
              className={`absolute top-4 right-4 bg-gray-50 ${
                quantity > 0 ? 'text-green-500' : 'text-red-500'
              } text-xs font-bold px-3 py-1 rounded-full shadow-md`}
            >
              {quantity > 0 ? "IN STOCK" : "OUT OF STOCK"}
            </div>
          </div>
          <div className="px-5 pb-5">
            <h5 className="text-lg md:text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
            <p className="text-sm md:text-base font-medium text-gray-600 capitalize">
              Brand: {brand}
            </p>
            <p className="text-sm md:text-base font-medium text-gray-600 capitalize">
              Category: {category}
            </p>
            <div className="flex items-center mt-2.5 mb-5">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <Rating
                  style={{ maxWidth: 100 }}
                  value={Math.round(ratings)}
                  readOnly
                />
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                {ratings}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
                ${price}
              </span>
              <a href="#" className="primary-button">
                View Details
              </a>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProductCard;