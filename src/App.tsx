import '@thisbeyond/solid-select/style.css';
import { createSignal, type Component } from 'solid-js';
import { BuildingList } from './components/BuildingList';
import { BuildingSelect } from './components/BuildingSelect';
import { Options } from './components/Options';
import { OptionsProvider } from './providers/OptionsProvider';

export const App: Component = () => {
  const selectedBuildingsSignal = createSignal([] as string[]);

  return (
    <div>
      <OptionsProvider>
        <Options />
        <BuildingSelect signal={selectedBuildingsSignal} />
        <BuildingList showNamesAccr={selectedBuildingsSignal[0]} />
      </OptionsProvider>
    </div>
  );
};
