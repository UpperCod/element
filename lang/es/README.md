# @atomico/element

[![npm](https://badgen.net/npm/v/@atomico/element)](http://npmjs.com/@atomico/element)
[![gzip](https://badgen.net/bundlephobia/minzip/@atomico/element)](https://bundlephobia.com/result?p=@atomico/element)

Permite la creacion de web-components reactivos a base de JSX, gracias a [@atomico/core](https://github.com/atomicojs/core) y [@atomico/base-element](https://github.com/atomicojs/base-element).

```jsx
let { Element, h } = this["@atomico/element"];

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

## Observacion

`@atomico/element`, si bien utiliza clases para la generación de web-components, el comportamiento de render es funcional, por lo que ud puede usar todos lo documentado en [@atomico/core](https://github.com/atomicojs/core), como hooks y contextos.

## Ventajas

## Hooks

Gracias a `@atomico/core` ud podra usar [hooks](https://github.com/atomicojs/core#hooks) para abstraer la lógica del web-component.

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

## No todo debe ser un web-component

En `@atomico/element` ud puede crear componentes reutilizables fuera de la caja de web-components, permitiendo mantener el patrón de [HoCs](https://reactjs.org/docs/higher-order-components.html) virtual sin problemas al momento de componer vistas.

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

### shadowDom declarativo en el JSX

`@atomico/element`, el uso del shadowDom no esta sujeto a usarcé solo dentro de un web-component, puede ser aplicado a cualquier elemento html que lo soporte.

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

`<host>` este tag permite apuntar directamente al web-component, logrando un código mas declarativo

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
