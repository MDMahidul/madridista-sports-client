import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";

type TStaffMember = {
  id: number;
  name: string;
  designation: string;
  email: string;
  phone: string;
  image: string;
};

type StaffCardProps = {
  staff: TStaffMember;
};

const StaffCard = ({ staff }: StaffCardProps) => {
  const { name, designation, email, phone, image } = staff;

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg object-cover h-96 w-full hover:grayscale transition-all duration-300"
        src={image}
        alt={`Image of ${name}`}
      />
      <div className="p-5">
        <h5 className="text-2xl font-bold tracking-tight text-primary dark:text-white">
          {name}
        </h5>
        <p className="mb-3 font-bold text-gray-500">{designation}</p>
        <p className="font-semibold text-gray-700 dark:text-gray-400 flex items-center gap-2">
          <EnvelopeIcon className="size-5 text-primary" />
          {email}
        </p>
        <p className="font-semibold text-gray-700 dark:text-gray-400 flex items-center gap-2">
          <PhoneIcon className="size-5 text-primary" />
          {phone}
        </p>
      </div>
    </div>
  );
};

export default StaffCard;
