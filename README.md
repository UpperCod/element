# @atomico/element

[![npm](https://badgen.net/npm/v/@atomico/element)](http://npmjs.com/@atomico/element)
[![gzip](https://badgen.net/bundlephobia/minzip/@atomico/element)](https://bundlephobia.com/result?p=@atomico/element)

It allows the creation of reactive web-components based on JSX, thanks to [@atomico/core](https://github.com/atomicojs/core) and [@atomico/base-element](https://github.com/atomicojs/base-element).

```jsx
import { Element, h } from "@atomico/element";

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

`@atomico/element`, although it uses classes for the generation of web-components, the rendering behavior is functional, so you can use all the documented in [@atomico/core](https://github.com/atomicojs/core), as hooks and contexts.

## Advantage

## Hooks

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

## Not everything should be a web-component

In `@atomico/element` you can create reusable components out of the box of web-components, allowing to keep the pattern of [HoCs](https://reactjs.org/docs/higher-order-components.html) virtual without problems when composing views.

```jsx
function PrivateButton(props) {
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
