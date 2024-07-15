/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import Container from "@/components/Container/Container";
import { Helmet } from "react-helmet-async";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error:any = useRouteError();
  console.log(error.data);
  return (
    <Container>
      <Helmet>
        <title>Errors</title>
      </Helmet>
      <div className=" py-10 bg-[#F0F0F0] min-h-screen flex flex-col justify-center items-center gap-10">
        <div className="flex flex-col justify-center items-center gap-5">
          <p className="text-7xl md:text-9xl font-bold text-tertiary">404</p>
          <p className="text-lg md:text-4xl font-semibold text-gray-600">
            Whoops! That page doesn’t exist.
          </p>
        </div>
        <div className="text-center">
          <p className="mb-14 text-gray-600 font-semibold text-sm md:text-xl">
            {error.data}
          </p>
          <Link to="/" className="primary-button">
            Go Home
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Error;
