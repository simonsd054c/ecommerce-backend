// We will do three testings:
// 1. Super simple one
// 2. something that uses database
// 3. something that uses database and authorization header

const request = require("supertest")
const mongoose = require("mongoose")
const { app } = require("../src/server")

let token;

beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")

    const response = await request(app).post("/auth/login").send({
        username: "john123",
        password: "password"
    })
    token = response.body.token
})

afterAll(async () => {
    await mongoose.connection.close()
})

//1.
describe("Server homepage", () => {
    it("shows data sent message", async () => {
        const response = await request(app).get("/")
        //assertion
        expect(response.statusCode).toBe(200)
        expect(response.text).toEqual(expect.stringContaining("Data Sent"))
    })
})

//2.
describe("Gets Product", () => {
    it("gets product list", async () => {
        const response = await request(app).get("/products")
        expect(response.statusCode).toBe(200)
    })
})

//3.
describe("Create a Product", () => {
    it("creates a new product", async () => {
        const response = await request(app).post("/products")
        .set({ Authorization: `Bearer ${token}` })
        .send({
            title: "Very new product",
            description: "yes, it is a new product",
            price: 1000,
            stock: 5
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual("Very new product")
    })
})