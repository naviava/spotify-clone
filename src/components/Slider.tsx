import * as RadixSlider from "@radix-ui/react-slider";

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

export default function Slider({ value = 1, onChange }: SliderProps) {
  function handleChange(newValue: number[]) {
    onChange?.(newValue[0]);
  }

  return (
    <RadixSlider.Root
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
      className="relative flex h-10 w-full touch-none select-none items-center"
    >
      <RadixSlider.Track className="relative h-[3px] grow rounded-full bg-neutral-600">
        <RadixSlider.Range className="absolute h-full rounded-full bg-white" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
}
