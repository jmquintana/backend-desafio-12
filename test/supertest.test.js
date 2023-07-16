import chai from "chai";
import supertest from "supertest";
import { generateProduct } from "../src/utils.js";

const expect = chai.expect;
const request = supertest("http://localhost:3000");

describe("Testing e-commerce", () => {
	it("GET /api/products", async () => {
		const { _body } = await request.get("/api/products");
		expect(_body.payload.products).to.be.an("array");
	});

	// get a prooduct with the pid as ObjectId Type
	it("GET /api/products/:pid", async () => {
		const { _body } = await request.get(
			"/api/products/6434bd61219c3cecfbedd5c0"
		);
		expect(_body.payload).to.be.an("object");
	});

	it("POST /api/products", async () => {
		const newProduct = generateProduct();

		const { _body } = await request
			.post("/api/products")
			.field("title", newProduct.title)
			.field("description", newProduct.description)
			.field("category", newProduct.category)
			.field("code", newProduct.code)
			.field("price", newProduct.price)
			.field("stock", newProduct.stock)
			.field("thumbnails", newProduct.thumbnails);
		expect(_body.message).to.equal(`Product added`);
	});

	it("PUT /api/products/:pid", async () => {
		// generate random product changes
		const changes = generateProduct();

		const { _body } = await request
			.put("/api/products/643c14145438614667e36dd9")
			.field("title", changes.title)
			.field("description", changes.description)
			.field("category", changes.category)
			.field("code", changes.code)
			.field("price", changes.price)
			.field("stock", changes.stock)
			.field("thumbnails", changes.thumbnails);

		// check status = success
		expect(_body.status).to.equal("Success");
	});

	it("DELETE /api/products/:id", async () => {
		const { _body } = await request.delete(
			"/api/products/643c14145438614667e36de8"
		);
		expect(_body.status).to.equal("Success");
	});
});

console.clear();
