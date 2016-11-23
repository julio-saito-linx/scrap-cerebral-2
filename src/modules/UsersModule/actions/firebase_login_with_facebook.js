export default function firebase_login_with_facebook({ firebase, path }) {
  return firebase.signInWithFacebook({
    redirect: false, // Use popup or redirect. Redirect typically for mobile
    scopes: [] // Facebook scopes to access
  })
    .then(path.success)
    .catch(path.error);
}
