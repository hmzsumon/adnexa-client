"use client";
import PricingCard from "@/components/Packages/PricingCard";
import {
  useGetAllPackagesQuery,
  useGetUserPackagesQuery,
} from "@/redux/features/package/packageApi";
import { Spinner } from "flowbite-react";
import { useSelector } from "react-redux";

// export interface Package {
// 	_id: number;
// 	title: string;
// 	price: number;
// 	profit_day: string;
// 	weekly: string;
// 	return: string;
// 	total_return: number;
// }

import { Package } from "@/types/types";
const Investment = () => {
  const { data, error, isLoading, isSuccess, isError } =
    useGetAllPackagesQuery(undefined);
  const { data: userPackageData } = useGetUserPackagesQuery(undefined);

  const { user } = useSelector((state: any) => state.auth);

  const { packages } = data || { packages: [] };
  const activePackage = (userPackageData?.userPackages || [])
    .filter((item: any) => item?.is_active && !item?.is_expired)
    .sort(
      (a: any, b: any) =>
        Number(b?.package_no || 0) - Number(a?.package_no || 0),
    )?.[0];
  const activePackageNo = Number(activePackage?.package_no || 0);

  return (
    <>
      {isLoading ? (
        <div className="text-center flex items-center justify-center h-[60vh]">
          <Spinner aria-label="Center-aligned spinner example" size="xl" />
        </div>
      ) : (
        <div className="  tracking-tight text-gray-200">
          <h2 className=" my-4 text-2xl md:text-4xl  font-semibold   ">
            <span className="">All Packages</span>
          </h2>
          <div className=" ">
            <div className="grid gap-6 grid-cols-1  ">
              {packages.map((p: Package) => (
                <PricingCard
                  pac={p}
                  key={p._id}
                  activePackageNo={activePackageNo}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Investment;
