let firebaseConfig = {	apiKey: "AIzaSyAuUQjOLA7sLp13hQworeHimq1GtPa8aDo",

	authDomain: "fir-d35c2.firebaseapp.com",

	projectId: "fir-d35c2",

	storageBucket: "fir-d35c2.appspot.com",

	messagingSenderId: "565118204204",

	appId: "1:565118204204:web:4cb9429c2f1b460d14d489",

	measurementId: "G-3GEC92VLN8",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
let db = firebase.firestore();
