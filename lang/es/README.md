# @atomico/element

Esta clase permite la creación de web-components a base de [@atomico/core].

```jsx
import { h } from "@atomico/core";
import Element from "@atomico/element";

class MyTag extends Element {
	static attributes = {
		value: String
	};
	render(props) {
		return <host>Hello {props.value}</host>;
	}
}

customElements.define("my-tag", MyTag);
```

## render

render equivale a la instancia funcional de un componente dentro de  `@atomico/core`, por lo que ud podrá hacer uso de los hooks.

render recibe como primer parámetro una la ultima instantánea de `this.props`, **render siembre debe retornar el tag `<host/>`**

## static attributes

permite crear atributos observables por el componente, si bien los atributos dentro del web-componente se expresan como String, `@atomico/element` fuerza la definición del tipo sobre la String transformándolo al tipo definido dentro de `static attributes`

## Tipos de atributos

### String
```js
static attributes = {value:String};
```
### Number
```js
static attributes = {value:Number};
```
### Boolean
```js
static attributes = {value:Boolean};
```
### Object
```js
static attributes = {value:Object};
```
### Array
```js
static attributes = {value:Array};
```
> si el tipo no concuerda con el valor de entrada, se emitirá un error que define el atributo y el tipo esperado.

## update

Este método permite forzar una actualización sobre render, a su ver permite un primer argumento que extiende  a `this.props`

Ud puede usar este método para la creación de propiedades reactivas.



```jsx
import { h } from "@atomico/core";
import Element from "@atomico/element";

class MyTag extends Element {
	get show() {
		return this.props.show;
	}
	set show(value) {
		this.update({ show: true });
	}
	render(props) {
		return <host>{props.show && "👋"}</host>;
	}
}

customElements.define("my-tag", MyTag);
```



