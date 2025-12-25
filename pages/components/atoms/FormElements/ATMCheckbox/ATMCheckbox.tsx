import { IconCheck, IconMinus } from "@tabler/icons-react";
import React from "react";
import { Size } from "../../../../utils";

type Props = {
  checked: boolean;
  onChange: () => void;
  isPartialChecked?: boolean;
  disabled?: boolean;
  size?: Size;
};

const ATMCheckbox = ({
  checked = false,
  onChange,
  isPartialChecked = false,
  disabled = false,
  size = "medium",
}: Props) => {
  const getSize = (size: Size) => {
    switch (size) {
      case "small":
        return "size-4";
      case "medium":
        return "size-5";
      case "large":
        return "size-6";
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        !disabled && onChange();
      }}
      className={`  rounded flex items-center justify-center transition-all duration-300 ${getSize(
        size
      )} ${
        checked ? "bg-primary text-onPrimary" : "bg-white text-slate-800 border"
      } ${
        disabled
          ? "cursor-default border-gray-200"
          : "cursor-pointer border-gray-400"
      } `}
    >
      {checked &&
        (isPartialChecked ? (
          <IconMinus size={14} stroke={3} />
        ) : (
          <IconCheck size={14} stroke={3} />
        ))}
    </div>
  );
};

export default ATMCheckbox;
