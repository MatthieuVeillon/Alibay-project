import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyAYa9W4MdaR2PiqcYf4FTAuUwa5n4FYfms",
  authDomain: "alibay-project.firebaseapp.com",
  databaseURL: "https://alibay-project.firebaseio.com",
  projectId: "alibay-project",
  storageBucket: "alibay-project.appspot.com",
  messagingSenderId: "523831352588"
};
const fb = firebase.initializeApp(config);
export default fb;
