import { useEffect, useState } from "react";
import { useGetTotalDataQuery } from "../services/BlogServices";
import MachineListingWrapper from "./MachineData/List/MachineListingWrapper";

export default function Home() {
  const [totalData, setTotalData] = useState({});
  console.log('totalData: ', totalData);
  const { data, isLoading, isFetching } = useGetTotalDataQuery();

  useEffect(() => {
    if (!isLoading && !isFetching) {
      setTotalData(data?.data);
    }
  }, [data, isLoading, isFetching]);


  return (
    <div className="min-h-screen bg-white">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Total Hours Box */}
      <div className="bg-blue-50 border border-blue-200 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-600">Total Hours</h2>
        <div className="mt-3 text-4xl font-bold text-blue-700">
          {isLoading ? (
            // <Loader2 className="animate-spin text-blue-500 h-10 w-10" /> 
          "loading"
          ) : (
            data?.totalHours
          )}
        </div>
      </div>

      {/* Total Labour Box */}
      <div className="bg-green-50 border border-green-200 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-green-600">Total Labour</h2>
        <div className="mt-3 text-4xl font-bold text-green-700">
          {isLoading ? (
            // <Loader2 className="animate-spin text-green-500 h-10 w-10" />
            "loading"
          )  : (
            data?.totalLabour
          )}
        </div>
      </div>
    </div>

      <MachineListingWrapper />
    </div>
  );
}
