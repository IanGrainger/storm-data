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

  // for each product:
  // 1. if in resources, then include END
  // 2. get all recipes that create it (where you have the building selected)
  // 3. get list of inputs for recipes that create this product from those buildings
  // 4. check all inputs - by going to 1

  // OR
  // for each building:
  // 1. get all recipes it can make
  // 2. for each ingredient - if in resources, then include END
  // 3. get list of inputs for recipes that create this product from those buildings
  // 4. check all inputs - by going to 1

  // OR
  // recurively see which ingredients might be enabled?

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
