import { useState } from "react";
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import '../scss/dropdown.scss'
import { useTranslation } from 'react-i18next'

const cities = [
  "Toshkent", "Toshkent viloyati", "Samarqand", "Farg’ona", "Buxoro", "Xorazm", "Andijon", "Navoiy", "Qashqadaryo", "Jizzax", 'Surxondaryo', 'Namangan', 'Sirdaryo', 'Xiva'
];

export default function CityDropdown() {
  const [selectedCity, setSelectedCity] = useState("");
  const [query, setQuery] = useState("");

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(query.toLowerCase())
  );
  const {t, i18n} = useTranslation()
  return (
    <div className="city-dropdown">
      <Combobox value={selectedCity} onChange={setSelectedCity}>
        <div className="dropdown-container">
          <ComboboxInput
            className="dropdown-input"
            onChange={(e) => setQuery(e.target.value)}
            displayValue={(city) => city}
            placeholder="Uzbekiston, Toshkent*"
          />
          <ComboboxButton className="dropdown-button">
            <ChevronDown size={18} className="dropdown-icon" />
          </ComboboxButton>
        </div>
        <ComboboxOptions className="dropdown-options">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <ComboboxOption
                key={city}
                value={city}
                className={({ active }) =>
                  `dropdown-option ${active ? "active" : ""}`
                }
              >
                {city}
              </ComboboxOption>
            ))
          ) : (
            <div className="dropdown-no-results">
              {t('nothingFoundForm')}
            </div>
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
