import React from "react";
import { RemindMeButton } from "@/components/widgets";
import { getMonthName, getTime } from "@/lib/util/dateUtils";
import Image from "next/image";
import { Show } from "@/models";

interface IUpcomingShowsTableProps {
  shows: Show[];
}

const UpcomingShowsTable = ({ shows }: IUpcomingShowsTableProps) => {
  debugger
  return (
    <table className="table w-full">
      {/* head */}
      <thead>
      <tr>
        <th></th>
        <th>Who?</th>
        <th>When?</th>
        <th>What?</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {/* row 1 */}
      {shows &&
        shows.map((show: Show) => (
          <tr key={show.id}>
            <th>
              <Image alt="Show" src={show.image ? show.image : "/img/default-show.png"} width={48} height={48} />
            </th>
            <th>{show.creator}</th>
            <td className="pl-5 pr-3 whitespace-no-wrap">
              <div className="text-gray-400">
                {`${new Date(show.date).getDate()} ${getMonthName(show.date)}`}{" "}
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
