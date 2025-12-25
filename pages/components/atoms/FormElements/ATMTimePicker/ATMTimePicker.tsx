import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ErrorMessage } from "formik";
import moment from "moment";

type ATMTimePickerPropType = {
  label?: string;
  value: Date | null;
  onChange: (e: Date | null) => void;
  required?: boolean;
  minTime?: Date | null;
  disabled?: boolean;
  readOnly?: boolean;
  name: string;
};

const ATMTimePicker = ({
  label = "",
  value,
  onChange = () => {},
  required = false,
  minTime = null,
  disabled = false,
  name,
  readOnly = false,
}: ATMTimePickerPropType) => {
  return (
    <div className="relative">
      {label && (
        <label className="text-sm text-slate-700 font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="h-[40px] flex items-center">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <TimePicker
            disabled={disabled}
            value={value ? moment(value) : null}
            readOnly={readOnly}
            onChange={(newValue) => onChange(newValue ? newValue.toDate() : null)}
            minTime={minTime ? moment(minTime) : null}
            format="hh:mm A"
            slotProps={{ textField: { size: "small", fullWidth: true } }} // Updated for MUI v6
          />
        </LocalizationProvider>
      </div>

      {name && (
        <ErrorMessage name={name}>
          {(errMsg) => <p className="font-poppins absolute text-[12px] text-start mt-0 text-red-400">{errMsg}</p>}
        </ErrorMessage>
      )}
    </div>
  );
};

export default ATMTimePicker;
