import Loading from "@/app/loading";
import { TitleCard } from "@/components/widgets/cards";
import { Show } from "@/models";
import React from "react";
import NoShows from "./NoShows";
import UpcomingShowsTable from "./UpcomingShowsTable";

interface IHomePageComponentProps {
  shows: Show[] | undefined;
}

const HomePageComponent = ({ shows }: IHomePageComponentProps) => {
  const _getLayout = () => {
    if (!shows) {
      return (
        <div className="p-4">
          <Loading />
        </div>
      );
    }
    if (shows.length === 0) {
      return <NoShows />;
    }
    return (
      <TitleCard title="Upcoming shows">
        <UpcomingShowsTable shows={shows} />
      </TitleCard>
    );
  };
  return _getLayout();
};

export default HomePageComponent;
