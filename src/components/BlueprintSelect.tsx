import { createOptions, Select } from '@thisbeyond/solid-select';
import { Component, Signal } from 'solid-js';
import recipesByBuilding from 'src/data/recipesByBuilding.json';

export const BlueprintSelect: Component<{
  signal: Signal<string[]>;
  allBuildings: () => string[];
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
      selectedValues().includes(value) || props.allBuildings().includes(value),
  });

  return (
    <div class="sm:flex sm:items-center mb-6">
      <div class="sm:w-1/6">
        <label
          class="block text-gray-500 font-bold sm:text-right mb-1 sm:mb-0 pr-4"
          for="inline-full-name"
        >
          Blueprints
        </label>
      </div>
      <div class="flex flex-row sm:w-5/6 items-center space-x-1">
        {/* <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="Jane Doe"> */}
        <Select
          placeholder="Select blueprints..."
          class="blueprintList"
          multiple
          onChange={onChange}
          initialValue={selectedValues()}
          {...buildingOptions}
        />
        <button
          class="border rounded-sm px-2 h-9"
          onClick={() => setSelectedValues([])}
        >
          ❌
        </button>
      </div>
    </div>
  );
};
