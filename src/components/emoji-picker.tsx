/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface EmojiInputProps {
  value: string;
  onChange: (emoji: string) => void;
  className?: string;
  emojiClassName?: string;
  buttonText?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  theme?: "light" | "dark" | "auto";
  disableRecent?: boolean;
  searchPlaceholder?: string;
}

export function EmojiInput({
  value = "😊",
  onChange,
  className,
  emojiClassName,
  buttonText = "Seleccionar Emoji",
  size = "md",
  disabled = false,
  theme = "light",
  disableRecent = false,
  searchPlaceholder = "Buscar emoji",
}: EmojiInputProps) {
  const [open, setOpen] = useState(false);

  // Tamaños predefinidos para el cuadro de emoji
  const sizeMap = {
    sm: {
      box: "w-8 h-8",
      text: "text-xl",
    },
    md: {
      box: "w-10 h-10",
      text: "text-2xl",
    },
    lg: {
      box: "w-14 h-14",
      text: "text-3xl",
    },
  };

  const handleEmojiSelect = useCallback(
    (emojiData: any) => {
      onChange(emojiData.native);
      setOpen(false);
    },
    [onChange]
  );

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "flex items-center justify-center bg-muted rounded-md",
          sizeMap[size].box,
          sizeMap[size].text,
          emojiClassName
        )}
      >
        {value}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline" disabled={disabled}>
            {buttonText}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0"
          style={{ width: "352px" }}
          align="start"
          sideOffset={5}
        >
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            theme={theme}
            set="native"
            autoFocus
            searchPosition="sticky"
            previewPosition="none"
            skinTonePosition="none"
            navPosition="bottom"
            perLine={8}
            emojiSize={22}
            emojiButtonSize={36}
            disableRecent={disableRecent}
            searchPlaceholder={searchPlaceholder}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
