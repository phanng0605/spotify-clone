"use client";
import { useState } from "react";
import { useEffect } from "react";
import * as RadixSlider from "@radix-ui/react-slider";


interface SongSliderProps {
    value?: number;
    max?: number;
    onChange?: (value: number) => void;
    // setCurrentTime?: (value: number) => void;
}

const SongSlider: React.FC<SongSliderProps> = ({
    value = 0,
    onChange,
    max = 100
}) => {
    // const [sliderValue, setSliderValue] = useState(value);

    // // Update the slider value every second
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setSliderValue(value);
    //     }, 10);

    //     return () => clearInterval(interval);
    // }, [value]);

    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0]);
    }

    return ( 
        <RadixSlider.Root
            className="
                relative
                flex
                items-center
                select-none
                touch-none
                w-full
                h-10
            "
            value = {[value]}
            onValueChange={handleChange}
            max = {max}
            step={0.01}
            aria-label="Progress"
        >
            <RadixSlider.Track
                className="
                    bg-neutral-600
                    relative
                    grow
                    rounded-full
                    h-[3px]
                "
            >
                <RadixSlider.Range 
                    className="
                        absolute
                        bg-white
                        rounded-full
                        h-full
                    "/>
            </RadixSlider.Track>
        </RadixSlider.Root>
    );
}
 
export default SongSlider;