// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import MicrosoftProvider from "next-auth/providers/azure-ad";
// import AppleProvider from "next-auth/providers/apple";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     MicrosoftProvider({
//       clientId: process.env.MICROSOFT_CLIENT_ID,
//       clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
//       tenantId: process.env.MICROSOFT_TENANT_ID, // optional, default is "common"
//     }),
//     AppleProvider({
//       clientId: process.env.APPLE_CLIENT_ID,
//       clientSecret: process.env.APPLE_CLIENT_SECRET,
//     }),
//   ],
//   pages: {
//     signIn: "/auth/signin", // Custom sign-in page route
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
