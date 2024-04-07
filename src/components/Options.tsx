import { Component, Show, Signal, createSignal } from 'solid-js';
import { useOptionsContext } from 'src/providers/OptionsProvider';
import recipesByBuilding from 'src/data/recipesByBuilding.json';
import biomes from 'src/data/biomes.json';

export const Options: Component<{
  optionsOpenSignal: Signal<boolean>;
  selectedEssentialBuildingsSignal: Signal<string[]>;
  selectedBuildingsSignal: Signal<string[]>;
  selectedBlueprintsSignal: Signal<string[]>;
  selectedBiomeSignal: Signal<string>;
}> = (props) => {
  const [optionsOpen] = props.optionsOpenSignal;
  const [options, setOptions] = useOptionsContext();

  const loadSave = async () => {
    const clipboardContents = await navigator.clipboard.read();
    for (const item of clipboardContents) {
      if (!item.types.includes('text/plain')) {
        throw new Error('Clipboard does not contain text data.');
      }
      const blob = await item.getType('text/plain');
      const blobText = await blob.text();
      const contentStr = '"content"';
      const contentLoc = blobText.indexOf(contentStr);
      const curlyAfterContentLoc = blobText.indexOf('{', contentLoc);
      const endingCurlyBraceLoc = blobText.indexOf(
        '  },',
        curlyAfterContentLoc
      );

      if (
        contentLoc === -1 ||
        curlyAfterContentLoc === -1 ||
        endingCurlyBraceLoc === -1
      ) {
        throw new Error(
          'Unable to find "content": {} section in clipboard data.'
        );
      }
      const contentSegment = blobText.slice(
        curlyAfterContentLoc,
        endingCurlyBraceLoc + 3
      );
      const saveContentJson = JSON.parse(contentSegment);

      const buildingNames = Object.keys(recipesByBuilding);

      const [, setSelectedEssentialBuildings] =
        props.selectedEssentialBuildingsSignal;
      const [, setSelectedBuildings] = props.selectedBuildingsSignal;
      const [, setSelectedBlueprints] = props.selectedBlueprintsSignal;
      const [, setSelectedBiome] = props.selectedBiomeSignal;
      // get the buildings from the json file
      // if any of them exist in "essentialBuildings", reset the essentialBuildings value to the new buildings
      const newEssentialBuildings = buildingNames.filter((building) =>
        saveContentJson.essentialBuildings.includes(building)
      );

      setSelectedEssentialBuildings(newEssentialBuildings);
      const newBuildings = buildingNames.filter((building) =>
        saveContentJson.buildings.includes(building)
      );
      setSelectedBuildings(newBuildings);

      // get current blueprint pick
      const reputationRewardsSectionLoc = blobText.indexOf(
        '"reputationRewards"'
      );
      const currentPicksSectionLoc = blobText.indexOf(
        '"currentPick"',
        reputationRewardsSectionLoc
      );
      const currentPicksOpeningCurlyLoc = blobText.indexOf(
        '{',
        currentPicksSectionLoc
      );
      const currentPicksClosingCurlyLoc = blobText.indexOf(
        '\n  }',
        currentPicksOpeningCurlyLoc
      );
      const currentPicksSegment = blobText.slice(
        currentPicksOpeningCurlyLoc,
        currentPicksClosingCurlyLoc + 3
      );
      const currentPicksJson = JSON.parse(currentPicksSegment);
      const newBlueprints = buildingNames.filter((building) =>
        currentPicksJson.options.some((o) => o.building === building)
      );
      setSelectedBlueprints(newBlueprints);

      const biomeNameStr = '"biomeName"';
      const biomeNameLoc = blobText.indexOf(biomeNameStr);
      const biomeNameOpeningQuoteLoc = blobText.indexOf(
        '"',
        biomeNameLoc + biomeNameStr.length
      );
      const biomeNameClosingQuoteLoc = blobText.indexOf(
        '"',
        biomeNameOpeningQuoteLoc + 1
      );
      const biomeName = blobText.slice(
        biomeNameOpeningQuoteLoc + 1,
        biomeNameClosingQuoteLoc
      );
      if (biomes[biomeName]) {
        setSelectedBiome(biomeName);
      }
    }
  };
  return (
    <>
      <Show when={optionsOpen()}>
        <div class="bg-slate-200 py-2">
          <div class="flex flex-wrap space-x-2">
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={options.showBuildingCards}
                  onChange={(e) =>
                    setOptions('showBuildingCards', e.target.checked)
                  }
                  class="mx-2"
                />
                Show Building Cards
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={options.showBuildingIcons}
                  onChange={(e) =>
                    setOptions('showBuildingIcons', e.target.checked)
                  }
                  class="mx-2"
                />
                Show Building Icons
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={options.showBuildingNames}
                  onChange={(e) =>
                    setOptions('showBuildingNames', e.target.checked)
                  }
                  class="mx-2"
                />
                Show Building Names
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={options.showRecipeIcons}
                  onChange={(e) =>
                    setOptions('showRecipeIcons', e.target.checked)
                  }
                  class="mx-2"
                />
                Show Recipe Icons
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={options.showRecipeNames}
                  onChange={(e) =>
                    setOptions('showRecipeNames', e.target.checked)
                  }
                  class="mx-2"
                />
                Show Recipe Names
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={options.showRecipeEfficiency}
                  onChange={(e) =>
                    setOptions('showRecipeEfficiency', e.target.checked)
                  }
                  class="mx-2"
                />
                Show Recipe Efficiency
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={options.showRecipeNumber}
                  onChange={(e) =>
                    setOptions('showRecipeNumber', e.target.checked)
                  }
                  class="mx-2"
                />
                Show Recipe Number
              </label>
            </div>
          </div>
        </div>
        <div class="sm:flex sm:items-center pb-2 bg-slate-200">
          <div class="flex flex-row">
            <button
              class="btn-primary border border-black rounded-md py-1 px-2 m-1"
              onclick={loadSave}
            >
              Load save data from clipboard
            </button>
            <span class="text-sm">
              * Copy save data file into clipboard first!
            </span>
          </div>
        </div>
      </Show>
    </>
  );
};
