import { h, render } from "@atomico/core";
import BaseElement from "@atomico/base-element";

export { h } from "@atomico/core";

let ID = 0;

let host = h("host");

export class Element extends BaseElement {
	constructor() {
		super();
		/**@type {boolean} */
		let prevent;
		/**
		 * @namespace
		 * @property {string} id - identifier to store the state of the virtual-dom
		 * @property {HTMLElement} bind - allows bindear events defining as context the same customElement
		 * @property {boolean} host - allows to enable control over the main container, in this case the customElement
		 */
		let options = {
			id: "@wc." + ID++,
			bind: this,
			host: true
		};

		this.render = this.render.bind(this);
		/**
		 * @param {Object<string,any>} - Properties to update the component
		 */
		this.update = props => {
			this.props = { ...this.props, ...props };
			if (!prevent) {
				prevent = true;
				this.mounted.then(() => {
					prevent = false;
					render(h(this.render, this.props), this, options);
				});
			}
		};

		this.unmounted.then(() => render(host, this, options));

		this.update();
	}
	render() {
		return host;
	}
}
/**
 * @param {Function} component
 * @example
 * // define a functional component
 * function MyWc(props){}
 * // define the observables of the component
 * MyWc.observables = {value:String}
 * // when using the toClass function the functional component will be a class
 * customElements.define("my-wc",createClass(MyWc));
 */
export function createClass(component) {
	let CustomElement = class extends Element {};
	CustomElement.prototype.render = component;
	CustomElement.observables = component.observables;
	return CustomElement;
}

export function customElement(tagName, component) {
	customElements.define(
		tagName,
		component instanceof Element ? component : createClass(component)
	);
}
