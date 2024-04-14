import { Accessor, Component, For, Show } from 'solid-js';
import resolveBonuses from '../data/resolveBonuses.json';
import { GoodsListItem } from './GoodsListItem';

export const ResolveBonusList: Component<{
  currentGoods: () => string[];
  justNewGoodsWithBlueprint: () => string[];
  selectedRacesAccr: Accessor<string[]>;
}> = (props) => {
  // get all bonuses for current goods:
  const currentGoodsBonuses = () => {
    return resolveBonuses.filter((bonus) =>
      props.currentGoods().includes(bonus.Product)
    );
  };

  const newBonuses = () => {
    return resolveBonuses.filter((bonus) =>
      props.justNewGoodsWithBlueprint().includes(bonus.Product)
    );
  };

  return (
    <>
      <div class="sm:flex sm:items-center mb-6">
        <div class="sm:w-1/6">
          <label
            class="block text-gray-500 font-bold sm:text-right mb-1 sm:mb-0 pr-4"
            for="inline-full-name"
          >
            Resolve bonus
          </label>
        </div>
        <ul class="flex flex-wrap sm:w-5/6">
          <For each={currentGoodsBonuses()}>
            {(bonus) => (
              <li>
                <div class="flex space-x-1 mr-1 bg-slate-100 m-1 pe-2 rounded-md items-center">
                  <GoodsListItem productName={bonus.Product} />
                  {Object.entries(bonus.Races)
                    .filter(([race]) =>
                      props.selectedRacesAccr().includes(race)
                    )
                    .map(([race, amount]) => (
                      <>
                        <div>
                          <img
                            src={`./icons/races/60px-${race}_circle.png`}
                            alt={race}
                            height={20}
                            width={20}
                            class="rounded-sm shadow-lg"
                          />
                        </div>
                        <div>{`+${amount}`}</div>
                      </>
                    ))}
                </div>
              </li>
            )}
          </For>
        </ul>
      </div>

      <Show when={newBonuses().length > 0}>
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
            <For each={newBonuses()}>
              {(bonus) => (
                <li>
                  <div class="flex space-x-1 mr-1 bg-slate-100 m-1 pe-2 rounded-md items-center">
                    <GoodsListItem productName={bonus.Product} />
                    {Object.entries(bonus.Races)
                      .filter(([race]) =>
                        props.selectedRacesAccr().includes(race)
                      )
                      .map(([race, amount]) => (
                        <>
                          <div>
                            <img
                              src={`./icons/races/60px-${race}_circle.png`}
                              alt={race}
                              height={20}
                              width={20}
                              class="rounded-sm shadow-lg"
                            />
                          </div>
                          <div>{`+${amount}`}</div>
                        </>
                      ))}
                  </div>
                </li>
              )}
            </For>
          </ul>
        </div>
      </Show>
    </>
  );
};
