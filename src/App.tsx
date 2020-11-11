import React from 'react';
import {useFetch} from "./useFetch";
import {Restcountries} from "./typegen/restcountries";
import RestcountriesSchema from "./typegen/restcountries.json";

function App() {
  const countries = useFetch<Restcountries>('https://restcountries.eu/rest/v2/all', RestcountriesSchema);

  if (!countries) {
    return <p>Loading...</p>;
  }

  if (countries.isErr()) {
    return <p>Failed to fetch list of countries: {countries.error}</p>
  }

  return (
    <div className="App">
      <h2>Countries</h2>
      {countries.value.map(country => (
        <p>{country.name}</p>
      ))}
    </div>
  );
}

export default App;
