import * as React from "react";
import Pagination from "@mui/material/Pagination";

interface ATMPaginationPropTypes {
  page: number;
  onPageChange: (newPage: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange?: (newRowsPerPage: number) => void;
  rowCount: number;
  rowsPerPageOptions?: number[];
  rows: any[];
  hideRowsPerPage?: boolean;
}

const ATMPagination = ({
  rows,
  rowCount,
  page,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 20, 50, 100],
}: ATMPaginationPropTypes) => {
  return (
    <>
      {rows?.length ? (
         <>
         
        <div className="flex justify-between gap-3 px-2  h-[50px] items-center  ">
          {/* Out of */}

          <div className="flex gap-3 items-center">
            <div className="text-sm font-medium text-black">
              Rows per page :
            </div>
            <select
              value={rowsPerPage}
              onChange={(e) => onRowsPerPageChange?.(parseInt(e.target.value))}
              className={`rounded-lg p-1 outline-0 bg-slate-100 text-sm font-medium text-black `}
            >
              {rowsPerPageOptions.map((option) => {
                return (
                  <option key={option} value={option}>
                    {option}
                  </option>
                );
              })}
            </select>

            <div className="text-sm bg-slate-100 py-1 px-2 rounded-lg text-black font-medium">
              Showing &nbsp; {rowsPerPage * (page - 1) + 1} -{" "}
              {rowsPerPage * (page - 1) + rows?.length} of {rowCount}
            </div>
          </div>

          <div className="hidden md:block">
            <Pagination
              count={Math.ceil(rowCount / rowsPerPage)}
              page={page}
              onChange={(e, page) => onPageChange(page)}
              showFirstButton={true}
              showLastButton={true}
              size="medium"
              shape="rounded"
              variant="outlined"
            />
          </div>

        </div>
        <div className="flex justify-end md:hidden">
            <Pagination
              count={Math.ceil(rowCount / rowsPerPage)}
              page={page}
              onChange={(e, page) => onPageChange(page)}
              showFirstButton={true}
              showLastButton={true}
              size="medium"
              shape="rounded"
              variant="outlined"
            />
          </div>
         </>
      ) : null}
      
    </>
  );
};

export default ATMPagination;
