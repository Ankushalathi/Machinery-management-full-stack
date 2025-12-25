import React, { useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { RxPencil1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import ATMMenu from "../../../pages/components/atoms/ATMMenu/ATMMenu";
import { columnTypes } from "../../../pages/components/atoms/ATMTable/ATMTable";

import {
    setIsTableLoading,
    setItems,
    setPage,
    setRowsPerPage,
    setSearchValue,
    setTotalItems,
} from "../../../redux/slices/MachineSlice";

import { formatedDateTimeIntoIst } from "../../../utils/dateTimeFormate";
import { useRouter } from "next/router";
import { RootState } from "../../../redux/store";
import { useDeleteMachineEntryMutation, useGetAllMachineDataWithPaginationQuery } from "../../../services/BlogServices";
import { showConfirmationDialog } from "../../../utils/showConfirmationDialog";
import { showToast } from "../../../utils/showToaster";
import MachineListing from "./MachineListing";
type Props = {};

const MachineListingWrapper = (props: Props) => {
    const router = useRouter()
    const dispatch = useDispatch();

    const { items, totalItems, page, rowsPerPage, searchValue, isTableLoading } =
        useSelector((state: RootState) => state.machine);
        const [deleteMachineEntry] = useDeleteMachineEntryMutation();


    const { data, isLoading, isFetching } = useGetAllMachineDataWithPaginationQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ["title", "description"],
        page: page,
        filterBy: [],
        dateFilter: {},
        orderBy: "createdAt",
        orderByValue: -1,
        isPaginationRequired: true,
    });
    console.log(data, "data inner listing");
    useEffect(() => {
        if (!isLoading && !isFetching) {
            dispatch(setItems(data?.data || []));
            dispatch(setTotalItems(data?.totalItem || 0));
            dispatch(setRowsPerPage(data?.pageSize || 0));
            dispatch(setPage(data?.currentPage || 0));
            dispatch(setIsTableLoading(false));
        } else {
            dispatch(setIsTableLoading(true));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, isLoading, isFetching]);


    const getActionOptions = (goalId: string) => {
        return [
            {
                label: (
                    <div className="flex items-center gap-2 text-secondary-main">
                        <RxPencil1 className="text-lg" /> Edit
                    </div>
                ),
                onClick: () => {
                    router.push(`machine-edit-form/${goalId}`)
                },
            },
            {
                label: (
                    <div className="flex items-center gap-2 font-semibold text-red-600">
                        <MdDeleteOutline className="text-lg" /> Delete
                    </div>
                ),
                onClick: () => {
                  showConfirmationDialog({
                    title: "Heads Up",
                    text: "Are you sure want to Delete this Assets ?",
                    icon: "question",
                    showCancelButton: true,
                    next: (result) => {
                      if (result?.isConfirmed) {
                        deleteMachineEntry(goalId).then((res: any) => {
                        console.log('res: ', res);
                          if (res?.error) {
                            showToast("error", res?.error?.data?.message);
                          } else {
                            if (res?.data?.status) {
                              showToast("success", res?.data?.message);
                            } else {
                              showToast("error", res?.data?.message);
                            }
                          }
                        });
                      }
                    },
                  });
                },
            },
        ];
    };
    const columns: columnTypes[] = [
        {
            field: "date",
            headerName: "Date",
            flex: "flex-[1_1_0%]",
            extraClasses: "capitalize min-w-[150px]",
            renderCell: (row: any) => (
                <div>
                  <div className="text-md text-slate-700 font-medium">
                    {formatedDateTimeIntoIst(row.createdAt, "DD MMM yyyy")}
                  </div>
                </div>
              ),
        },
        {
            field: "farmerName",
            headerName: "Farmer Name",
            flex: "flex-[1_1_0%]",
            extraClasses: "capitalize min-w-[200px]",
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: "flex-[1_1_0%]",
            extraClasses: "capitalize min-w-[180px]",
        },
   
        {
            field: "description",
            headerName: "Description",
            flex: "flex-[1_1_0%]",
            extraClasses: "capitalize min-w-[200px]",
        },
        {
            field: "duration",
            headerName: "Duration",
            flex: "flex-[1_1_0%]",
            extraClasses: "capitalize min-w-[120px]",
        },

        {
            field: "extraEntrys",
            headerName: "Extra Entries",
            flex: "flex-[1_1_0%]",
            extraClasses: "capitalize min-w-[300px]",
            renderCell: (row: any) => (
                <div className="text-[13px] space-y-2">
                    {row?.extraEntrys?.length ? (
                        row?.extraEntrys?.map((entry: any, index: number) => (
                            <div key={index} className="p-2 border rounded-md shadow-sm bg-gray-50">
                                <div className="font-medium text-slate-700">
                                {formatedDateTimeIntoIst(entry.date, "DD MMM yyyy")} | {entry.description}
                                </div>
                                <div className="text-sm text-slate-600">
                                    Duration: {entry.duration} | {entry.startTime} - {entry.endTime}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>-</div>
                    )}
                </div>
            ),
        },
        {
            field: "grandTotal",
            headerName: "Grand Total",
            flex: "flex-[1_1_0%]",
            extraClasses: "capitalize min-w-[150px]",
            renderCell: (row: any) => (
                <div>
                  <div className="text-md text-slate-700 font-medium">
                    {row?.grandTotal ? row?.grandTotal : '-'}
                  </div>
                </div>
              ),
        },
        {
            field: "totalLabour",
            headerName: "Total Labour",
            flex: "flex-[1_1_0%]",
            extraClasses: "capitalize min-w-[150px]",
            renderCell: (row: any) => (
                <div>
                  <div className="text-md text-slate-700 font-medium">
                    {row?.totalLabour ? row?.totalLabour : '-'}
                  </div>
                </div>
              ),
        },
        {
            field: "action",
            headerName: "Action",
            flex: "flex-[1_1_0%]",
            extraClasses: "py-2 capitalize min-w-[150px]",
            renderCell: (row: any) => {
                const options = getActionOptions(row?._id);
                return <ATMMenu options={options} orientation="vertical" />;
            },
        },
    ];



    return (
        <div>
            <MachineListing
                columns={columns}
                rows={items}
                getActionOptions={getActionOptions}
                onAddNew={() => {
                    setIsOpenAddForm(true);
                }}
                paginationProps={{
                    isTableLoading: isTableLoading,
                    totalItems,
                    page,
                    rowsPerPage,
                    searchValue,
                    setPage: (newPage) => dispatch(setPage(newPage)),
                    setRowsPerPage: (newRowsPerPage) =>
                        dispatch(setRowsPerPage(newRowsPerPage)),
                    setSearchValue: (newValue) => dispatch(setSearchValue(newValue)),
                }}
            />
            {/* {isOpenAddForm && (
        <AddGoalFormWrapper onClose={() => setIsOpenAddForm(false)} />
      )} */}
            {/* {isOpenEditFrom && (
        <EditGoalFormWrapper
          goalId={goalId}
          onClose={() => setIsOpenEditForm(false)}
        />
      )} */}

        </div>
    );
};

export default MachineListingWrapper;
