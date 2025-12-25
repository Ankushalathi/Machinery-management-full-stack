import ATMPageHeader from "../../components/atoms/ATMPageHeader/ATMPageHeader";
import ATMPagination from "../../components/atoms/ATMPagination/ATMPagination";
import ATMTable, {
    columnTypes,
} from "../../components/atoms/ATMTable/ATMTable";
import { useRouter } from "next/router";

type Props = {
    columns: columnTypes[];
    rows: any[];
    onAddNew: () => void;
    getActionOptions: any;
    paginationProps: {
        isTableLoading: boolean;
        totalItems: number;
        page: number;
        rowsPerPage: number;
        searchValue: string;
        setPage: (newPage: number) => void;
        setRowsPerPage: (newLimit: number) => void;
        setSearchValue: (newValue: string) => void;
    };
};

const MachineListing = ({
    columns,
    rows,
    onAddNew,
    paginationProps: {
        totalItems,
        isTableLoading,
        page,
        rowsPerPage,
        searchValue,
        setPage,
        setRowsPerPage,
        setSearchValue,
    },
}: Props) => {
  const router = useRouter();

    return (

        <>
            <div className="flex flex-col p-4">
                {/* Page Header */}
                <div className="py-4">
                    <ATMPageHeader
                        pageTitle="Machinery Usage Management"
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        buttonProps={{
                            btnName: "Add New",
                            onClick: ()=>{
                                router.push('machine-form')
                            },
                        }}

                    />
                </div>

                {/* Table */}
                <div className="flex flex-col flex-1 overflow-auto md-w-full w-[500px] ">
                    <ATMTable
                        columns={columns}
                        rows={rows}
                        rowExtraClasses={() => "min-h-[40px]"}
                        onRowClick={(row: any) => {

                        }
                        }
                        isLoading={isTableLoading}
                    />
                </div>

                <div className="md:flex justify-end py-2">
                    <ATMPagination
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={setPage}
                        onRowsPerPageChange={setRowsPerPage}
                        rowCount={totalItems}
                        rows={rows}
                    />
                </div>
            </div>

        </>
    );
};

export default MachineListing;
