db = db.getSiblingDB('waa')
db.createUser({
  user: 'waasay',
  pwd: 'waasay',
  roles: [{ role: 'dbOwner', db: 'waa' }],
})
