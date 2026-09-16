/**
 * Firebase web app config for the DevFest SLC workshop project.
 * There is no Gemini API key. AI Logic uses this public Firebase config.
 */
export const firebaseConfig = {
  apiKey: 'AIzaSyBc1d6qQq2yftPa_V1JdAmgvjioLZE4gcQ',
  authDomain: 'devfest-resume-builder.firebaseapp.com',
  projectId: 'devfest-resume-builder',
  storageBucket: 'devfest-resume-builder.firebasestorage.app',
  messagingSenderId: '313657531824',
  appId: '1:313657531824:web:ecf00174c88e310b4a4a75',
};

export function isFirebaseConfigReady(): boolean {
  return (
    !!firebaseConfig.apiKey &&
    !firebaseConfig.apiKey.startsWith('YOUR_') &&
    !!firebaseConfig.projectId &&
    firebaseConfig.projectId !== 'YOUR_PROJECT_ID' &&
    !!firebaseConfig.appId &&
    !firebaseConfig.appId.startsWith('YOUR_')
  );
}
