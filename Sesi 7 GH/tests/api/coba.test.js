import fetch from "node-fetch";
import { expect } from "chai";
import Ajv from "ajv";
import schema_createnewuser from "../schema/reqresSchema.js";
describe("API Test Suite Coba", function () {
  const baseURL = "http://reqres.in";
  // Dibawa Cara API GET
  it("Get single user", async function () {
    // tembak url reqres
    const hasil = await fetch("http://reqres.in/api/user/2");
    // validasi http statusnya harus 200
    expect(hasil.status, "Ada yang salah nih").to.equal(200);
  });
  // Dibawa Cara API POST
  it("Create new user", async function () {
    const newPost = {
      name: "Morpheus",
      job: "leader",
    };
    const hasilPost = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });
    expect(hasilPost.status, "Gagal ini").to.equals(201);
    //validasi json schema
    const ajv = new Ajv();
    const data = await hasilPost.json();
    const cekcek = ajv.compile(schema_createnewuser);
    const hasil_schema = cekcek(data);

    expect(hasil_schema).to.be.true;
  });
});
