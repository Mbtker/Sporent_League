import Navbar from "./navbar";
import ParticipatingTeams from "./participatingTeams";
import useSWR from "swr";

function Index({ isDarkMode }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "https://www.sporent.net/LeagueTopicAndTeams",
    fetcher,
    { fallback: false, revalidateOnFocus: false, keepPreviousData: true }
  );

  const {
    data: sponsers,
    error: sponsersError,
    isLoading: sponsersIsLoading,
  } = useSWR("https://www.sporent.net/LeagueSponsors", fetcher, {
    fallback: false,
    revalidateOnFocus: false,
    keepPreviousData: true,
  });

  return (
    <>
      <Navbar
        Topic={data?.Topic ?? ""}
        Sponsors={sponsers?.Sponsors ?? []}
        isDarkMode={isDarkMode}
      />
      <ParticipatingTeams Teams={data?.Teams ?? []} />
    </>
  );
}

export default Index;
