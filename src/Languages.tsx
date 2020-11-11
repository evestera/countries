import {Restcountry} from "./typegen/restcountries";
import React from "react";

type LanguageStats = { countries: string[], population: number };

export function Languages({countries}: { countries: Restcountry[] }): React.ReactElement {
  const languages = new Map<string, LanguageStats>();
  countries.forEach(country => {
    country.languages.forEach(countryLanguage => {
      const languageStats: LanguageStats = languages.get(countryLanguage.name) || {countries: [], population: 0};
      languages.set(countryLanguage.name, {
        countries: languageStats.countries.concat(country.name),
        population: languageStats.population + country.population,
      })
    });
  });

  const languagesArray = Array.from(languages);

  return (
    <section>
      <header>
        <h2>Languages</h2>
      </header>

      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Countries</th>
          <th>Total population(*)</th>
        </tr>
        </thead>
        <tbody>
        {languagesArray.map(([language, stats]) => (
          <tr>
            <td>{language}</td>
            <td><p>{stats.countries.join(", ")}</p></td>
            <td style={{textAlign: "right"}}>{stats.population}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </section>
  );
}
