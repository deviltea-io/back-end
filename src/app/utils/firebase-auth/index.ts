import admin from 'firebase-admin'
import serviceAccountKey from './serviceAccountKey.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount)
})
