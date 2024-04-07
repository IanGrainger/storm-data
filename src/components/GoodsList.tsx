import { Component, Accessor, For, Show } from 'solid-js';
import recipesByBuilding from 'src/data/recipesByBuilding.json';
import { GoodsListItem } from './GoodsListItem';

export const GoodsList: Component<{
  resourcesAccr: Accessor<string[]>;
  buildingsAccr: Accessor<string[]>;
  blueprintAccr: Accessor<string>;
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

  function currentGoods() {
    return getGoods(props.buildingsAccr(), props.resourcesAccr());
  }

  function goodsWithBlueprint() {
    return getGoods(
      [...props.buildingsAccr(), props.blueprintAccr()],
      props.resourcesAccr()
    );
  }

  function justNewGoodsWithBlueprint() {
    return goodsWithBlueprint().filter(
      (good) => !currentGoods().includes(good)
    );
  }

  return (
    <>
      <div class="sm:flex sm:items-center mb-6">
        <div class="sm:w-1/6">
          <label
            class="block text-gray-500 font-bold sm:text-right mb-1 sm:mb-0 pr-4"
            for="inline-full-name"
          >
            From buildings
          </label>
        </div>
        <ul class="flex flex-wrap sm:w-5/6">
          <For each={currentGoods()}>
            {(productName) => <GoodsListItem productName={productName} />}
          </For>
        </ul>
      </div>

      <Show when={justNewGoodsWithBlueprint().length > 0}>
        <div class="sm:flex sm:items-center mb-6">
          <div class="sm:w-1/6">
            <label
              class="block text-gray-500 font-bold sm:text-right mb-1 sm:mb-0 pr-4"
              for="inline-full-name"
            >
              Including blueprint
            </label>
          </div>
          <ul class="flex flex-wrap sm:w-5/6">
            <For each={justNewGoodsWithBlueprint()}>
              {(productName) => <GoodsListItem productName={productName} />}
            </For>
          </ul>
        </div>
      </Show>
    </>
  );
};
