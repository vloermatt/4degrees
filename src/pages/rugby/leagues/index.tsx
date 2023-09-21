import { useRouter } from "next/router";
import { useEffect } from "react";
import LoadingShip from "~/components/LoadingShip";
import { api } from "~/utils/api";
import { Country } from "~/utils/types";

export default (): JSX.Element => {
  const router = useRouter();
  const countriesQuery = api.rugby.getCountries.useQuery();
  let countries: Country[] = [];
  if (countriesQuery.data) {
    countries = countriesQuery.data;
  }
  useEffect(() => {
    if (countriesQuery.error) {
      alert(countriesQuery.error);
    }
  }, [countriesQuery.error]);

  const handleRoute = (countryID: string) => {
    router.push(`/rugby/leagues/${countryID}/2023`);
  };
  return (
    <main className="m-auto flex min-h-screen w-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] p-5">
      <h1 className="text-5xl font-semibold text-white">Countries</h1>
      {countriesQuery.isLoading ? (
        <LoadingShip />
      ) : (
        <div className="m-auto grid w-5/6 grid-cols-6 gap-10 p-10">
          {countries.map((country) => (
            <div
              onClick={() => handleRoute(country.id.toString())}
              className="border-green-800-500 border-3 m-auto flex h-full w-full cursor-pointer flex-col rounded border-solid bg-green-500 p-4 shadow-lg shadow-green-700 transition ease-in-out hover:scale-110"
            >
              <img className="m-auto w-1/2" src={country.flag ?? ""} />
              <p className="text-center font-semibold">{country.name}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
