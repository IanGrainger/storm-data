import { Select } from '@thisbeyond/solid-select';
import { Component, createSignal, Signal } from 'solid-js';
import biomes from 'src/data/biomes.json';

export const BiomeSelect: Component<{ signal: Signal<string> }> = (props) => {
  const biomeNames = Object.keys(biomes);
  const [_, setSelectedValue] = props.signal;
  const [initialValue, setInitialValue] = createSignal(null, { equals: false });

  const onChange = (selected: string) => {
    if (selected !== null) {
      setSelectedValue(selected);
      setInitialValue(() => null);
    }
  };

  return (
    <div class="flex flex-row">
      <Select
        placeholder="Set resources to biome..."
        class="biomeSelect"
        onChange={onChange}
        initialValue={initialValue()}
        options={biomeNames}
      />
    </div>
  );
};
