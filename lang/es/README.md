# @atomico/element

**Atomico/element** permite la creación de web-components a base de `@atomico/core`.

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

la clase Element entrega la siguiente interfaz para gestionar del web-component.

```jsx
class Element extends HTMLElement {
    /**
     * permite actualizar y despachar actualizaciones de los props asociados al web-component.
     * @param {string|object} property - nombre del indice o indices a definir dentro de this.props
     * @param {value} [value] - de ser property string, value permite definir el estado del indice.
     */
    set(property, value) {}

    /**
     * Define los atributos observables del web-component, cada vez que uno de estos atributos
     * cambie, el web-component despachara un nuevo estado de la vista.
     */
    static attributes = {
        /**
         * @param {string} newValue -  valor a ser analizado por la función
         * @param {any} value - valor existente dentro de this.props
         * @param {string} property - propiedad a trabajar dentro de this.props
         */
        name(newValue, value, property) {}
    };
    /**
     * @function
     * @param {object} props - el componente recibirá los props recolectados por el web-component
     * @return {object}
     * @example el retorno de el componente siempre debe ser el tag host
     * <host/>
     */
    render(props){
        return <host/>
    }
}
```

## type

Retorna una función que lee la mutación de los atributos del web-component, esta función permite validar la existencia y modificar el valor.

```js
type(
    /**
    * @param {string} type - define el tipo de variable a aceptar como atributo
    * @param {boolean} [required] - define si es un atributo obligatorio
    */
    {
        type: "string",
        required: true
    }
);
```

> la exportación de type es opcional.

## Ejemplo 

El siguiente ejemplo muestra como definir tipos usando type, esta función analizara los atributos definidos en en web-component, para darle el formato a trabajar por component

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

