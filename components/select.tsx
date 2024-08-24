"use client";
import React, { useMemo } from "react";

import { SingleValue } from "react-select";
import Select from "react-select";

// Custom select component using react-select
// To enable the user to select from the options provided and deselect if needed and the filter the data

// type of Props expected
type Props = {
  onChange: (value?: string) => void;
  options: { label: string; value: string }[];
  value?: string | null | undefined;
  disabled?: boolean;
  placeholder?: string;
};

const MySelect = ({
  value,
  onChange,
  options = [],
  disabled,
  placeholder,
}: Props) => {
  const onSelect = (option: SingleValue<{ label: string; value: string }>) => {
    onChange(option?.value);
  };

  const formattedValue = useMemo(() => {
    return options.find((o) => o.value === value);
  }, [value, options]); // Memoize the value to avoid re-rendering

  return (
    <Select
      placeholder={placeholder}
      className="text-sm h-10 w-[40vw] md:w-[40%] lg:w-[12vw] 2xl:w-[8vw]"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#e2e8f0",
          ":hover": {
            borderColor: "#e2e8f0",
          },
        }),
      }}
      value={formattedValue}
      onChange={onSelect} // to handle the change of value
      backspaceRemovesValue={true}
      isClearable={true} // To enable the user to deselect the selected option
      options={options} // Options to be displayed in the dropdown
      isDisabled={disabled}
    />
  );
};

export default MySelect;
