import '@thisbeyond/solid-select/style.css';
import { createSignal, type Component, createEffect } from 'solid-js';
import { BuildingList } from './components/BuildingList';
import { BuildingSelect } from './components/BuildingSelect';
import { Options } from './components/Options';
import { OptionsProvider } from './providers/OptionsProvider';
import { ResourcesSelect } from './components/ResourcesSelect';
import { BiomeSelect } from './components/BiomeSelect';
import biomes from './data/biomes.json';
import { GoodsList } from './components/GoodsList';

export const App: Component = () => {
  const selectedBuildingsSignal = createSignal([] as string[]);
  const selectedResourcesSignal = createSignal([] as string[]);
  const selectedBiomeSignal = createSignal('');

  createEffect(() => {
    const selectedBiomeName = selectedBiomeSignal[0]();
    const selectedResources = biomes[selectedBiomeName] || [];
    const setSelectedResources = selectedResourcesSignal[1];
    setSelectedResources(selectedResources);
  });

  return (
    <div>
      <OptionsProvider>
        <Options />
        <BiomeSelect signal={selectedBiomeSignal} />
        <ResourcesSelect signal={selectedResourcesSignal} />
        <BuildingSelect signal={selectedBuildingsSignal} />
        {/* don't actually need this now we are showing outputs? */}
        <BuildingList showNamesAccr={selectedBuildingsSignal[0]} />
        <GoodsList
          buildingsAccr={selectedBuildingsSignal[0]}
          resourcesAccr={selectedResourcesSignal[0]}
        />
      </OptionsProvider>
    </div>
  );
};
