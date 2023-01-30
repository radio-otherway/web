const getData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/shows/upcoming`
  );
  return res.json();
};

export default async function Home() {
  const results = await getData();
  return results.events.length === 0 ? (
    <h1>No upcoming events</h1>
  ) : (
    <div>
      <h1>Upcoming Radio Otherway Shows</h1>
      {results.events.map((r: any) => (
        <>
          <div className="">
            <span>{r.summary}</span>
          </div>
        </>
      ))}
    </div>
  );
}
