// const { getBedRequestStatus } = require("../functions");

var app = new Vue({
    el: '#app',
    data: {
        aadharNumber: "",
        patientsName: "",
        attenderPhone: "",
        requestStatus: "",
        statusMessage: "",
        statusUpdateTime: "",
        dataLoaded: false,
        isLoading: false,
        isError: false,
        errorMessage: "",
        isStep1Yes: false,
        isStep2Yes: false,
        isStep3Yes: false,
        isStep4Yes: false,
        isRequestCancelled:false
    },
    methods: {
        async getBedRequestStatus() {
            // alert("Bed request for " + this.aadharNumber);
            this.isLoading = true;
            this.dataLoaded = false;
            this.isError = false;
            this.isStep1Yes = false;
            this.isStep2Yes = false;
            this.isStep3Yes = false;
            this.isStep4Yes = false;
            this.isRequestCancelled = false;
            this.statusMessage = "Testing 1";
            this.requestStatus = "Testing 2";
            //   this.dataLoaded = true;
            let patientsUID = this.patientsName.replaceAll(" ", "*").replaceAll(".", "-") + "-+91" + this.attenderPhone
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ aadhar: patientsUID })
            };
            const response = await fetch("https://us-central1-chennaicovidbedhelp.cloudfunctions.net/getBedRequestStatus", requestOptions);
            const data = await response.json();
            console.log("Request status", data);
            if (data.requestStatus) {
                this.requestStatus = data.requestStatus;
            }
            if (data.statusMessage) {
                this.statusMessage = data.statusMessage;
            }
            if (data.statusUpdateTime) {
                this.statusUpdateTime = new Date(data.statusUpdateTime).toLocaleDateString("en-US") + " " + new Date(data.statusUpdateTime).toLocaleTimeString("en-US");
            }
            this.isLoading = false;
            if (data.errorMessage) {
                this.dataLoaded = false;
                this.isError = true;
                this.errorMessage = data.errorMessage;
            } else {
                this.dataLoaded = true;
                this.isError = false;
            }
            switch (this.requestStatus) {
                case "New":
                    this.isStep1Yes = true;
                    break;
                case "Triage Assigned":
                    this.isStep1Yes = true;
                    this.isStep2Yes = true;
                    break;
                case "Volunteer Assigned":
                    this.isStep1Yes = true;
                    this.isStep2Yes = true;
                    this.isStep3Yes = true;
                    break;
                case "Searching for Hospitals":
                    this.isStep1Yes = true;
                    this.isStep2Yes = true;
                    this.isStep3Yes = true;
                    break;
                case "Bed Assigned":
                    this.isStep1Yes = true;
                    this.isStep2Yes = true;
                    this.isStep3Yes = true;
                    this.isStep4Yes = true;
                    break;
                case "Hospitalised":
                    this.isStep1Yes = true;
                    this.isStep2Yes = true;
                    this.isStep3Yes = true;
                    this.isStep4Yes = true;
                    break;
                case "Attender Not Reachable":
                    this.isStep1Yes = true;
                    this.isStep2Yes = true;
                    this.isStep3Yes = true;
                    break;
                case "Needs to Shift to New Hospital":
                    this.isStep1Yes = true;
                    this.isStep2Yes = true;
                    this.isStep3Yes = true;
                    break;
                case "Invalid / Duplicate Request":
                    this.isStep1Yes = true;
                    this.isStep2Yes = true;
                    break;
                case "Bed Request Cancelled":
                    this.isStep1Yes = true;
                    this.isStep2Yes = true;
                    this.isStep4Yes = true;
                    this.isRequestCancelled = true;
                    break;
                default:
                    this.isStep1Yes = true;
                    break;
            }
            // console.log("Response data", data);
        }
    },
    mounted() {
        // let uri = window.location.search.substring(1);
        // let params = new URLSearchParams(uri);
        // // console.log(params.get("a"));
        // // this.aadharNumber = params.get("a");
        // // if (this.aadharNumber && this.aadharNumber > 0) {
        // //     this.getBedRequestStatus();
        // // }
    },
})