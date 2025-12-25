import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { array, number, object, string } from "yup";
import { useAddMachineDataMutation, useEditMachineMutation, useGetMachineDataByIdQuery } from "../../../services/BlogServices";
import { showToast } from "../../../utils/showToaster";
import VisaServiceFormLayout from "./AddMachineEnteryForm";
import { VisaServiceFormValues } from "./AddMachineEnteryFormPropTypes";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Calendar, Clock, Phone, User, Loader2 } from "lucide-react";

const EditMachineEnteryWrapper = () => {
    const router = useRouter()
    const { id } = router.query; // Get ID from URL

    console.log('id:', id);

    const [Machine, setMachineData] = useState<any>({});
    console.log('Machine: ', Machine);

    const [editMachine] = useEditMachineMutation();
    const { data, isLoading, isFetching } = useGetMachineDataByIdQuery(id);

    useEffect(() => {
        if (!isLoading && !isFetching) {
            setMachineData(data?.data);
        }
    }, [data, isLoading, isFetching]);
    const initialValues: VisaServiceFormValues = {
        farmerName: Machine?.farmerName || '',
        phoneNumber: Machine?.phoneNumber || '',
        startTime: Machine?.startTime || '',
        endTime: Machine?.endTime || '',
        date: Machine?.date || '',
        description: Machine?.description || '',
        duration: Machine?.duration || '',
        extraEntrys: Machine?.extraEntrys || [],
        grandTotal: Machine?.grandTotal || '',
        labour: Machine?.labour || ''
    };

    const validationSchema = object().shape({
        farmerName: string().required("Farmer name is required"),
        phoneNumber: number()
            .typeError("Phone number must be a number")
            .positive("Phone number must be positive")
            .integer("Phone number must be an integer")
            .required("Phone number is required"),
        startTime: string().required("Start time is required"),
        endTime: string().required("End time is required"),
        date: string().required("Date is required"),
        description: string(),
        duration: string().required("Duration is required"),
        // labour: string().required("labour is required"),
        grandTotal: string(),
        extraEntrys: array().of(
            object().shape({
                date: string().required("Entry date is required"),
                description: string(),
                duration: string().required("Duration is required"),
                startTime: string().required("Start time is required"),
                endTime: string().required("End time is required"),
            })
        ),
    });

    //     { resetForm, setSubmitting }: FormikHelpers<VisaServiceFormValues>
    //   ) => {
    //     try {
    //       const response = await fetch("/api/addEntry", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(values),
    //       });

    //       const data = await response.json();

    //       if (!response.ok) {
    //         throw new Error(data.error || "Something went wrong");
    //       }

    //       showToast("success", "Entry added successfully!");
    //       resetForm();
    //       router.push('/machine-listing')
    //     //   navigate("/visa-service");
    //     } catch (error: any) {
    //       showToast("error", error.message);
    //     } finally {
    //       setSubmitting(false);
    //     }
    //   };

    // Handle Submit
    const handleSubmit = (
        values: VisaServiceFormValues,
        { setSubmitting, resetForm }: FormikHelpers<VisaServiceFormValues>
    ) => {
        console.log(values, "inner submit form");


        editMachine({
            body: values,
            id: Machine?._id,
        }).then((res: any) => {
            console.log(res, "ressss");
            if (res?.error) {
                showToast("error", res?.error?.data?.message);
            } else {
                if (res?.data) {
                    showToast("success", res?.data?.message);
                    resetForm()
                    router.push('/machine-listing')

                    //   if (!saveNextChecked) {
                    //     resetForm();
                    //     // onClose();
                    //   }
                } else {
                    showToast("error", res?.data?.message);
                }
            }
            setSubmitting(false);
        });
    };

    return (
        <Formik<VisaServiceFormValues>

            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize
        >
            {(formikProps) => (
                <Form>
                    <VisaServiceFormLayout formType="Edit" formikProps={formikProps} />
                    <div className="max-w-lg mx-auto bg-white shadow-lg border border-gray-200 rounded-xl p-6 space-y-4">
                        {/* Header - Farmer Info */}
                        <div className="flex items-center space-x-3 border-b pb-3">
                            <User className="text-blue-600 h-6 w-6" />
                            <h2 className="text-lg font-semibold text-gray-700">
                                {Machine?.farmerName}
                            </h2>
                        </div>

                        {/* Main Details */}
                        <div className="space-y-3 text-gray-600">
                            <div className="flex items-center space-x-2">
                                <Phone className="text-green-600 h-5 w-5" />
                                <p className="text-sm">{Machine?.phoneNumber}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="text-orange-500 h-5 w-5" />
                                <p className="text-sm">{Machine?.date}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="text-indigo-500 h-5 w-5" />
                                <p className="text-sm">
                                    {Machine?.startTime} - {Machine?.endTime || "Ongoing"}
                                </p>
                            </div>
                        </div>

                        {/* Labour & Total Time */}
                        <div className="grid grid-cols-2 gap-4 border-t pt-3">
                            <div className="bg-blue-50 border border-blue-200 shadow-md rounded-lg p-3 text-center">
                                <h3 className="text-sm text-blue-600">Total Hours</h3>
                                <p className="text-xl font-bold text-blue-700">{Machine?.grandTotal || "N/A"}</p>
                            </div>
                            <div className="bg-green-50 border border-green-200 shadow-md rounded-lg p-3 text-center">
                                <h3 className="text-sm text-green-600">Total Labour</h3>
                                <p className="text-xl font-bold text-green-700">{Machine?.totalLabour}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 border-t pt-3">
                            <div className="bg-blue-50 border border-blue-200 shadow-md rounded-lg p-3 text-center">
                                <h3 className="text-sm text-blue-600">Total Amount</h3>
                                <p className="text-xl font-bold text-blue-700">
                                    {Machine?.grandTotal
                                        ? Number(parseFloat(Machine.grandTotal) * 1800).toFixed(2)
                                        : "N/A"}
                                </p>
                            </div>
                        </div>


                        {/* Extra Entries */}
                        {Machine?.extraEntrys?.length > 0 && (
                            <div className="border-t pt-3">
                                <h3 className="text-sm font-semibold text-gray-600">Extra Entries</h3>
                                <ul className="space-y-2 text-gray-500 text-sm">
                                    {Machine.extraEntrys.map((extra, index) => (
                                        <li key={index} className="border p-2 rounded-md bg-gray-50">
                                            <p>
                                                <strong>Date:</strong> {extra.date}
                                            </p>
                                            <p>
                                                <strong>Time:</strong> {extra.startTime} - {extra.endTime}
                                            </p>
                                            <p>
                                                <strong>Duration:</strong> {extra.duration}
                                            </p>
                                            <p>
                                                <strong>Labour:</strong> {extra.labour}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default EditMachineEnteryWrapper;
