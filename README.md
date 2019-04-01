# @atomico/element

This class allows the creation of web-components based on [@atomico/core](https://github.com/atomicojs/core).

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

render is equivalent to the functional instance of a component inside `@atomico/core`, so you can use the hooks.

render receives as the first parameter a last snapshot of `this.props`, **render must return the tag `<host/>`**

## static attributes

allows to create attributes observable by the component, although the attributes within the web-component are expressed as String, `@atomico/element` force the definition of the type on the String transforming it to the type defined within `static attributes`.

## Types of attributes

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
> if the type does not match the input value, an error will be issued that defines the attribute and the expected type.

## update

This method allows to force an update on render, to its see allows a first argument that extends to `this.props`.

You can use this method for the creation of reactive properties.

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



