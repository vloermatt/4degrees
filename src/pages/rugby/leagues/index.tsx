import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "~/utils/api";
import { Country } from "~/utils/types";

export default (): JSX.Element => {
  const router = useRouter();
  const countriesQuery = api.rugby.getCountries.useQuery();
  let countries: Country[] = [];
  if (countriesQuery.data) {
    console.log(countriesQuery.data);
    countries = countriesQuery.data;
  }
  useEffect(() => {
    if (countriesQuery.error) {
      alert(countriesQuery.error);
    }
  }, [countriesQuery.error]);

  const handleRoute = (country: string) => {
    router.push(`/rugby/leagues/${country}/2023`);
  };
  return (
    <main className="min-h-screen flex-col bg-black-500 p-10">
      <h1 className="text-5xl font-semibold text-white">Countries</h1>
      {countriesQuery.isLoading ? (
        <div>loading...</div>
      ) : (
        <div className="m-auto grid w-5/6 grid-cols-6 gap-10 p-10">
          {countries.map((country) => (
            <div
              onClick={() => handleRoute(country.name)}
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
