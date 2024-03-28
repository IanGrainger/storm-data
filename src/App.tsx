import { type Component } from 'solid-js';
import { BuildingList } from './components/BuildingList';
import { Options } from './components/Options';
import { OptionsProvider } from './providers/OptionsProvider';

export const App: Component = () => {
  return (
    <div>
      <OptionsProvider>
        <Options />
        <BuildingList />
      </OptionsProvider>
    </div>
  );
};
