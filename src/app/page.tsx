const getData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/shows/upcoming`
  );
  return res.json();
};

export default async function Home() {
  const results = await getData();
  return results.events.length === 0 ? (
    <h1 className="text-xl font-extrabold font-title text-primary-content md:text-2xl lg:text-2xl">
      No upcoming events
    </h1>
  ) : (
    <div>
      <h1 className="text-xl font-extrabold font-title text-primary-content md:text-2xl lg:text-4xl">
        Upcoming Radio Otherway Shows
      </h1>

      <div className="mt-4 overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>When</th>
              <th>Who</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {results.events.map((r: any) => (
              <tr key={r.id}>
                <td>
                  {new Date(r.start.dateTime).toLocaleString(
                    "en-IE"
                  )}
                </td>
                <td>{r.summary}</td>
                <td>
                  <button className="btn">Remind me</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
