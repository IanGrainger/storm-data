import { Component, Accessor, Show } from 'solid-js';
import recipesByBuilding from 'src/data/recipesByBuilding.json';
import { makeResourceIconPart } from 'src/functions/IconNameUtils';
import { useOptionsContext } from 'src/providers/OptionsProvider';

export const GoodsList: Component<{
  buildingsAccr: Accessor<string[]>;
  resourcesAccr: Accessor<string[]>;
}> = (props) => {
  const getGoods = () =>
    // for each building, if one or more of each ingredient is in the resources list, add the output to the list
    // todo: also include outputs from other buildings that are inputs to the current building
    Object.keys(recipesByBuilding)
      .filter((building) => props.buildingsAccr().includes(building))
      .flatMap((building) =>
        recipesByBuilding[building].filter((recipe) => {
          const ingredients = [
            recipe.Ingredient_1,
            recipe.Ingredient_2 || null,
            recipe.Ingredient_3 || null,
          ].filter((x) => x);
          console.log(
            'recipe',
            Object.keys(recipe.Product),
            'ingredients',
            ingredients
          );
          return ingredients.every((ingredient) =>
            props
              .resourcesAccr()
              .some((resource) => Object.keys(ingredient).includes(resource))
          );
        })
      )
      .flatMap((recipe) => Object.keys(recipe.Product));
  const [options] = useOptionsContext();

  return (
    <div class="p-2">
      <h2 class="text-lg">Goods from resources</h2>
      <ul class="flex">
        {getGoods().map((productName) => (
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
        ))}
      </ul>
    </div>
  );
};
