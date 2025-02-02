import { config } from 'src/config';

export const serviceAccountKeys = {
  type: config.GOOGLE_DRIVE_TYPE,
  project_id: config.GOOGLE_DRIVE_PROJECT_ID,
  private_key_id: config.GOOGLE_DRIVE_PRIVATE_KEY_ID,
  private_key: config.GOOGLE_DRIVE_PRIVATE_KEY,
  client_email: config.GOOGLE_DRIVE_CLIENT_EMAIL,
  client_id: config.GOOGLE_DRIVE_CLIENT_ID,
  auth_uri: config.GOOGLE_DRIVE_AUTH_URI,
  token_uri: config.GOOGLE_DRIVE_TOKEN_URI,
  auth_provider_x509_cert_url: config.GOOGLE_DRIVE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: config.GOOGLE_DRIVE_CLIENT_CERT_URL,
  universe_domain: config.GOOGLE_DRIVE_UNIVERSE_DOMAIN,
};
