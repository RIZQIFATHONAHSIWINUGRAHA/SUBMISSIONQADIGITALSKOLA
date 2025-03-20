const { kalkulator } = require("./rumus");
const readline = require("readline");

const inputUser = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

inputUser.question("Masukkan Angka Pertama: ", (angka1) => {
  inputUser.question("Masukkan Angka Kedua: ", (angka2) => {
    inputUser.question("Masukkan Operator (+,-,%,*) : ", (operator) => {
      console.log(
        `Hasil : ${kalkulator(
          parseFloat(angka1),
          parseFloat(angka2),
          operator
        )}`
      );
      inputUser.close();
    });
  });
});
