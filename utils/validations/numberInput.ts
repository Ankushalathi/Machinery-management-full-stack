export const handleValidNumber: (
  event: any,
  options?: { forMobile?: boolean }
) => boolean = (event, options) => {
  const numRegExp = /^[0-9]*$/; // Updated RegExp to allow numbers and %
  const mobileRegx = /^[+\d\s]+$/;
  const regx = options?.forMobile ? mobileRegx : numRegExp;
  if(event?.target.value === ''){
    return true
  }
  if (regx.test(event?.target?.value)) {
    return true;
  } else {
    return false;
  }
};

export const handleValidWithDotNumber: (
  event: any,
  options?: { acceptPercent?: boolean; acceptNegative?: boolean }
) => boolean = (event, options) => {
  const numRegExp = /^[0-9.%]*$/; // Updated RegExp to allow numbers, dot (.), and %
  const numRegExpwithoutPercent = /^[0-9.]*$/; // Updated RegExp to allow numbers, dot (.)
  const numRegExpwithNegative = /^[0-9.-]*$/; // Updated RegExp to allow numbers, negative
  if (options?.acceptPercent) {
    return numRegExp.test(event?.target?.value);
  } else if (options?.acceptNegative) {
    return numRegExpwithNegative.test(event?.target?.value);
  } else {
    return numRegExpwithoutPercent.test(event?.target?.value);
  }
};

export const handleValidPercent: (event: any) => boolean = (event) => {
  const value = event?.target?.value;
  const numValue = Number(value);
  if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
    return true;
  } else {
    return false;
  }
};

export const validPhoneRegex = RegExp(/^[6-9]\d{9}$/);
