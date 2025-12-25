import React, { ChangeEvent } from "react";
import ATMInputAdormant from "../FormElements/ATMInputAdormant/ATMInputAdormant";
import { BiSearch, BiFilter } from "react-icons/bi";
import ATMLoadingButton from "../ATMLoadingButton/ATMLoadingButton";
import { Tooltip } from "@mui/material";

type Props = {
  pageTitle: string;
  searchValue?: string;
  onSearchChange?: (
    newValue: string,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  buttonProps?: {
    btnName?: string;
    onClick: () => void;
    className?: string;
  };
  anotherButtonProps?: {
    btnName?: string;
    onClick: () => void;
    className?: string;
  };
  hideAddButton?: boolean;
  showAnotherAddButton?: boolean;
  hideSearchBox?: boolean;
  isFilter?: boolean;
  onFilterClick?: () => void;
};

const ATMPageHeader = ({
  pageTitle,
  searchValue = "",
  onSearchChange,
  hideAddButton = false,
  buttonProps = { btnName: "Add New", onClick: () => {}, className: "" },
  showAnotherAddButton = false,
  anotherButtonProps = { btnName: "Add New", onClick: () => {}, className: "" },
  hideSearchBox = false,
  isFilter = false,
  onFilterClick = () => {},
}: Props) => {
  return (
    <div className="md:flex gap-2 justify-between ">
      <div className="text-xl font-medium text-slate-700">{pageTitle}</div>
      <div className="flex gap-2 mt-3 justify-between">
        {isFilter && (
          <Tooltip
            placement="top-start"
            arrow
            title={<span className="text-[14px]  font-semibold">Filter</span>}
          >
            <button
              onClick={() => onFilterClick()}
              className="bg-white shadow px-2 flex items-center rounded border"
            >
              <BiFilter className="text-2xl text-slate-600" />
            </button>
          </Tooltip>
        )}

        {hideSearchBox ? null : (
          <div className="md:w-[300px] w-[250px]">
            <ATMInputAdormant
              name=""
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value, e)}
              adormant={<BiSearch />}
              adormantProps={{
                position: "start",
                extraClasses: "bg-white border-0",
              }}
              inputProps={{ className: "bg-white" }}
              placeholder="Search..."
            />
          </div>
        )}
        {showAnotherAddButton ? (
          <div>
            <ATMLoadingButton
              onClick={anotherButtonProps?.onClick}
              className={anotherButtonProps?.className}
            >
              {" "}
              {anotherButtonProps?.btnName}{" "}
            </ATMLoadingButton>
          </div>
        ) : null}
        {hideAddButton ? null : (
          <div>
            <ATMLoadingButton
              onClick={buttonProps?.onClick}
              className={buttonProps?.className}
            >
              {" "}
              {buttonProps?.btnName}{" "}
            </ATMLoadingButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ATMPageHeader;
