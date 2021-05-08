// const { getBedRequestStatus } = require("../functions");

// const { request } = require("http");

var app = new Vue({
    el: '#app',
    data: {
        searchTerm:"",
        oldSearchTerm : "",
        hospitals:[],
        dataLoaded: false,
        isLoading: false,
        isError: false,
        errorMessage: "",
        nextPageToken : "",
    },
    methods: {
        async fetchResultsFromGoogle() {
            // alert("Bed request for " + this.aadharNumber);
            this.isLoading = true;
            this.dataLoaded = false;
            this.isError = false;
            if (this.oldSearchTerm == "") {
                this.oldSearchTerm = this.searchTerm
            }
            if (this.oldSearchTerm != this.searchTerm) {
                this.nextPageToken = "";
                this.hospitals = [];
            }
            //   this.dataLoaded = true;
            // this.hospitals = [
            //     { "name": "BCD", "address": "XaddressX", "pincode": "XpincodeX" }
            // ];
            // const requestOptions = {
            //     method: "GET",
            //     body: JSON.stringify({ aadhar: patientsUID })
            // };
            let requestUrl = ""; 
            if (this.nextPageToken != "") {
                // requestUrl = requestUrl + "&pagetoken=" + this.nextPageToken;
                requestUrl = "http://localhost:5001/chennaicovidbedhelp/us-central1/googleMapsSearch?pagetoken=" + this.nextPageToken;
            } else {
                requestUrl = "http://localhost:5001/chennaicovidbedhelp/us-central1/googleMapsSearch?searchTerm=" + this.searchTerm;
            }
            const response = await fetch(requestUrl);
            const data = await response.json();
            console.log("data",data);
            // this.hospitals =[];
            data.results.forEach(hospital => {
                // console.log("Hospital",hospital);
                var hosp = {};
                hosp["place_id"] = hospital["place_id"];
                hosp["name"] = hospital["name"];
                hosp["address"] = hospital["formatted_address"];
                hosp["pincode"] = "";
                hosp["contacts"] = "";
                hosp["lat"] = hospital["geometry"]["location"]["lat"];
                hosp["lng"] = hospital["geometry"]["location"]["lng"];
                this.hospitals.push(hosp);
            });
            if (data.next_page_token) {
                this.nextPageToken = data.next_page_token;
            } else {
                this.nextPageToken = "";
            }
            // console.log("Request status",this.hospitals);
            this.dataLoaded = true;
            this.isLoading = false;
            // }
            // console.log("Response data", data);
        }
    },
    mounted() {
        this.dataLoaded = false;
        this.isLoading= false;
        // let uri = window.location.search.substring(1);
        // let params = new URLSearchParams(uri);
        // console.log(params.get("a"));
        // this.aadharNumber = params.get("a");
        // if (this.aadharNumber && this.aadharNumber > 0) {
        //     this.getBedRequestStatus();
        // }
    },
})