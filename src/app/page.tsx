const getData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/shows/upcoming`
  );
  return res.json();
};

export default async function Home() {
  const results = await getData();
  return results.message ? (
    <div className="min-h-screen hero bg-base-200">
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{results.message}</h1>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <h1 className="text-xl font-extrabold font-title text-primary-content md:text-2xl lg:text-4xl">
        Upcoming Shows
      </h1>

      <div className="px-4 mt-4 overflow-x-auto">
        <table className="table w-full">
          <thead>
          <tr>
            <th>When</th>
            <th>Who</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {results.map((r: any) => (
            <tr key={r.id}>
              <td>{new Date(r.date).toLocaleString("en-IE")}</td>
              <td>{r.title}</td>
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
