// Google OAuth Configuration
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;

// Export the credentials for use in other parts of the application
export { googleClientId, googleClientSecret };

// You can also export them as a configuration object if preferred
export const googleConfig = {
  clientId: googleClientId,
  clientSecret: googleClientSecret,
};
