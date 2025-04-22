import { allCountries } from "country-telephone-data";

export const countryCodes = allCountries.map(({ dialCode, name, iso2 }) => ({
  code: `+${dialCode}`,
  name,
  flag: String.fromCodePoint(
    ...Array.from(iso2.toUpperCase()).map((c) => 127397 + c.charCodeAt(0))
  ),
}));
