import { Component, Accessor, For } from 'solid-js';
import recipesByBuilding from 'src/data/recipesByBuilding.json';
import { GoodsListItem } from './GoodsListItem';

export const GoodsList: Component<{
  buildingsAccr: Accessor<string[]>;
  resourcesAccr: Accessor<string[]>;
}> = (props) => {
  function removeDups<T>(arr: T[]): T[] {
    return [...new Set(arr)];
  }
  const getGoods = (
    buildings: string[],
    resources: string[],
    prevResources: string[] = null
  ) => {
    // for each building, if one or more of each ingredient is in the resources list, add the output to the list
    // todo: also include outputs from other buildings that are inputs to the current building
    const withDupes = Object.keys(recipesByBuilding)
      .filter((building) => buildings.includes(building))
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
            resources.some((resource) =>
              Object.keys(ingredient).includes(resource)
            )
          );
        })
      )
      .flatMap((recipe) => Object.keys(recipe.Product));
    const dedup = removeDups(withDupes);

    // todo: calling this recursively until there's no new resources doesn't _seem_ very efficient!
    if (prevResources === null || dedup.length > prevResources.length) {
      const nextLevel = getGoods(
        buildings,
        [...resources, ...dedup],
        resources
      );
      return removeDups([...dedup, ...nextLevel]);
    }
    return dedup;
  };

  return (
    <>
      <div class="p-2">
        <h2 class="mb-2 text-xl text-red-700">Possible Goods</h2>
        <ul class="flex flex-wrap">
          <For each={getGoods(props.buildingsAccr(), props.resourcesAccr())}>
            {(productName) => <GoodsListItem productName={productName} />}
          </For>
        </ul>
      </div>
    </>
  );
};
