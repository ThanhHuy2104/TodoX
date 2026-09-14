import React from "react";

("use client");

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import { options } from "@/lib/data";

const DateTimeFilter = ({ dateQuery, setDateQuery }) => {
  return (
    <Combobox
      items={options}
      value={options.find((option) => option.value === dateQuery)}
      onValueChange={(option) => setDateQuery(option?.value)}
      itemToStringLabel={(item) => item.label}
    >
      <ComboboxInput placeholder="" />

      <ComboboxContent>
        <ComboboxList>
          {(item) => (
            <ComboboxItem
              key={item.value}
              value={item}
            >
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default DateTimeFilter;