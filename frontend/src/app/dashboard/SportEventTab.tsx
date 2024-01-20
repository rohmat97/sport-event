import axiosInstance from "@/api/interceptor";
import { useSportEvent } from "@/hooks/getAllSportEvent";
import React, { useEffect } from "react";

const SportEventTab: React.FC = () => {
  const [dataSportEvent] = useSportEvent();
  return (
    <div className="bg-white  pb-12  min-h-screen">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 px-4">
        Sport Event
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 px-12">
        {(dataSportEvent as any)?.data?.map((data: any) => (
          <div className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={data?.organizer?.imageLocation}
                alt="Front of men&#039;s Basic Tee in black."
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href="#">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                    ></span>
                    {data?.eventName}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{data?.eventType}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportEventTab;
