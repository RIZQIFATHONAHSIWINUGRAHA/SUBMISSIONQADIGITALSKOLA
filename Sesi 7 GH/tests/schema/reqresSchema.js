const schema_createnewuser = {
    type: "object",
    properties: {
      id: { type: "string" }, // ✅ API mengembalikan id sebagai string
      name: { type: "string" }, // ✅ Ganti "title" menjadi "name" sesuai API
      job: { type: "string" }, // ✅ Tambahkan "job" karena ada di respons API
      createdAt: { type: "string" } // ✅ Tambahkan "createdAt" karena ada di respons API
    },
    required: ["id", "name", "job", "createdAt"], // ✅ Sesuaikan dengan respons API
  };
export default schema_createnewuser;
