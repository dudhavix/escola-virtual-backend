const { compareSync } = require("bcrypt");
const { hashSync } = require("bcrypt");

// const senha = hashSync("caxixe070910", 10);
// console.log(senha);

const valida = compareSync("senha123", "$2b$10$/TPj3QUbbsGmh/MU6QQXgepO.pukXGEqbH5II8Twc/O6mti/oPHqe")
console.log(valida);