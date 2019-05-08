## @atomico/element

Permite unir [@atomico/core](https://github.com/atomicojs/core) a web-components de forma simple y expresiva

## ¿Que es Atomico?

Atomico es un proyecto [personal](https://github.com/uppercod) Open Source, que posee como misión simplificar la creación de interfaces sostenibles y escalables con un mínimo impacto en los recursos del navegador.

## Desde React a web-component con Atomico

No olvidemos que estas bibliotecas son similares en api, pero la orientación de Atomico es fomentar el uso de web-components con o sin Atomico, ya que los web-components son agnosticos a framework o librerias.

![full](https://res.cloudinary.com/dz0i8dmpt/image/upload/v1557340605/github/atomico-element/full.png)

### diferencias de Importación

![import](https://res.cloudinary.com/dz0i8dmpt/image/upload/v1557340605/github/atomico-element/import.png)

ud necesitara 2 importaciones, [@atomico/element](https://github.com/atomicojs/element) este permite trabajar con web-components y [@atomico/core](https://github.com/atomicojs/core) que posee el soporte a hooks, contexto, HoCs, virtual-dom y más.

### Componente a web-component

![component](https://res.cloudinary.com/dz0i8dmpt/image/upload/v1557340605/github/atomico-element/component.png)

**Atomico permite ambas sintaxis**, por lo que ud podra usar componentes y web-components de forma conjunta, pero ahora nos centramos en la creación de web-components

### fragmento a host

Atomico no posee soporte a fragmentos, pero para mejorar la experiencia de desarrollo Atomico crea el tag `<host>`, este posee un efecto similar al selector de css `:host{}`

El tag `<host>` trae mejores beneficios, ya que permite manipular propiedades y atributos del web-component desde el mismo JSX, la siguiente imagen enseña un la diferencia entre un web-component vainilla y el tag host de atomico, para comprender su beneficio y equivalencia.

![host](https://res.cloudinary.com/dz0i8dmpt/image/upload/v1557340605/github/atomico-element/host.png)

### Render a customElement

![render](https://res.cloudinary.com/dz0i8dmpt/image/upload/v1557340605/github/atomico-element/render.png)

render permite apuntar el componente hacia un nodo del documento, customElement permite asociar su función a un web-component, por lo que ud solo deberá invocar el web-component desde el HTML, React o Vue, sin preocuparse pro especificar el nodo.

## definición de observables

Lo anteriormente expuesto enseña lo similar, los `obserbables` son la capa de Atomico para definir propiedades y atributos del web-component, para identificar los tipos y forzarlos si provienen de un `string` Atómico hace uso de las declaraciones como `Number`, `String`, `Boolean`, `Object`, `Array`, `Function` y `Promise`, para definir los tipos de las propiedades y atributos.

![observables](https://res.cloudinary.com/dz0i8dmpt/image/upload/v1557340605/github/atomico-element/observables.png)

todo atributo se define como propiedad por lo que ud podrá hacer uso de `document.querySelector("my-wc").value = "new value"` para su definición.

los observables no se limitan solo a una propiedad ud puede crear conjuntos mas complejos.

```js
MyWc.observables = {
	isChecked: Boolean, //html: <my-wc is-checked/>
	value: String, //html: <my-wc value='....'/>
	id: Number, //html: <my-wc id='10'/>
	data: Object //html: <my-wc data='{"name":"atomico"}'/>
};
```

## Ejemplos

### Simple shop

Este pequeño ejemplo se creo mediante el uso de `npm init @atomico`, es un fuente para el aprendizaje de para el desarrollo de aplicaciones PWA con Atomico.

[![simple shop](https://res.cloudinary.com/dz0i8dmpt/image/upload/v1557340605/github/simple-shop.png)](https://atomicojs.github.io/examples/atomico-store/public/)
