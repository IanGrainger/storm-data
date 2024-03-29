import { createOptions, Select } from '@thisbeyond/solid-select';
import { Component, Signal } from 'solid-js';
import resources from 'src/data/ResourcesList_Grouped.json';

export const ResourcesSelect: Component<{ signal: Signal<string[]> }> = (
  props
) => {
  const goods = resources.Goods;
  const resourceNames = goods.map((good) => good.Name);
  const [selectedValues, setSelectedValues] = props.signal;

  const onChange = (selected: string[]) => {
    setSelectedValues(selected);
  };

  const resourcesOptions = createOptions(resourceNames, {
    disable: (value: string) => selectedValues().includes(value),
  });

  return (
    <div class="flex flex-row">
      <Select
        placeholder="Select resources..."
        class="resourcesList"
        multiple
        onChange={onChange}
        initialValue={selectedValues()}
        {...resourcesOptions}
      />
      <button onClick={() => setSelectedValues([])}>❌</button>
    </div>
  );
};
