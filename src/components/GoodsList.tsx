import { Component, For, Show } from 'solid-js';
import { GoodsListItem } from './GoodsListItem';

export const GoodsList: Component<{
  currentGoods: () => string[];
  justNewGoodsWithBlueprint: () => string[];
}> = (props) => {
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
          <For each={props.currentGoods()}>
            {(productName) => (
              <li>
                <GoodsListItem productName={productName} />
              </li>
            )}
          </For>
        </ul>
      </div>

      <Show when={props.justNewGoodsWithBlueprint().length > 0}>
        <div class="sm:flex sm:items-center mb-6">
          <div class="sm:w-1/6">
            <label
              class="block text-gray-500 font-semibold sm:text-right mb-1 sm:mb-0 pr-4"
              for="inline-full-name"
            >
              Including blueprint
            </label>
          </div>
          <ul class="flex flex-wrap sm:w-5/6">
            <For each={props.justNewGoodsWithBlueprint()}>
              {(productName) => (
                <li>
                  <GoodsListItem productName={productName} />
                </li>
              )}
            </For>
          </ul>
        </div>
      </Show>
    </>
  );
};
