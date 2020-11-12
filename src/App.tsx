import React from 'react';
import {useFetch} from "./useFetch";
import {Countries} from "./typegen/restcountries";
import RestcountriesSchema from "./typegen/restcountries.json";
import {CountriesTable} from "./CountriesTable";
import {CountryStats} from "./CountryStats";
import {Languages} from "./Languages";

export function App() {
  const countries = useFetch<Countries>('https://restcountries.eu/rest/v2/all', RestcountriesSchema);

  if (!countries) {
    return <p>Loading...</p>;
  }

  if (countries.isErr()) {
    return <p>Failed to fetch list of countries: {countries.error}</p>
  }

  return (
    <main>
      <CountriesTable countries={countries.value}/>
      <CountryStats countries={countries.value}/>
      <Languages countries={countries.value} />
    </main>
  );
}
