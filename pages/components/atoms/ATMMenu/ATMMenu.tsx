import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { HiDotsHorizontal, HiDotsVertical } from "react-icons/hi";
const ITEM_HEIGHT = 48;

type OptionType = {
  label: React.ReactNode;
  onClick: () => void;
  isHideOptions?:boolean
};

type Props = {
  options: OptionType[];
  iconSize?: number;
  orientation?: "vertical" | "horizontal";
};

const ATMMenu = ({ options, iconSize, orientation = "vertical" }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {orientation === "vertical" ? (
          <HiDotsVertical size={iconSize} />
        ) : (
          <HiDotsHorizontal size={iconSize} />
        )}
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options
          .map((option, optionIndex) => (
           option?.isHideOptions ? null :  <MenuItem
           key={optionIndex}
           onClick={(e) => {
             option.onClick();
             handleClose(e);
           }}
         >
           {option.label}
         </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

export default ATMMenu;
