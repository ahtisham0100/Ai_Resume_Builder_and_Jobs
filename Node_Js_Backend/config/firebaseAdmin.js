import admin from "firebase-admin";

const { PROJECT_ID, CLIENT_EMAIL, PRIVATE_KEY } = process.env;

if (!PROJECT_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
  console.log(PRIVATE_KEY , CLIENT_EMAIL , PROJECT_ID)
  throw new Error(
    "Missing Firebase environment variables. Check your .env file!"
  );
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: PROJECT_ID,
      clientEmail: CLIENT_EMAIL,
      privateKey: PRIVATE_KEY.replace(/\\n/g, "\n"), // converts escaped \n to real line breaks
    }),
  });
}

export default admin;
