import apiSlice from "./ApiSlice";

export const MachineDataApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL JOB WITH PAGINATION
    getAllMachineDataWithPagination: builder.query({
      providesTags: ["MachineData"],
      query: (body) => {
        return {
          url: "/api/getEntries",
          // method: "POST",
          // body,
        };
      },
    }),
    // Add
    addMachineData: builder.mutation({
      invalidatesTags: ["MachineData"],
      query: (body) => {
        return {
          url: "/api/addEntry",
          method: "POST",
          body,
        };
      },
    }),
    // GET JOB BY ID
    getMachineDataById: builder.query({
      providesTags: ["MachineData"],
      query: (id) => {
        return {
          url: `/api/getSingleEntry/${id}`,
          method: "GET",
        };
      },
    }),
    // GET JOB BY ID
    getTotalData: builder.query({
      providesTags: ["MachineData"],
      query: (id) => {
        return {
          url: `/api/getTotal`,
          method: "GET",
        };
      },
    }),

    // DELETE
    deleteMachineEntry: builder.mutation({
      invalidatesTags: ["MachineData"],
      query: (id) => {
        return {
          url: `/api/deleteEntry/${id}`,
          method: "DELETE",
        };
      },
    }),
    // EDIT
    editMachine: builder.mutation({
      invalidatesTags: ["MachineData"],
      query: ({ body, id }) => {
        return {
          url: `/api/updateEntry/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetAllMachineDataWithPaginationQuery,
  useAddMachineDataMutation,
  useGetMachineDataByIdQuery,
  useEditMachineMutation,
  useDeleteMachineEntryMutation,
  useGetTotalDataQuery
} = MachineDataApi;
