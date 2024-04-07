import '@thisbeyond/solid-select/style.css';
import { createEffect, createSignal, type Component } from 'solid-js';
import { BlueprintList } from './components/BlueprintList';
import { BlueprintSelect } from './components/BlueprintSelect';
import { BuildingList } from './components/BuildingList';
import { BuildingSelect } from './components/BuildingSelect';
import { GoodsList } from './components/GoodsList';
import { Options } from './components/Options';
import { ResourcesSelect } from './components/ResourcesSelect';
import biomes from './data/biomes.json';
import { OptionsProvider } from './providers/OptionsProvider';
import { OptionsButton } from './components/OptionsButton';
import { makePersisted } from '@solid-primitives/storage';

export const App: Component = () => {
  const selectedBiomeSignal = createSignal('');
  const optionsOpenSignal = createSignal(false);
  const selectedResourcesSignal = makePersisted(createSignal([] as string[]));
  const selectedBuildingsSignal = makePersisted(createSignal([] as string[]));
  const selectedBlueprintsSignal = makePersisted(createSignal([] as string[]));
  const highlightedBlueprintSignal = createSignal('');

  createEffect(() => {
    const [selectedBiomeName, setSelectedBiomeName] = selectedBiomeSignal;
    if (selectedBiomeName() === '') return;
    const selectedResources = biomes[selectedBiomeName()] || [];
    const setSelectedResources = selectedResourcesSignal[1];
    setSelectedResources(selectedResources);
    setSelectedBiomeName('');
  });

  return (
    <div>
      <OptionsProvider>
        <div class="mb-2">
          <div class="flex flex-row space-x-3 bg-slate-100 text-nowrap overflow-x-auto">
            <OptionsButton optionsOpenSignal={optionsOpenSignal} />
            <div class="p-2">
              <a
                class="underline"
                target="_blank"
                href="https://docs.google.com/spreadsheets/d/1vRGSql3Lu5xy9Dwqy7rPsWfEWarxdcKxuW3IqNWosvk/edit"
              >
                Building Tier List
              </a>
            </div>
            <div class="p-2">
              <a
                class="underline"
                target="_blank"
                href="https://docs.google.com/spreadsheets/d/14gePuyN0mRsm6OU9tPmq4GC8djnLIs6VkURw-xDsThI"
              >
                Cornerstone Tier Lists
              </a>
            </div>
          </div>
          <Options optionsOpenSignal={optionsOpenSignal} />
        </div>
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
