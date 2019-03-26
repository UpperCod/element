import { h, render } from "@atomico/core";

let defer = Promise.resolve();

let ID = 0;

export function type(schema) {
	return (value, prevValue, field) => {
		if (schema.required && value == null)
			throw new Error(`the attribute ${field} is required`);
		value =
			schema.type == "string"
				? value
				: schema.type == "boolean"
				? true
				: JSON.parse(value);

		if (typeof value != schema.type) {
			throw new Error(`the field ${field} must be of the type ${schema.type}`);
		}
		return value;
	};
}

export class Element extends HTMLElement {
	constructor() {
		super();
		let state = "@wc." + ID++,
			{ attributes } = this.constructor,
			props = (this.props = {}),
			prevent;

		this.set = (name, nextValue) => {
			if (typeof name == "object" && nextValue == null) {
				for (let key in name) this.set(key, name[key]);
				return;
			}
			let alias = name.replace(/-(\w)/g, (all, chart) => chart.toUpperCase());

			if (attributes[name]) {
				nextValue = attributes[name](nextValue, props[alias], name);
			}
			if (props[alias] == nextValue) return;
			props[name] = nextValue;
			if (!prevent && this.mounted) {
				prevent = true;
				defer.then(() => {
					prevent = false;
					this.update(props);
				});
			}
		};
		this.render = this.render.bind(this);
		this.update = props => {
			render(props ? h(this.render, props) : h("host"), this, state);
		};
		this.setup = () => {
			this.mounted = true;
			for (let key in attributes) this.set(key, this.getAttribute(key));
			this.update(props);
		};
	}
	static get observedAttributes() {
		return Object.keys(this.attributes || {});
	}
	connectedCallback() {
		this.setup();
	}
	disconnectedCallback() {
		this.update(null);
	}
	attributeChangedCallback(name, prevValue, nextValue) {
		this.set(name, nextValue);
	}
	render() {
		return h("host");
	}
}
