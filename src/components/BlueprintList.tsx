import type { Accessor, Component, Setter, Signal } from 'solid-js';
import { For, Show, createSignal } from 'solid-js';
import recipesByBuilding from 'src/data/recipesByBuilding.json';
import { useOptionsContext } from 'src/providers/OptionsProvider';
import {
  makeBuildingIconPart,
  makeResourceIconPart,
} from '../functions/IconNameUtils';

export const BlueprintList: Component<{
  blueprintsSignal: Signal<string[]>;
  highlightedBlueprintSignal: Signal<string>;
  buildingsSignal: Signal<string[]>;
}> = (props) => {
  const [options] = useOptionsContext();
  const [selectedBlueprints, setSelectedBlueprints] = props.blueprintsSignal;
  const [selectedBuildings, setSelectedBuildings] = props.buildingsSignal;
  const [highlightedBlueprint, setHighlightedBlueprint] =
    props.highlightedBlueprintSignal;

  const buildings = Object.entries(recipesByBuilding);

  return (
    <>
      <div class="flex flex-wrap">
        <For each={buildings}>
          {([buildingName, recipes]) => (
            <Show when={selectedBlueprints().includes(buildingName)}>
              <div
                classList={{
                  'bg-gray-100 p-4 m-4 rounded-lg flex flex-col items-center cursor-pointer':
                    true,
                  'bg-gray-300': highlightedBlueprint() === buildingName,
                }}
                onClick={() => setHighlightedBlueprint(buildingName)}
              >
                <div class="mb-2 flex flex-col items-center">
                  <Show when={options.showBuildingIcons}>
                    <img
                      src={`./icons/buildings/84px-${makeBuildingIconPart(
                        buildingName
                      )}_icon.png`}
                      width={84}
                      height={84}
                      alt={buildingName}
                      class="rounded-md shadow-lg"
                    />
                  </Show>
                  <Show when={options.showBuildingNames}>
                    <h2 class="text-xl text-green-700">{buildingName}</h2>
                  </Show>
                </div>
                <ul class="list-none">
                  <For each={recipes}>
                    {(recipe) => {
                      const [productName, amount] = Object.entries(
                        recipe.Product
                      )[0] as [string, number];
                      return (
                        <li>
                          <div class="flex space-x-1">
                            <div class="">
                              <Show when={options.showRecipeIcons}>
                                <img
                                  src={`./icons/resources/60px-Icon_Resource_${makeResourceIconPart(
                                    productName
                                  )}.png`}
                                  alt={productName}
                                  height={20}
                                  width={20}
                                  class="rounded-sm shadow-lg"
                                />
                              </Show>
                            </div>
                            <div>
                              <Show when={options.showRecipeNames}>
                                {productName}
                              </Show>{' '}
                              <Show when={options.showRecipeEfficiency}>
                                {recipe.Efficiency}
                              </Show>{' '}
                              <Show when={options.showRecipeNumber}>
                                {amount}
                              </Show>
                            </div>
                          </div>
                        </li>
                      );
                    }}
                  </For>
                </ul>
              </div>
            </Show>
          )}
        </For>
      </div>
      <Show when={selectedBlueprints().length > 0}>
        <button
          onClick={() => {
            setSelectedBuildings([
              ...selectedBuildings(),
              highlightedBlueprint(),
            ]);
            setSelectedBlueprints([]);
            setHighlightedBlueprint('');
          }}
        >
          ➕ Add to buildings
        </button>
      </Show>
    </>
  );
};
