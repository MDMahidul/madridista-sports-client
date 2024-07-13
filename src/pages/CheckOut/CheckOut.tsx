import Container from "@/components/Container/Container";
import SectionHeader from "@/components/Headers/SectionsHeader";
import { selectCartItems } from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hooks";

const CheckOut = () => {
    const cartItems = useAppSelector(selectCartItems);
    
    return (
      <div className="pt-10 md:pt-16">
        <Container>
          <SectionHeader heading="Checkout Page" />
          <div>
            <div>
              <div className="w-full md:w-1/3 border rounded-md px-10">
                <p className="text-2xl font-bold text-gray-600 text-center py-8">
                  Order summary
                </p>
                <div className=" flex justify-between gap-10">
                  <div>
                    <p className="text-base font-semibold text-gray-500 mb-2">
                      Original Price:
                    </p>
                    <p className="text-base font-semibold text-gray-500 mb-2">
                      Tax(15%):
                    </p>
                    <p className="text-base font-medium text-gray-500 mb-2">
                      Shipping
                    </p>
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      Total Price
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-700 font-semibold mb-1">
                      ${calculateTotalPrice().toFixed(2)}
                    </p>
                    <p className="text-lg text-gray-700 font-semibold mb-1">
                      ${calculateTotalVAT().toFixed(2)}
                    </p>
                    <p className="text-lg text-gray-700 font-semibold mb-1">
                      Free
                    </p>
                    <p className="text-lg text-gray-700 font-semibold mb-1">
                      ${calculateTotalPriceWithVAT().toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="my-8 ">
                  <Link
                    to="/checkout"
                    className="bg-primary text-white py-3 px-6 rounded-md shadow-md hover:bg-primary-dark"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
};

export default CheckOut;