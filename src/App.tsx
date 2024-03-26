import { Select } from '@thisbeyond/solid-select';
import type { Component } from 'solid-js';
import BuildingList from './components/buildingList';

const App: Component = () => {
  return (
    <div>
      <Select
        multiple
        options={['apple', 'banana', 'pear', 'pineapple', 'kiwi']}
      />
      <BuildingList />
    </div>
  );
};

export default App;
