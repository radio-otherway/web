import { MixcloudResponse } from "@/models/wire/mixcloud";
import React from "react";
import UpcomingShowsTable from "@/components/pages/home/UpcomingShowsTable";
import TitleCard from "@/components/widgets/cards/TitleCard";

interface shows {
  shows: MixcloudResponse;
}

const PreviousPage = ({ shows }: shows) => {
  return (
    <TitleCard title="Previous shows">
      {shows?.data?.map((show) => (
        <div key={show.key}>
          <iframe
            title={show.key}
            src={`https://api.mixcloud.com${show.key}embed-html/`}
            width="100%"
            height={150}
          />
        </div>
      ))}
    </TitleCard>
    // <div className="w-full p-6 mt-2 shadow-xl card bg-base-100">
    //   <div className="inline-block text-xl font-semibold">
    //     Previous Shows
    //     <div className="inline-block float-right">
    //       <div className="inline-block float-right">
    //         <button className="px-6 normal-case btn-primary btn-sm btn">
    //           Find a show
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="mt-2 divider" />
    //   <div className="w-full h-full pb-6 bg-base-100">
    //     <div className="w-full overflow-x-auto">
    //       {shows?.data?.map((show) => (
    //         <div key={show.key}>
    //           <iframe
    //             title={show.key}
    //             src={`https://api.mixcloud.com${show.key}embed-html/`}
    //             width="100%"
    //             height={150}
    //           />
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
};

export default PreviousPage;
