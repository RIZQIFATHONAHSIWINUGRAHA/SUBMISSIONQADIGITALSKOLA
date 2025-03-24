import fetch from "node-fetch";
import { expect } from "chai";
import Ajv from "ajv";

const baseURL = "https://reqres.in";
const ajv = new Ajv();

// Schema untuk GET
const schema_getUser = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        id: { type: "integer" },
        email: { type: "string" },
        first_name: { type: "string" },
        last_name: { type: "string" },
        avatar: { type: "string" },
      },
      required: ["id", "email", "first_name", "last_name", "avatar"],
    },
  },
  required: ["data"],
};

// Schema untuk POST
const schema_createUser = {
  type: "object",
  properties: {
    name: { type: "string" },
    job: { type: "string" },
    id: { type: "string" },
    createdAt: { type: "string" },
  },
  required: ["name", "job", "id", "createdAt"],
};

describe("API Test Suite", function () {
  it("GET Single User - Validasi JSON Schema", async function () {
    const response = await fetch(`${baseURL}/api/users/2`);
    const data = await response.json();

    expect(response.status).to.equal(200);

    const cekcek = ajv.compile(schema_getUser);
    const hasil_schema = cekcek(data);

    expect(hasil_schema).to.be.true;
  });

  it("POST Create User - Validasi JSON Schema", async function () {
    const newUser = {
      name: "Morpheus",
      job: "Leader",
    };

    const response = await fetch(`${baseURL}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const data = await response.json();

    expect(response.status).to.equal(201);

    const cekcek = ajv.compile(schema_createUser);
    const hasil_schema = cekcek(data);

    expect(hasil_schema).to.be.true;
  });
});
