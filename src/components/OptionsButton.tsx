import { Show, Signal, type Component } from 'solid-js';

export const OptionsButton: Component<{
  optionsOpenSignal: Signal<boolean>;
}> = (props) => {
  const [optionsOpen, setOptionsOpen] = props.optionsOpenSignal;
  return (
    <Show
      when={!optionsOpen()}
      fallback={
        <button class="bg-slate-200 p-2" onclick={() => setOptionsOpen(false)}>
          🔼 Options
        </button>
      }
    >
      <button class="p-2" onclick={() => setOptionsOpen(true)}>
        🔽 Options
      </button>
    </Show>
  );
};
