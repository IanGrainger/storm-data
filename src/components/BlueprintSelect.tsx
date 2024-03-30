import { createOptions, Select } from '@thisbeyond/solid-select';
import { Component, Signal } from 'solid-js';
import recipesByBuilding from 'src/data/recipesByBuilding.json';

export const BlueprintSelect: Component<{
  signal: Signal<string[]>;
  buildingsSignal: Signal<string[]>;
}> = (props) => {
  const buildingNames = Object.keys(recipesByBuilding);
  const [selectedValues, setSelectedValues] = props.signal;
  const [selectedBuildings] = props.buildingsSignal;

  const onChange = (selected: string[]) => {
    setSelectedValues(selected);
  };

  const buildingOptions = createOptions(buildingNames, {
    disable: (value: string) =>
      selectedValues().includes(value) || selectedBuildings().includes(value),
  });

  return (
    <div class="flex flex-row">
      <Select
        placeholder="Select blueprints..."
        class="blueprintList"
        multiple
        onChange={onChange}
        initialValue={selectedValues()}
        {...buildingOptions}
      />
      <button onClick={() => setSelectedValues([])}>❌</button>
    </div>
  );
};
