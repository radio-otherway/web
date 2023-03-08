import { MixcloudResponse } from "@/models/wire/mixcloud";
import React from "react";
import UpcomingShowsTable from "@/components/pages/home/UpcomingShowsTable";
import { TitleCard } from "@/components/widgets/cards";

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
  );
};

export default PreviousPage;
