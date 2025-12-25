import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { array, number, object, string } from "yup";
import { useAddMachineDataMutation } from "../../../services/BlogServices";
import { showToast } from "../../../utils/showToaster";
import VisaServiceFormLayout from "../Form/AddMachineEnteryForm";
import { VisaServiceFormValues } from "../Form/AddMachineEnteryFormPropTypes";

const AddMachineFormWrapper = () => {
    const router = useRouter()
    const [addMachine] = useAddMachineDataMutation();


    const initialValues: VisaServiceFormValues = {
        farmerName: '',
        phoneNumber: '',
        startTime: '',
        endTime: '',
        date: '',
        description: '',
        duration: '',
        extraEntrys: [],
        grandTotal: '',
        labour : ''
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
        labour: string().required("labour is required"),
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

 
    //     values: VisaServiceFormValues,
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
        // const formatedValue = {
        //   bannerImage: values.bannerImage,
        //   title: values.title,
        //   description: values.description,
        // };

        addMachine(values).then((res: any) => {
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
        >
            {(formikProps) => (
                <Form>
                    <VisaServiceFormLayout formType="Add" formikProps={formikProps} />
                </Form>
            )}
        </Formik>
    );
};

export default AddMachineFormWrapper;
