import Loading from "@/app/loading";
import { RemindMeButton } from "@/components/widgets";
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
      return <div className="p-4"><Loading /></div>;
    }
    if (shows.length === 0) {
      return <NoShows />;
    }
    return (
      <div className="h-full pt-4 overflow-hidden">
        <div className="justify-center flex-1 px-2 mx-2 md:flex md:justify-start">
          <span className="text-2xl font-bold">Upcoming events</span>
        </div>
        <div className="mt-1 divider" />
        <div className="flex justify-center mx-6 mt-4" id="journal-scroll">
          <UpcomingShowsTable shows={shows} />
        </div>
      </div>
    );
  };
  return _getLayout();
};

export default HomePageComponent;
