import { createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

type Options = {
  showBuildingCards: boolean;
  showBuildingIcons: boolean;
  showBuildingNames: boolean;
  showRecipeIcons: boolean;
  showRecipeNames: boolean;
  showRecipeEfficiency: boolean;
  showRecipeNumber: boolean;
};

const makeOptionsContext = (initialOptions: Options) => {
  const [options, setOptions] = createStore(initialOptions);
  return [options, setOptions] as const;
};

type OptionsContextType = ReturnType<typeof makeOptionsContext>;

export const OptionsContext = createContext<OptionsContextType>();

export function OptionsProvider(props) {
  return (
    <OptionsContext.Provider
      value={makeOptionsContext({
        showBuildingCards: true,
        showBuildingIcons: true,
        showBuildingNames: true,
        showRecipeIcons: true,
        showRecipeNames: true,
        showRecipeEfficiency: true,
        showRecipeNumber: true,
      })}
    >
      {props.children}
    </OptionsContext.Provider>
  );
}
export const useOptionsContext = () => {
  const countName = useContext(OptionsContext);
  if (!countName) {
    throw new Error(
      'useOptionsContext should be called inside its ContextProvider'
    );
  }
  return countName;
};
