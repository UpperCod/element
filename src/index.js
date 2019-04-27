import { h, render } from "@atomico/core";
import BaseElement from "@atomico/base-element";
export * from "@atomico/core";

let ID = 0;

let host = h("host");

export class Element extends BaseElement {
	constructor() {
		super();
		let prevent;
		let options = {
			id: "@wc." + ID++,
			bind: this,
			host: true
		};
		this.render = this.render.bind(this);
		// create a unique id to store the atomico state.
		// allowing the use of tag <host> securely

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
