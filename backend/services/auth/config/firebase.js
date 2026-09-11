import { cert, initializeApp } from "firebase-admin";
import fs from "fs";

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Production: AWS Secrets Manager → ECS environment variable
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
    // Local development: serviceAccountKey.json
    serviceAccount = JSON.parse(
        fs.readFileSync(
            new URL("../serviceAccountKey.json", import.meta.url),
            "utf-8"
        )
    );
}

export const app = initializeApp({
    credential: cert(serviceAccount)
});