import { Component, Show } from 'solid-js';
import { makeResourceIconPart } from 'src/functions/IconNameUtils';
import { useOptionsContext } from 'src/providers/OptionsProvider';

export const GoodsListItem: Component<{ productName: string }> = (props) => {
  const productName = props.productName;
  const [options] = useOptionsContext();
  return (
    <li>
      <div class="flex space-x-1 mr-1">
        <div>
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
          <Show when={options.showRecipeNames}>{productName}</Show>{' '}
          {/* todo: get the recipe so i have more info to display */}
          {/* <Show when={options.showRecipeEfficiency}>
          {recipe.Efficiency}
          </Show>{' '}
          <Show when={options.showRecipeNumber}>
          {amount}
          </Show> */}
        </div>
      </div>
    </li>
  );
};
