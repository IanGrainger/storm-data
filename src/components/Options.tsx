import { Component, Show, createSignal } from 'solid-js';
import { useOptionsContext } from 'src/providers/OptionsProvider';

export const Options: Component = () => {
  const [optionsOpen, setOptionsOpen] = createSignal(false);
  const [options, setOptions] = useOptionsContext();
  return (
    <>
      <Show when={!optionsOpen()}>
        <button onclick={() => setOptionsOpen(true)}>⚙️ Options</button>
      </Show>
      <Show when={optionsOpen()}>
        <div class="bg-slate-200">
          <h1>
            <button onclick={() => setOptionsOpen(false)}>✖️ Options</button>
          </h1>
          <div class="flex flex-wrap space-x-2">
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
      </Show>
    </>
  );
};
