import FadeInUpAnimation from "../Animations/FadeInUpAnimation";
import { ArrowLeftRight, Lock, Phone, ShieldCheck } from "lucide-react";

const ServiceQuality = () => {
  return (
    <FadeInUpAnimation>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 mb-10">
        <div className="border shadow px-4 py-8 flex flex-col items-center">
          <div className="bg-tertiary p-4 rounded-full mb-3 flex items-center justify-center">
            <Lock className="text-white size-10" />
          </div>
          <p className="font-medium text-lg text-center">
            100% Secured Payment
          </p>
        </div>
        <div className="border shadow px-4 py-8 flex flex-col items-center">
          <div className="bg-tertiary p-4 rounded-full mb-3 flex items-center justify-center">
            <Phone className="text-white size-10" />
          </div>
          <p className="font-medium text-lg text-center">
            24/7 Customer Service
          </p>
        </div>
        <div className="border shadow px-4 py-8 flex flex-col items-center">
          <div className="bg-tertiary p-4 rounded-full mb-3 flex items-center justify-center">
            <ArrowLeftRight className="text-white size-10" />
          </div>
          <p className="font-medium text-lg text-center">
            7 Days Refund/Replacemnt
          </p>
        </div>
        <div className="border shadow px-4 py-8 flex flex-col items-center">
          <div className="bg-tertiary p-4 rounded-full mb-3 flex items-center justify-center">
            <ShieldCheck className="text-white size-10" />
          </div>
          <p className="font-medium text-lg text-center">
            100% Authenticity Guaranteed
          </p>
        </div>
      </div>
    </FadeInUpAnimation>
  );
};

export default ServiceQuality;
