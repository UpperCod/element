# @atomico/element

`@atomico/element` allows the creation of web-components based on `@atomico/core`.

```jsx
import { Element } from "@atomico/element"
import { h } from "@atomico/core"

function MyTag(props){
    return <host>Hello word</host>
}

customElements.define("my-tag", class extends Element{
    static component = MyTag
})
```

## Element

Element class provides the following interface to manage the web-component.

```jsx
class Element extends HTMLElement {
    /**
     * it allows updating and dispatching updates of the props associated with the web-component.
     * @param {string|object} property - name of the index or indices to be defined within this.props
     * @param {value} [value] - if it is property string, value allows to define the state of the index.
     */
    set(property, value) {}

    /**
     * Defines the observable attributes of the web-component, each time one of these attributes
     * change, the web-component will dispatch a new state of view.
     */
    static attributes = {
        /**
         * @param {string} newValue -  value to be analyzed by the function
         * @param {any} value - existing value within this.props
         * @param {string} property -   property to work within this.props
         */
        name(newValue, value, property) {}
    };
    /**
     * @function
     * @param {object} props - the component will receive the props collected by the web-component
     * @return {object}
     * @example the return of the component should always be the host tag
     * <host/>
     */
    render(props){
        return <host/>
    }
}
```

## type

Returns a function that reads the mutation of the attributes of the web-component, this function allows to validate the existence and modify the value.

```js
type(
    /**
    * @param {string} type - define the type of variable to accept as an attribute
    * @param {boolean} [required] - define if it is a required attribute
    */
    {
        type: "string",
        required: true
    }
);
```


## Example

The following example shows how to define types using type, this function will analyze the attributes defined in web-component, to format it to work by component

```jsx
import { h } from "@atomico/core";
import { Element, type } from "@atomico/element";

class MyTag extends Element {
    static attributes = {
        json: type({ type: "object" }),
        array: type({ type: "object" }),
        number: type({ type: "number" })
    };
    render(props) {
        console.log(props);
        return <host>Hello word</host>;
    }
}

customElements.define("my-tag", MyTag);
```