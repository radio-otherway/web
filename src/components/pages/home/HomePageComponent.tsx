import Loading from "@/app/loading";
import { RemindMeButton } from "@/components/widgets";
import TitleCard from "@/components/widgets/cards/TitleCard";
import { getMonthName, getTime } from "@/lib/util/dateUtils";
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
