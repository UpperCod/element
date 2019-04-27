import { Element, h, useEffect } from "../src/index";

class CustomElement extends Element {
	static observables = {
		fieldString: String,
		fieldNumber: Number,
		fieldBoolean: Boolean,
		fieldObject: Object,
		fieldArray: Array
	};
	render() {
		return (
			<host>
				<h1>hola</h1>
			</host>
		);
	}
}

customElements.define("custom-element", CustomElement);

function scope(html) {
	let scope = document.createElement("div");

	scope.innerHTML = html;

	document.body.appendChild(scope);

	return scope.querySelector("*");
}

describe("Element Lifecycle", () => {
	it("Test field type string", async done => {
		let node = scope(`<custom-element field-string="hello"></custom-element>`);

		await node.mounted;

		expect(node.fieldString).toBe("hello");

		done();
	});
	it("Test field type number", async done => {
		let node = scope(`<custom-element field-number="100"></custom-element>`);

		await node.mounted;

		expect(node.fieldNumber).toBe(100);

		done();
	});
	it("Test field type boolean", async done => {
		let node = scope(`<custom-element field-boolean></custom-element>`);

		await node.mounted;

		expect(node.fieldBoolean).toBe(true);

		done();
	});
	it("Test field type object", async done => {
		let node = scope(
			`<custom-element field-object='{"field":true}'></custom-element>`
		);

		await node.mounted;

		expect(node.fieldObject).toEqual({ field: true });

		done();
	});

	it("Test field type array", async done => {
		let node = scope(`<custom-element></custom-element>`);

		await node.mounted;

		expect(node.innerHTML).toBe("<h1>hola</h1>");

		done();
	});
});
