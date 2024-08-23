import useUserProfile from "@/hooks/useUserProfile";
import LoadingError from "../Error/LoadingError";
import Loader from "@/components/Loader/Loader";
import { Helmet } from "react-helmet-async";
import UpdateUserProfileModal from "@/components/Modals/UpdateUserProfileModal";
import SlideInFromLeft from "@/components/Animations/SlideInFromLeft";
import SlideInFromRight from "@/components/Animations/SlideInFromRight";

const Profile = () => {
  const { userProfile, isError, isLoading } = useUserProfile();
  if (isLoading) {
    return <Loader height="h-[80vh]" />;
  }
  if (isError || !userProfile) {
    <LoadingError />;
  }
  const { id, name, pImage, email, contactNo, address, membership } =
    userProfile.data;

  return (
    <div className="mt-10 mb-20 sm:mb-40">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <SlideInFromLeft>
          <div>
            <img
              className="max-w-xs  shadow"
              src={
                !pImage
                  ? "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                  : pImage
              }
              alt=""
            />
          </div>
        </SlideInFromLeft>
        <SlideInFromRight>
          <div className="space-y-4">
            <div className="relative overflow-x-auto">
              <table className="w-full text-base text-left rtl:text-right text-gray-500 ">
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      className="px-6 py-2.5 font-medium text-gray-900 whitespace-nowrap"
                    >
                      User ID :
                    </th>
                    <td className="px-6 py-2.5">{id}</td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-6 py-2.5 font-medium text-gray-900 whitespace-nowrap"
                    >
                      Name
                    </th>
                    <td className="px-6 py-2.5">{name}</td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-6 py-2.5 font-medium text-gray-900 whitespace-nowrap"
                    >
                      Membership:
                    </th>
                    <td className="px-6 py-2.5 capitalize">{membership}</td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-6 py-2.5 font-medium text-gray-900 whitespace-nowrap"
                    >
                      Email:
                    </th>
                    <td className="px-6 py-2.5">{email}</td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-6 py-2.5 font-medium text-gray-900 whitespace-nowrap"
                    >
                      Contact:
                    </th>
                    <td className="px-6 py-2.5">{contactNo}</td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-6 py-2.5 font-medium text-gray-900 whitespace-nowrap"
                    >
                      Address:
                    </th>
                    <td className="px-6 py-2.5">{address}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <UpdateUserProfileModal user={userProfile} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </SlideInFromRight>
      </div>
    </div>
  );
};

export default Profile;
