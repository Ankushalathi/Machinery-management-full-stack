export type VisaService = {
    visaServiceName: string;
    expressPrice: number;
    expressProcessingTime: string;
    expressValidity: string;
    expressStayPeriod: string;
    regularPrice: number;
    regularProcessingTime: string;
    regularValidity: string;
    regularStayPeriod: string;
    visaType: any;
    description: string;
    _id:string ;
  };
  
  export type VisaServiceFormValues = {
    farmerName: string;
    phoneNumber: string;
    startTime: any; // If using Date, change to Date
    endTime: any;   // If using Date, change to Date
    date: any;      // If using Date, change to Date
    description: string;
    duration: string;
    extraEntrys: any[]; // Replace `any` with a more specific type if possible
    grandTotal: string;
    labour : any
  };
  
  