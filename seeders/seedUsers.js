
db = db.getSiblingDB("Users");

db.createUser({
  user: "UsersUser",  
  pwd: "lhkiI1JA3HQqd3dh4bisal23",  
  roles: [
    { role: "readWrite", db: "Users" }  
  ]
});
db.Users.insertMany([
  {
    username: "Diego Agudelo",
    email: "diego_agudelo82191@elpoli.edu.co",
    password: "$2b$12$HwJLF.WgEw5rY7f7R4rSr.6z59nG/lZAmv55iq0Jq.2KwXebSDihC",
    dateCreated: "08/10/2024",
    dateModified: "08/10/2024",
    role: "admin",
    status: true
  },
]);