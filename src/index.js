import { h, render } from "@atomico/core";

let defer = Promise.resolve();

let ID = 0;

let host = h("host");

function parse(value) {
	return JSON.parse(value);
}

export default class Element extends HTMLElement {
	constructor() {
		super();
		let prevent;

		this.props = {};
		this.render = this.render.bind(this);
		this.renderID = "@wc." + ID++;
		this.update = props => {
			this.props = { ...this.props, ...props };
			if (!prevent) {
				prevent = true;
				defer.then(() => {
					prevent = false;
					render(h(this.render, this.props), this, this.renderID);
				});
			}
		};
	}
	static get observedAttributes() {
		let attributes = this.attributes || {},
			keys = [];
		for (let key in attributes) {
			keys.push(key.replace(/([A-Z])/g, "-$1").toLowerCase());
		}
		return keys;
	}
	disconnectedCallback() {
		render(host, this, this.renderID);
	}
	attributeChangedCallback(name, oldValue, value) {
		if (oldValue == value) return;
		name = name.replace(/-(\w)/g, (all, letter) => letter.toUpperCase());
		let { attributes } = this.constructor,
			error,
			type = attributes[name];
		try {
			switch (type) {
				case Number:
					value = parse(value);
					break;
				case Boolean:
					value = value == "" ? true : parse(value);
					value = value == 1 || value == 0 ? value == 1 : value;
					break;
				case Object:
				case Array:
					value = parse(value);
					break;
			}
		} catch (e) {
			error = true;
		}
		if (!error && {}.toString.call(value) == `[object ${type.name}]`) {
			this.update({ [name]: value });
		} else {
			throw `the attribute [${name}] must be of the type [${type.name}]`;
		}
	}
	render() {
		return host;
	}
}
