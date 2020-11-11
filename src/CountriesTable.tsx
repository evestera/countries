import {Restcountry} from "./typegen/restcountries";
import React, {useState} from "react";

type Sorting = "name" | "population" | "area";

function sortCountries(countries: Restcountry[], sorting: Sorting): Restcountry[] {
  switch (sorting) {
    case "name":
      return countries.sort((a, b) => a.name > b.name ? 1 : -1);
    case "population":
      return countries.sort((a, b) => a.population > b.population ? -1 : 1);
    case "area":
      return countries.sort((a, b) => (a.area || 0) > (b.area || 0) ? -1 : 1);
  }
}

export function CountriesTable({countries}: { countries: Restcountry[] }): React.ReactElement {
  const [sorting, setSorting] = useState<Sorting>("name");

  const sortedCountries = sortCountries(countries, sorting);

  return (
    <section style={{display: "block"}}>
      <header>
        <h2>Countries</h2>
      </header>

      <label htmlFor="sorting">Sorting:</label>
      <Select id="sorting" options={["name", "population", "area"]} onChange={setSorting}/>
      <div>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Region</th>
            <th>Area (1.5 km)^2</th>
            <th>Population (mill)</th>
          </tr>
          </thead>
          <tbody>
          {sortedCountries.map(country => (
            <CountryRow key={country.alpha2Code} country={country}/>
          ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CountryRow({country}: { country: Restcountry }): React.ReactElement {
  return (
    <tr>
      <td>{country.name}</td>
      <td>{country.region}</td>
      <td style={{textAlign: "right"}}>{country.area ? Math.round((country.area / (1.5 * 1.5))) : ""}</td>
      <td style={{textAlign: "right"}}>{(country.population / 1000000).toFixed(1)}</td>
    </tr>
  );
}

function Select<T extends string>({id, options, onChange}: { id: string, options: T[], onChange: (newValue: T) => void }): React.ReactElement {
  return (
    <select id={id} onChange={(event => onChange(event.target.value as unknown as T))}>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
}
