import { createOptions, Select } from '@thisbeyond/solid-select';
import { Component, Signal } from 'solid-js';
import recipesByBuilding from 'src/data/recipesByBuilding.json';

export const BuildingSelect: Component<{ signal: Signal<string[]> }> = (
  props
) => {
  const buildingNames = Object.keys(recipesByBuilding);
  const [selectedValues, setSelectedValues] = props.signal;

  const onChange = (selected: string[]) => {
    setSelectedValues(selected);
  };

  const buildingOptions = createOptions(buildingNames, {
    disable: (value: string) => selectedValues().includes(value),
  });

  return (
    <Select
      placeholder="Select buildings..."
      class="buildingList"
      multiple
      onChange={onChange}
      {...buildingOptions}
    />
  );
};
