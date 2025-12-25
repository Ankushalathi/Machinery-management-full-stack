import { FieldArray, FormikProps } from "formik";
import { ATMButton } from "../atoms/ATMButton/ATMButton";
import ATMTextField from "../atoms/FormElements/ATMTextField/ATMTextField";
import { VisaServiceFormValues } from "../Form/AddMachineEnteryFormPropTypes";
import { IconAd, IconClipboardCheck, IconHttpDelete, IconPlus, IconTrash } from "@tabler/icons-react";
import ATMDatePicker from "../atoms/FormElements/ATMDatePicker/ATMDatePicker";
import { useEffect, useState } from "react";
import ATMTimePicker from "../atoms/FormElements/ATMTimePicker/ATMTimePicker";
import moment from "moment";
import { handleValidNumber } from "../../../utils/validations/numberInput";

type Props = {
    formikProps: FormikProps<VisaServiceFormValues>;
    formType: string;
};

const VisaServiceFormLayout = ({ formikProps, formType }: Props) => {
    const { values, setFieldValue, isSubmitting, handleBlur, touched, errors } = formikProps;
    console.log('errors: ', errors);
    console.log('values: ', values);

    const calculateDuration = (startTime: string, endTime: string): number => {
        const start = moment(startTime, "HH:mm");
        const end = moment(endTime, "HH:mm");
        return end.diff(start, "minutes");
    };

    useEffect(() => {
        let totalDuration = 0;

        // Calculate main duration
        if (values.startTime && values.endTime) {
            totalDuration += calculateDuration(values.startTime, values.endTime);
        }

        // Calculate extra entries duration
        values.extraEntrys.forEach((entry) => {
            if (entry.startTime && entry.endTime) {
                totalDuration += calculateDuration(entry.startTime, entry.endTime);
            }
        });

        // Format total duration as 'Xh Ym'
        const formattedDuration = `${Math.floor(totalDuration / 60)}h ${totalDuration % 60}m`;
        setFieldValue("grandTotal", formattedDuration);
    }, [values.startTime, values.endTime, values.extraEntrys, setFieldValue]);
 

    return (
        <div className="h-full overflow-auto">
            <div className="sticky top-0 flex items-center justify-between px-2 py-2 bg-white  h-full overflow-auto">
                <span className="text-lg font-semibold text-slate-700">
                    {formType} Machine Service
                </span>
            </div>
            <div className="grid grid-cols-1 gap-4 px-4 py-2 mb-4">
                {/* Farmer Name */}
                <div>
                    <ATMTextField
                        name="farmerName"
                        value={values.farmerName}
                        onChange={(e) => setFieldValue("farmerName", e.target.value)}
                        label="Farmer Name"
                        placeholder="Enter Farmer Name"
                        onBlur={handleBlur}
                        isTouched={touched?.farmerName}
                        errorMessage={errors?.farmerName}
                        isValid={!errors?.farmerName}
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <ATMTextField
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onChange={(e) => {
                            handleValidNumber(e, { forMobile: true }) && setFieldValue("phoneNumber", e.target.value)
                        }}
                        label="Phone Number"
                        placeholder="Enter Phone Number"
                        onBlur={handleBlur}
                        isTouched={touched?.phoneNumber}
                        errorMessage={errors?.phoneNumber}
                        isValid={!errors?.phoneNumber}
                    />
                </div>

                {/* Description */}
                <div>
                    <ATMTextField
                        name="description"
                        value={values.description}
                        onChange={(e) => setFieldValue("description", e.target.value)}
                        label="Description"
                        placeholder="Enter Description"
                        onBlur={handleBlur}
                        isTouched={touched?.description}
                        errorMessage={errors?.description}
                        isValid={!errors?.description}
                    />
                </div>

                {/* Date */}
                <div>
                    <ATMDatePicker
                        name="date"
                        label="Date"
                        value={values.date}
                        onChange={(date) => setFieldValue("date", date)}
                        placeholder="Choose a date"
                        minDate={new Date()} // Prevent past dates selection
                        isClearable={true}
                    />
                </div>

                {/* Start Time */}
                <div>
                    <ATMTimePicker
                        label="Start Time"
                        name="startTime"
                        value={values.startTime ? moment(values.startTime, "HH:mm").toDate() : null}
                        onChange={(time) => {
                            const formattedTime = moment(time).format("HH:mm");
                            setFieldValue("startTime", formattedTime);

                            // Calculate duration if endTime exists
                            if (values.endTime) {
                                const duration = moment(formattedTime, "HH:mm").diff(moment(values.endTime, "HH:mm"), "minutes");
                                const formattedDuration = `${Math.abs(Math.floor(duration / 60))}h ${Math.abs(duration % 60)}m`;
                                setFieldValue("duration", formattedDuration);
                            }
                        }}

                    />
                </div>

                {/* End Time */}
                <div>
                    <ATMTimePicker
                        label="End Time"
                        name="endTime"
                        value={values.endTime ? moment(values.endTime, "HH:mm").toDate() : null}
                        onChange={(time) => {
                            const formattedTime = moment(time).format("HH:mm");
                            setFieldValue("endTime", formattedTime);

                            // Calculate duration if startTime exists
                            if (values.startTime) {
                                const duration = moment(formattedTime, "HH:mm").diff(moment(values.startTime, "HH:mm"), "minutes");
                                const formattedDuration = `${Math.abs(Math.floor(duration / 60))}h ${Math.abs(duration % 60)}m`;
                                setFieldValue("duration", formattedDuration);
                            }
                        }}

                    />
                </div>

                {/* Duration */}
                <div>
                    <ATMTextField
                        name="duration"
                        value={values.duration}
                        onChange={(e) => setFieldValue("duration", e.target.value)}
                        label="Total time"
                        placeholder="Enter Total time"
                        onBlur={handleBlur}
                        isTouched={touched?.duration}
                        errorMessage={errors?.duration}
                        isValid={!errors?.duration}
                        disabled
                        className="text-slate-900"
                    />
                </div>
                {/* labour */}
                <div>
                    <ATMTextField
                        name="labour"
                        value={values.labour}
                        onChange={(e) => { handleValidNumber(e, { forMobile: true }) && setFieldValue("labour", e.target.value) }}
                        label="Labour"
                        placeholder="Enter labour"
                        onBlur={handleBlur}
                        isTouched={touched?.labour}
                        errorMessage={errors?.labour}
                        isValid={!errors?.labour}
                    />
                </div>

                {/* Extra Entries */}
                {/* Extra Entries Section */}
                <FieldArray
                    name="extraEntrys"
                    render={({ push, remove }) => (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                                <IconClipboardCheck size={20} color="#0064C4" className="mr-2" />
                                Extra Entries
                            </h3>

                            {values?.extraEntrys?.map((entry, index) => (
                                <div key={index} className="border p-4 rounded-lg mb-4 shadow-sm bg-white">
                                    <div className="grid grid-cols-1 gap-4">
                                        <ATMDatePicker
                                            name={`extraEntrys.${index}.date`}
                                            label="Date"
                                            value={entry.date}
                                            onChange={(date) => setFieldValue(`extraEntrys.${index}.date`, date)}
                                            placeholder="Choose a date"
                                            minDate={new Date()}
                                            isClearable={true}
                                        />

                                        <ATMTimePicker
                                            label="Start Time"
                                            name={`extraEntrys.${index}.startTime`}
                                            value={entry.startTime ? moment(entry.startTime, "HH:mm").toDate() : null}
                                            onChange={(time) => {
                                                const formattedTime = moment(time).format("HH:mm");
                                                setFieldValue(`extraEntrys.${index}.startTime`, formattedTime);
                                                if (values.extraEntrys[index]?.endTime) {
                                                    const duration = moment(values.extraEntrys[index]?.endTime, "HH:mm").diff(moment(formattedTime, "HH:mm"), "minutes");
                                                    setFieldValue(`extraEntrys.${index}.duration`, `${Math.abs(Math.floor(duration / 60))}h ${Math.abs(duration % 60)}m`);
                                                }
                                            }}
                                        />

                                        <ATMTimePicker
                                            label="End Time"
                                            name={`extraEntrys.${index}.endTime`}
                                            value={entry.endTime ? moment(entry.endTime, "HH:mm").toDate() : null}
                                            onChange={(time) => {
                                                const formattedTime = moment(time).format("HH:mm");
                                                setFieldValue(`extraEntrys.${index}.endTime`, formattedTime);
                                                if (values.extraEntrys[index]?.startTime) {
                                                    const duration = moment(formattedTime, "HH:mm").diff(moment(values.extraEntrys[index]?.startTime, "HH:mm"), "minutes");
                                                    setFieldValue(`extraEntrys.${index}.duration`, `${Math.abs(Math.floor(duration / 60))}h ${Math.abs(duration % 60)}m`);
                                                }
                                            }}
                                        />

                                        <ATMTextField
                                            name={`extraEntrys.${index}.labour`}
                                            value={entry.labour}
                                            onChange={(e) => { handleValidNumber(e, { forMobile: true }) && setFieldValue(`extraEntrys.${index}.labour`, e.target.value) }}
                                            label="Labour"
                                            placeholder="Enter labour"
                                        />

                                        <ATMTextField
                                            name={`extraEntrys.${index}.duration`}
                                            value={entry.duration}
                                            label="Total Time"
                                            placeholder="Enter Total time"
                                            disabled
                                        />

                                        <ATMTextField
                                            name={`extraEntrys.${index}.description`}
                                            value={entry.description}
                                            onChange={(e) => setFieldValue(`extraEntrys.${index}.description`, e.target.value)}
                                            label="Description"
                                            placeholder="Enter Description"
                                        />

                                        {/* Delete Button */}
                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                className="text-red-500 hover:text-red-700 text-sm flex items-center"
                                                onClick={() => remove(index)}
                                            >
                                                <IconTrash size={18} className="mr-1" />
                                                Delete Entry
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Add More Entries Button - Always at Bottom */}
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-2 py-2 rounded flex items-center"
                                    onClick={() =>
                                        push({
                                            date: "",
                                            description: "",
                                            startTime: "",
                                            endTime: "",
                                            duration: "",
                                        })
                                    }
                                >
                                    <IconPlus size={18} className="mr-2" />
                                    Add Entries
                                </button>
                            </div>
                        </div>
                    )}
                />

                <div>
                    <ATMTextField
                        name="grandTotal"
                        value={values.grandTotal}
                        label="Grand Total Duration"
                        placeholder="Total Duration"
                        disabled
                    />
                </div>
            </div>

            <div className="sticky bottom-0 flex items-center justify-end gap-2 px-4 py-3 bg-white">
                <ATMButton extraClasses="px-8"
                    type="submit" isLoading={isSubmitting}>
                    Submit
                </ATMButton>
            </div>
        </div>
    );
};

export default VisaServiceFormLayout;
