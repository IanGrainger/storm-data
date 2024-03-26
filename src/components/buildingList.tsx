import type { Component } from 'solid-js';
import { For } from 'solid-js';
import recipesByBuilding from 'src/data/recipesByBuilding.json';

const BuildingList: Component = () => {
  return (
    <div class="flex flex-wrap">
      <For each={Object.entries(recipesByBuilding)}>
        {([buildingName, recipes]) => (
          <div class="bg-gray-100 p-4 m-4 rounded-lg flex flex-col items-center">
            <img
              src={`./icons/buildings/84px-${makeBuildingIconPart(
                buildingName
              )}_icon.png`}
              width={84}
              height={84}
              alt={buildingName}
              class="rounded-md shadow-lg"
            />
            <h2 class="text-2xl text-green-700 mb-2">{buildingName}</h2>
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
                          <img
                            src={`./icons/resources/60px-Icon_Resource_${makeResourceIconPart(
                              productName
                            )}.png`}
                            alt={productName}
                            height={20}
                            width={20}
                            class="rounded-sm shadow-lg"
                          />
                        </div>
                        <div>
                          {productName} {recipe.Efficiency} {amount}
                        </div>
                      </div>
                    </li>
                  );
                }}
              </For>
            </ul>
          </div>
        )}
      </For>
    </div>
  );
};

function makeBuildingIconPart(buildingName: string) {
  return buildingName
    .replace(/^Flawless /, '')
    .replace(/'/g, '')
    .replace(/ /g, '_');
}

function makeResourceIconPart(resourceName: string) {
  return resourceName.replace(/ /g, '');
}

export default BuildingList;
