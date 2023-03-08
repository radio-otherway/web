import React from "react";
import { RemindMeButton } from "@/components/widgets";
import { getMonthName, getTime } from "@/lib/util/dateUtils";
import Image from "next/image";
import { Show } from "@/models";

interface IUpcomingShowsTableProps {
  shows: Show[];
}

const UpcomingShowsTable = ({ shows }: IUpcomingShowsTableProps) => {
  return (
    <table className="table w-full">
      <thead>
        <tr>
          <th className="hidden md:table-cell">Who?</th>
          <th className="hidden md:table-cell"></th>
          <th>When?</th>
          <th>What?</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {shows &&
          shows.map((show: Show) => (
            <tr key={show.id}>
              <th className="hidden md:table-cell">
                <div className="avatar">
                  <div className="w-12 h-12 mask mask-squircle">
                    <Image
                      alt="Show"
                      src={show.image ? show.image : "/img/default-show.png"}
                      width={48}
                      height={48}
                    />
                  </div>
                </div>
              </th>
              <th className="hidden md:table-cell">{show.creator}</th>
              <td className="pl-5 pr-3 whitespace-no-wrap">
                <div className="text-xs opacity-60">
                  {`${new Date(show.date).getDate()} ${getMonthName(
                    show.date
                  )}`}
                  @ {getTime(show.date)}
                </div>
              </td>
              <td>{show.title}</td>
              <th>
                <RemindMeButton showId={show.id} />
              </th>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default UpcomingShowsTable;
