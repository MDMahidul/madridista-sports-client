import { PuffLoader } from "react-spinners";
type TLoaderProps={
    height:string;
}
const Loader = ({ height }: TLoaderProps) => {
  return (
    <div className={`${height} flex justify-center items-center flex-col`}>
      <PuffLoader size={20} color="#17397F"></PuffLoader>
    </div>
  );
};

export default Loader;
