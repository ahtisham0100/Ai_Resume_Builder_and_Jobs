import admin from "firebase-admin"
// Initializing firebase admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'), // handle multiline
    }),
  });
}

export default admin;
