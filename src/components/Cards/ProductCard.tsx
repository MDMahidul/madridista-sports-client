import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const ProductCard = () => {
    return (
      <div>
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 relative hover:shadow-lg">
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              className="rounded-t-lg product_card_img"
              src="https://shop.realmadrid.com/_next/image?url=https%3A%2F%2Flegends.broadleafcloud.com%2Fapi%2Fasset%2Fcontent%2Frmcfmz0196-01.jpg%3FcontextRequest%3D%257B%2522forceCatalogForFetch%2522%3Afalse%2C%2522applicationId%2522%3A%252201H4RD9NXMKQBQ1WVKM1181VD8%2522%2C%2522tenantId%2522%3A%2522REAL_MADRID%2522%257D&w=1080&q=75"
              alt="product image"
            />
            <div className="absolute top-4 left-4 bg-tertiary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              20% OFF
            </div>
            <div className="absolute top-4 right-4 bg-gray-50 text-green-500 text-xs font-bold px-3 py-1 rounded-full shadow-md">
              IN STOCK
            </div>
          </div>
          <div className="px-5 pb-5">
            <h5 className="text-lg md:text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Real Madrid Home kit 24-25
            </h5>
            <p className="text-sm md:text-base font-medium text-gray-600">Brand: Addidas</p>
            <p className="text-sm md:text-base font-medium text-gray-600">Category: Jersey</p>
            <div className="flex items-center mt-2.5 mb-5">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <Rating
                  style={{ maxWidth: 100 }}
                  value={Math.round(4.3)}
                  readOnly
                />
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                4.3
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
                $599
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