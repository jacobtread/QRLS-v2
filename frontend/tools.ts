import router from './src/router';

let redirectTimeout: number = -1;

export function setRedirectIn(location: string, seconds: number) {
  clearRedirect();
  redirectTimeout = setTimeout(() => router.push({ name: location }), seconds * 1000);
}

export function clearRedirect() {
  if (redirectTimeout != -1) {
    clearTimeout(redirectTimeout);
    redirectTimeout = -1;
  }
}