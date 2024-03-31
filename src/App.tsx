import '@thisbeyond/solid-select/style.css';
import { createSignal, type Component, createEffect, Show } from 'solid-js';
import { BuildingList } from './components/BuildingList';
import { BuildingSelect } from './components/BuildingSelect';
import { Options } from './components/Options';
import { OptionsProvider } from './providers/OptionsProvider';
import { ResourcesSelect } from './components/ResourcesSelect';
import { BiomeSelect } from './components/BiomeSelect';
import biomes from './data/biomes.json';
import { GoodsList } from './components/GoodsList';
import { BlueprintSelect } from './components/BlueprintSelect';
import { BlueprintList } from './components/BlueprintList';

export const App: Component = () => {
  const selectedBiomeSignal = createSignal('');
  const selectedResourcesSignal = createSignal([] as string[]);
  const selectedBuildingsSignal = createSignal([] as string[]);
  const selectedBlueprintsSignal = createSignal([] as string[]);
  const highlightedBlueprintSignal = createSignal('');

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
        {/* <BiomeSelect signal={selectedBiomeSignal} /> */}
        <ResourcesSelect
          signal={selectedResourcesSignal}
          biomeSignal={selectedBiomeSignal}
        />
        <BuildingSelect signal={selectedBuildingsSignal} />
        <BuildingList showNamesAccr={selectedBuildingsSignal[0]} />
        <BlueprintSelect
          signal={selectedBlueprintsSignal}
          buildingsSignal={selectedBuildingsSignal}
        />
        <BlueprintList
          blueprintsSignal={selectedBlueprintsSignal}
          highlightedBlueprintSignal={highlightedBlueprintSignal}
          buildingsSignal={selectedBuildingsSignal}
        />
        <GoodsList
          resourcesAccr={selectedResourcesSignal[0]}
          buildingsAccr={selectedBuildingsSignal[0]}
          blueprintAccr={highlightedBlueprintSignal[0]}
        />
      </OptionsProvider>
    </div>
  );
};
