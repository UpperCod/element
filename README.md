# @atomico/element

[![npm](https://badgen.net/npm/v/@atomico/element)](http://npmjs.com/@atomico/element)
[![gzip](https://badgen.net/bundlephobia/minzip/@atomico/element)](https://bundlephobia.com/result?p=@atomico/element)

It allows the creation of reactive web-components based on JSX, thanks to [@atomico/core](https://github.com/atomicojs/core) and [@atomico/base-element](https://github.com/atomicojs/base-element).

## instalacion

```bash
# scaffolding
npm init @atomico
# manual
npm install @atomico/core @atomico/element
```

```jsx
import { h, Element } from "@atomico/element";

class AtomicoCounter extends Element {
	static observables = {
		value: Number
	};
	render({ value = 0 }) {
		return (
			<host>
				<button onClick={() => this.value++}>Increment</button>
				<span>::{value}::</span>
				<button onClick={() => this.value--}>Decrement</button>
			</host>
		);
	}
}
customElements.define("atomico-counter", AtomicoCounter);
```

## Observation

`@atomico/element`, although it uses classes for the generation of web-components, the rendering behavior is functional, so you can use all the documented in [@atomico/core](https://github.com/atomicojs/core), like hooks and contexts.

## Advantage

### Functions like web-component

`createClass`, will create a class based on the function, the observable property `value`, will allow defining an initial state for `useState`, **Remember a web-component created with atomico/element should always return host `<host/>`**.

#### State with hooks

The custom Element with observables possess a transparent state control, the hooks allow to break this, the state will be private.

```jsx
import { useState } from "@atomico/core";
import { h, createClass } from "@atomico/element";

function MyWc({ value }) {
	let [state, setState] = useState(value);
	return (
		<host>
			<button onClick={() => setState(state + 1)}>Increment</button>
			<span>::{state}::</span>
			<button onClick={() => setState(state - 1)}>Decrement</button>
		</host>
	);
}

MyWc.observables = {
	value: Number
};

customElement.define("my-wc", createClass(MyWc));
```

#### State with observables

The `MyWc` function will become part of the class that makes up the customElement, occupying the place of the render method, only for this reason it can access the context this

```jsx
import { h, createClass } from "@atomico/element";

function MyWc({ value }) {
	return (
		<host>
			<button onClick={() => this.value+=1}>Increment</button>
			<span>::{state}::</span>
			<button onClick={() => this.value-=1)}>Decrement</button>
		</host>
	);
}

MyWc.observables = {
	value: Number
};

customElement.define("my-wc", createClass(MyWc));
```

### Hooks

Thanks to `@atomico/core` you can use [hooks](https://github.com/atomicojs/core#hooks) to abstract the logic of the web-component.

```jsx
class TagCounter extends Element {
	render() {
		let [state, setState] = useState(0);
		return (
			<host>
				<button onClick={() => setState(state - 1)}>Decrement</button>
				<span>::{state}::</span>
				<button onClick={() => setState(state + 1)}>Increment</button>
			</host>
		);
	}
}
```

### Not everything should be a web-component

In `@atomico/element` you can create reusable components out of the box of web-components, allowing to keep the pattern of [HoCs](https://reactjs.org/docs/higher-order-components.html) virtual without problems when composing views.

```jsx
function PrivateButton(props) {
	useEffect(() => {
		console.log("component private mounted");
	}, []);
	return <button {...props} />;
}

class PublicWebComponent extends Element {
	render() {
		return (
			<host>
				<PrivateButton>btn-1</PrivateButton>
				<PrivateButton>btn-2</PrivateButton>
			</host>
		);
	}
}
```

### Declarative shadowDom in the JSX

`@atomico/element`, the use of shadow Dom is not subject to be used only within a web-component, it can be applied to any html element that supports it.

```jsx
export function Title(props) {
	return (
		<h1 shadowDom>
			<style>{`
			@import url('https://fonts.googleapis.com/css?family=Montserrat');
			:host{font-family: 'Montserrat', sans-serif;}
			`}</style>
			{props.children}
		</h1>
	);
}
```

### tag host

`<host>` this tag allows you to directly point to the web-component, achieving a more declarative code

```jsx
class Tag extends Element {
	/**❌**/
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.style.background = "black";
		this.addEventListener("click", () => {
			console.log("event!");
		});
	}
	/**✔️**/
	render() {
		return (
			<host
				shadowDom
				onClick={() => console.log("event")}
				style={{ background: "black" }}
			/>
		);
	}
}
```

### Browser

This pkg format allows support in modern browsers, ideal for the development of prototypes, since browsers do not support JSX, `atomico/element` attaches [htm](https://github.com/developit/htm) to the bundle of export.

[**Open example in editor**](https://stackblitz.com/edit/atomico-element?file=index.js)

```js
import {
	Element,
	html
} from "https://unpkg.com/@atomico/element/browser?module";

class Counter extends Element {
	props = { value: 0 };
	static observables = {
		value: Number
	};
	increment() {
		this.value += 1;
	}
	decrement() {
		this.value -= 1;
	}
	render({ value }) {
		return html`
			<host shadowDom>
				<button onClick=${this.increment}>Increment</button>
				<span>::${value}::</span>
				<button onClick=${this.decrement}>Decrement</button>
			</host>
		`;
	}
}
```
