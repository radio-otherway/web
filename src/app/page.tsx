import RemindMeButton from "@/components/widgets/RemindMeButton";
import { getMonthName, getTime } from "@/lib/util/dateUtils";
import logger from "@/lib/util/logging";
import { Show } from "@/models";

const getData = async (): Promise<Show[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/shows/upcoming`
  );
  logger.debug("getDate", res);
  return await res.json();
};

const Home = async () => {
  const results = await getData();
  logger.debug("results", results);
  return results.length === 0 ? (
    <div className="min-h-screen hero bg-base-200">
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">No upcoming shows found</h1>
        </div>
      </div>
    </div>
  ) : (
    <div className="container flex justify-center h-screen py-20 mx-auto">
      <div className="flex flex-col w-6/12 h-full pl-4">
        <div className="px-5 py-2 text-sm font-bold text-gray-500 bg-white border-b border-gray-300 shadow">
          Tracking events
        </div>
        <div
          className="w-full h-full overflow-auto bg-white shadow"
          id="journal-scroll"
        >
          <table className="w-full">
            <tbody>
            {results &&
              results.map((show: Show) => (
                <tr
                  key={show.id}
                  className="relative py-1 transform scale-100 border-b-2 border-blue-100 cursor-default text-md"
                >
                  <td className="pl-5 pr-3 whitespace-no-wrap">
                    <div className="text-gray-400">
                      {`${new Date(show.date).getDay()} ${getMonthName(show.date)}`}
                    </div>
                    <div>{getTime(show.date)}</div>
                  </td>
                  <td className="px-2 py-4 space-y-2 whitespace-no-wrap">
                    <div className="font-medium leading-5 text-gray-500">
                      {show.creator}
                    </div>
                    <div className="leading-5 text-gray-900">{show.title}</div>
                  </td>
                  <td className="px-2 py-4">
                    <RemindMeButton show={show} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Home;
