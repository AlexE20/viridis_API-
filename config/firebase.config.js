import admin from "firebase-admin";
import serviceAccount from "./viridis-firebase.json" assert {type:"json"}


admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
});

const fb=admin.firestore();
export default fb;