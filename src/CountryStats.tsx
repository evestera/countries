import {Country} from "./typegen/restcountries";
import React from "react";

export function CountryStats({countries}: { countries: Country[] }): React.ReactElement {
  const largestArea = countries.reduce((a, b) => (a.area || Number.MIN_VALUE) > (b.area || Number.MIN_VALUE) ? a : b);
  const smallestArea = countries.reduce((a, b) => (a.area || Number.MAX_VALUE) < (b.area || Number.MAX_VALUE) ? a : b);
  const populationSum = countries.reduce((acc, country) => acc + country.population, 0);
  const populationAverage = Math.round(populationSum / countries.length);

  return (
    <section>
      <header>
        <h2>Country stats</h2>
      </header>
      <aside>
        <h2>Largest area</h2>
        <p>{largestArea.name}: {largestArea.area} km^2</p>
      </aside>
      <aside>
        <h2>Smallest area</h2>
        <p>{smallestArea.name}: {smallestArea.area} km^2</p>
      </aside>
      <aside>
        <h2>Average population</h2>
        <p>{populationAverage}</p>
      </aside>
    </section>
  );
}
