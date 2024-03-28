import { type Component } from 'solid-js';
import { BlueprintList } from './components/BlueprintList';
import { Options } from './components/Options';
import { OptionsProvider } from './providers/OptionsProvider';

export const App: Component = () => {
  return (
    <div>
      <OptionsProvider>
        <Options />
        <BlueprintList />
      </OptionsProvider>
    </div>
  );
};
