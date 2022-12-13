<a href="https://www.gotoiot.com/">
    <img src="doc/gotoiot-logo.png" alt="logo" title="Goto IoT" align="right" width="60" height="60" />
</a>

Web App Full Stack Base
=======================

*Ayudaría mucho si apoyaras este proyecto con una ⭐ en Github!*

Este proyecto es una aplicación web fullstack que se ejecuta sobre el ecosistema `Docker`. Está compuesta por un compilador de `TypeScript` que te permite utilizar este superset de JavaScript para poder programar un `cliente web`. También tiene un servicio en `NodeJS` que te permite ejecutar código en backend y al mismo tiempo disponibilizar el código del cliente web para interactar con el servicio. Además tiene una `base de datos` MySQL que puede interactuar con el backend para guardar y consultar datos, y de manera adicional trae un `administrador` de base de datos para poder administrar la base en caso que lo necesites.

La aplicación IoT de base que viene con este proyecto se encarga de crear una tabla llamada `Devices` en la base de datos, y la idea es que vos puedas desarrollar el código de backend y frontend que te permita controlar desde el navegador el estado de los devices de un hogar inteligente - *como pueden ser luces, TVs, ventiladores, persianas, enchufes y otros* - y almacenar los estados de cada uno en la base de datos. 

Realizando estas tareas vas a a tener una aplicación fullstack IoT del mundo real que utiliza tecnologías actuales en la que un backend es capaz de interactuar con una DB para cumplir con las peticiones de control que se le mandan desde el cliente web.

En esta imagen podés ver una posible implementación del cliente web que controla los artefactos del hogar.

![architecture](doc/webapp-example-1.png)

## Comenzando 🚀

Esta sección es una guía con los pasos escenciales para que puedas poner en marcha la aplicación.

<details><summary><b>Mira los pasos necesarios</b></summary><br>

### Instalar las dependencias

Para correr este proyecto es necesario que instales `Docker` y `Docker Compose`. 

En [este artículo](https://www.gotoiot.com/pages/articles/docker_installation_linux/) publicado en nuestra web están los detalles para instalar Docker y Docker Compose en una máquina Linux. Si querés instalar ambas herramientas en una Raspberry Pi podés seguir [este artículo](https://www.gotoiot.com/pages/articles/rpi_docker_installation) de nuestra web que te muestra todos los pasos necesarios.

En caso que quieras instalar las herramientas en otra plataforma o tengas algún incoveniente, podes leer la documentación oficial de [Docker](https://docs.docker.com/get-docker/) y también la de [Docker Compose](https://docs.docker.com/compose/install/).

Continua con la descarga del código cuando tengas las dependencias instaladas y funcionando.

### Descargar el código

Para descargar el código, lo más conveniente es que realices un `fork` de este proyecto a tu cuenta personal haciendo click en [este link](https://github.com/gotoiot/app-fullstack-base/fork). Una vez que ya tengas el fork a tu cuenta, descargalo con este comando (acordate de poner tu usuario en el link):

```
git clone https://github.com/USER/app-fullstack-base.git
```

> En caso que no tengas una cuenta en Github podes clonar directamente este repo.

### Ejecutar la aplicación

Para ejecutar la aplicación tenes que correr el comando `docker-compose up` desde la raíz del proyecto. Este comando va a descargar las imágenes de Docker de node, de typescript, de la base datos y del admin de la DB, y luego ponerlas en funcionamiento. 

Para acceder al cliente web ingresa a a la URL [http://localhost:8000/](http://localhost:8000/) y para acceder al admin de la DB accedé a [localhost:8001/](http://localhost:8001/). 

Si pudiste acceder al cliente web y al administrador significa que la aplicación se encuentra corriendo bien. 

> Si te aparece un error la primera vez que corres la app, deteńe el proceso y volvé a iniciarla. Esto es debido a que el backend espera que la DB esté creada al iniciar, y en la primera ejecución puede no alcanzar a crearse. A partir de la segunda vez el problema queda solucionado.

</details>

Continuá explorando el proyecto una vez que lo tengas funcionando.

## Configuraciones de funcionamiento 🔩

Al crearse la aplicación se ejecutan los contenedores de Docker de cada servicio, se crea la base de datos y sus tablas. A continuación podés encontrar info si querés cambiar la estructura de la DB o bien sus configuraciones de acceso.

<details><summary><b>Lee cómo configurar la aplicación</b></summary><br>

### Configuración de la DB

Como ya comprobaste, para acceder PHPMyAdmin tenés que ingresar en la URL [localhost:8001/](http://localhost:8001/). En el login del administrador, el usuario para acceder a la db es `root` y contraseña es la variable `MYSQL_ROOT_PASSWORD` del archivo `docker-compose.yml`.

Para el caso del servicio de NodeJS que se comunica con la DB fijate que en el archivo `src/backend/mysql-connector.js` están los datos de acceso para ingresar a la base.

Si quisieras cambiar la contraseña, puertos, hostname u otras configuraciones de la DB deberías primero modificar el servicio de la DB en el archivo `docker-compose.yml` y luego actualizar las configuraciones para acceder desde PHPMyAdmin y el servicio de NodeJS.

### Estructura de la DB

Al iniciar el servicio de la base de datos, si esta no está creada toma el archivo que se encuentra en `db/dumps/smart_home.sql` para crear la base de datos automáticamente.

En ese archivo está la configuración de la tabla `Devices` y otras configuraciones más. Si quisieras cambiar algunas configuraciones deberías modificar este archivo y crear nuevamente la base de datos para que se tomen en cuenta los cambios.

Tené en cuenta que la base de datos se crea con permisos de superusuario por lo que no podrías borrar el directorio con tu usuario de sistema, para eso debés hacerlo con permisos de administrador. En ese caso podés ejecutar el comando `sudo rm -r db/data` para borrar el directorio completo.

</details>


## Detalles principales 🔍

En esta sección vas a encontrar las características más relevantes del proyecto.

<details><summary><b>Mira los detalles más importantes de la aplicación</b></summary><br>
<br>

### Arquitectura de la aplicación

Como ya pudiste ver, la aplicación se ejecuta sobre el ecosistema Docker, y en esta imagen podés ver el diagrama de arquitectura.

![architecture](doc/architecture.png)

### El cliente web

El cliente web es una Single Page Application que se comunica con el servicio en NodeJS mediante JSON a través de requests HTTP. Puede consultar el estado de dispositivos en la base de datos (por medio del servicio en NodeJS) y también cambiar el estado de los mismos. Los estilos del código están basados en **Material Design**.

### El servicio web

El servicio en **NodeJS** posee distintos endpoints para comunicarse con el cliente web mediante requests HTTP enviando **JSON** en cada transacción. Procesando estos requests es capaz de comunicarse con la base de datos para consultar y controlar el estado de los dispositivos, y devolverle una respuesta al cliente web también en formato JSON. Así mismo el servicio es capaz de servir el código del cliente web.

### La base de datos

La base de datos se comunica con el servicio de NodeJS y permite almacenar el estado de los dispositivos en la tabla **Devices**. Ejecuta un motor **MySQL versión 5.7** y permite que la comunicación con sus clientes pueda realizarse usando usuario y contraseña en texto plano. En versiones posteriores es necesario brindar claves de acceso, por este motivo la versión 5.7 es bastante utilizada para fases de desarrollo.

### El administrador de la DB

Para esta aplicación se usa **PHPMyAdmin**, que es un administrador de base de datos web muy utilizado y que podés utilizar en caso que quieras realizar operaciones con la base, como crear tablas, modificar columnas, hacer consultas y otras cosas más.

### El compilador de TypeScript

**TypeScript** es un lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft. Es un superconjunto de JavaScript, que esencialmente añade tipos estáticos y objetos basados en clases. Para esta aplicación se usa un compilador de TypeScript basado en una imagen de [Harmish](https://hub.docker.com/r/harmish) en Dockerhub, y está configurado para monitorear en tiempo real los cambios que se realizan sobre el directorio **src/frontend/ts** y automáticamente generar código compilado a JavaScript en el directorio  **src/frontend/js**. Los mensajes del compilador aparecen automáticamente en la terminal al ejecutar el comando **docker-compose up**.

### Ejecución de servicios

Los servicios de la aplicación se ejecutan sobre **contenedores de Docker**, así se pueden desplegar de igual manera en diferentes plataformas. Los detalles sobre cómo funcionan los servicios los podés ver directamente en el archivo **docker-compose.yml**.

### Organización del proyecto

En la siguiente ilustración podés ver cómo está organizado el proyecto para que tengas en claro qué cosas hay en cada lugar.

```sh
├── db                          # directorio de la DB
│   ├── data                    # estructura y datos de la DB
│   └── dumps                   # directorio de estructuras de la DB
│       └── smart_home.sql      # estructura con la base de datos "smart_home"
├── doc                         # documentacion general del proyecto
└── src                         # directorio codigo fuente
│   ├── backend                 # directorio para el backend de la aplicacion
│   │   ├── index.js            # codigo principal del backend
│   │   ├── mysql-connector.js  # codigo de conexion a la base de datos
│   │   ├── package.json        # configuracion de proyecto NodeJS
│   │   └── package-lock.json   # configuracion de proyecto NodeJS
│   └── frontend                # directorio para el frontend de la aplicacion
│       ├── js                  # codigo javascript que se compila automáticamente
│       ├── static              # donde alojan archivos de estilos, imagenes, fuentes, etc.
│       ├── ts                  # donde se encuentra el codigo TypeScript a desarrollar
│       └── index.html          # archivo principal del cliente HTML
├── docker-compose.yml          # archivo donde se aloja la configuracion completa
├── README.md                   # este archivo
├── CHANGELOG.md                # archivo para guardar los cambios del proyecto
├── LICENSE.md                  # licencia del proyecto
```

> No olvides ir poniendo tus cambios en el archivo `CHANGELOG.md` a medida que avanzas en el proyecto.

</details>

## Detalles de implementación 💻

En esta sección podés ver los detalles específicos de funcionamiento del código y que son los siguientes.

<details><summary><b>Mira los detalles de implementación</b></summary><br>

### Agregar un dispositivo

Se puede agregar un dispositivo tanto desde el Frontend como del Backend.

**Usando el Frontend:**
1. Ingresar al sitio de la SPA.
2. Hacer clic en el botón "AGREGAR". Se abrirá una caja con un formulario.
3. Completar los datos del nuevo dispositivo: *ID*, *Nombre*, *Tipo de Dispositivo*, y *Descripción del Dispositivo*.
4. Hacer clic en "AGREGAR" de la caja de formulario.
5. Se recibe un mensaje de confirmación o de error.

**Nota:** En la versión actual, la ID debe seleccionarse manualmente. En caso de ya existir en la memoria del sistema, se presentará un mensaje de error.


**Usando el Backend:**
1. Se debe enviar un mensaje JSON en una solicitud HTTP con el método PUT a url/addDevice/
2. Se recibe un mensaje de confirmación o de error.

**Nota:** En la versión actual, la ID debe seleccionarse manualmente. En caso de ya existir en la memoria del sistema, se presentará un mensaje de error.

### Frontend

Al cargar la página por primera vez, se debe solicitar la lista actualizada de dispositivos haciendo clic en el botón **"Actualizar Lista"**. Para obtener los datos de esta lista, se hace una solicitud al backend con un GET al endpoint /devices/. Aquí se obtiene la lista de **todos** los dispositivos.

**Botones y funcionalidades:**
- **ACTUALIZAR LISTA:** Refresca la lista de dispositivos actualmente en el sistema. En esta lista puede verse el *Nombre*, *Descripción*, *Tipo (imagen)*, y *Estado del Dispositivo*. En esta lista también se pueden editar y eliminar dispositivos. Para obtener los datos de esta lista, se hace una solicitud al backend con un GET al endpoint /devices/.

- **AGREGAR:** Este botón abre una caja de un formulario para ingresar los datos de un nuevo dispositivo. El dispositivo que se inserta aquí es enviado al Backend en un JSON por medio de una solicitud POST al endpoint /addDevice/.

- **EDITAR:** Este botón abre una caja de un formulario de edición, dónde se pueden editar los valores de *Nombre*, *Descripción* y *Tipo*. Las ediciones son enviadas en un JSON al backend por medio de una solicitud PUT al endpoint /editdevice/.

- **ELIMINAR:** Este botón permite eliminar el dispositivo definitivamente. Luego de hacer clic, se abre un cuadro de confirmación y si se acepta, se elimina el dispositivo y se refresca la lista. El dispositivo también se elimina en el backend, por medio de un JSON que se envía por método DELETE al endpoint /deletedevice/.


**Otras funciones**
- Los cambios de estado ("State") en el Frontend también son enviados al Backend por medio de un JSON al endpoint /changestate/.
- La lista de dispositivos se actualiza automáticamente luego de realizar un cambio, o de agregar/eliminar un dispositivo.

### Backend

El backend en esta versión mantiene los datos en memoria y no utiliza una base de datos para su almacenamiento (*Próximo a implementar*). Sin embargo, puede cumplir con todas las tareas de agregar, modificar y eliminar dispositivos, así como interactuar con el estado del dispositivo desde el Frontend. Estas interacciones entre el Frontend y el Backend se realizan por medio de archivos JSON que se envían a través de solicitudes HTTP a la API (REST). También se permite en muchos casos interactuar directamente con el backend.

<details><summary><b>Ver los endpoints disponibles</b></summary><br>

1) Devolver la información de los dispositivos (/devices/).

```json
{
    "method": "get",
    "request_headers": "application/json",
    "request_body": "",
    "response_code": 200,
    "response_body": 
        [
            { "id": 1, "name": "Lámpara 1", "description": "Luz Living", "state": 1, "type": 0 },
            { "id": 2, "name": "Lámpara 2", "description": "Luz Cocina", "state": 0, "type": 0 },
            { "id": 3, "name": "Velador", "description": "Velador Living", "state": 1, "type": 0 }
        ]
}
```

2) Devolver la información de un dispositivo en particular.

**Endpoint:** /devices/

2.1) URL (/devices/:id)
    Se coloca en la URL la ID del dispositivo del cual se quiere obtener información. Por ejemplo: */devices/1* devolverá un JSON con la información del dispositivo 1:

    ```json
    [
        { "id": 1, "name": "Lámpara 1", "description": "Luz Living", "state": 1, "type": 0 }
    ]
    ```

2.2) El método preferido es con un JSON, que también es el que utiliza el Frontend:

```json
{
    "method": "get",
    "request_headers": "application/json",
    "request_body": {"id":1},
    "response_code": 200,
    "response_body": 
        [
            { "id": 1, "name": "Lámpara 1", "description": "Luz Living", "state": 1, "type": 0 },
        ]
}
``` 
En caso de enviar no enviar correctamente el ID de un dispositivo, por cualquiera de los dos métodos, se retorna un código de estado *400 - Bad Request*.


3) Cambiar el estado de un dispositivo en el Backend.
Se debe enviar el id del dispositivo a cambiar, se puede hacer tanto con un JSON como por la URL (/changestate/?id=&state=). Si se hace directamente en el backend, debe actualizarse el frontend por medio del botón. Si se hace por medio del frontend, entonces la actualización es inmediata.

**Endpoint:** /changestate/

```json
{
    "method": "get",
    "request_headers": "application/json",
    "request_body": {"id":1, "state":0},
    "response_code": 200,
    "response_body": 
        [
            { "id": 1, "name": "Lámpara 1", "description": "Luz Living", "state": 0, "type": 0 },
        ]
}
``` 
En caso de enviar no enviar correctamente el ID de un dispositivo, por cualquiera método, se retorna un código de estado *400 - Bad Request*.


4) Agregar un dispositivo.

Se deben enviar los datos (id, nombre, descripción, y tipo) del dispositivo a agregar (el estado es 0 por defecto). Se puede hacer solamente con un JSON. Si se hace directamente en el backend, debe actualizarse el frontend por medio del botón "Actualizar". Si se hace por medio del frontend, entonces la actualización es inmediata (en este caso se envía un JSON desde el Frontend).

La respuesta es la lista de los dispositivos actualizada.

**Endpoint:** /addDevice/

```json
{
    "method": "post",
    "request_headers": "application/json",
    "request_body": {"id":10, "name":"Ventilador", "description":"Ventilador del Cuarto", "state":0, "type":3},
    "response_code": 201,
    "response_body": 
        [
            { "id": 1, "name": "Lámpara 1", "description": "Luz Living", "state": 1, "type": 0 },
            { "id": 2, "name": "Lámpara 2", "description": "Luz Cocina", "state": 0, "type": 0 },
            { "id": 3, "name": "Velador", "description": "Velador Living", "state": 1, "type": 0 },
            {"id":10, "name":"Ventilador", "description":"Ventilador del Cuarto", "state":0, "type":3}
        ]
}
``` 
En caso de enviar una ID ya existente, se recibe un código de estado *406 - Not Acceptable*, y en caso de agregarse el dispositivo se recibe un estado *201 - Created*.


5) Editar un dispositivo.
Se deben enviar los datos (nombre, descripción, y tipo) del dispositivo a cambiar con su ID. Se puede hacer solamente con un JSON. Si se hace directamente en el backend, debe actualizarse el frontend por medio del botón "Actualizar". Si se hace por medio del frontend, entonces la actualización es inmediata (en este caso se envía un JSON desde el Frontend).

La respuesta es la lista de los dispositivos actualizada.

**Endpoint:** /editdevice/

```json
{
    "method": "put",
    "request_headers": "application/json",
    "request_body": {"id":2, "name":"Lámpara 2", "description":"Luz Cuarto", "type":0},
    "response_code": 200,
    "response_body": 
        [
            { "id": 1, "name": "Lámpara 1", "description": "Luz Living", "state": 1, "type": 0 },
            { "id": 2, "name": "Lámpara 2", "description": "Luz Cuarto", "state": 0, "type": 0 },
            { "id": 3, "name": "Velador", "description": "Velador Living", "state": 1, "type": 0 },
            {"id":10, "name":"Ventilador", "description":"Ventilador del Cuarto", "state":0, "type":3}
        ]
}
``` 
En caso de enviar no enviar correctamente el ID de un dispositivo, por cualquiera método, se retorna un código de estado *400 - Bad Request*.
Solo se actualizan los valores que sean diferentes a los que ya se encuentran en el Backend. En caso de que no haya cambios, se registra en un mensaje en la consola.


6) Eliminar un dispositivo.
Se debe enviar el ID del dispositivo a eliminar. Se puede hacer solamente con un JSON. Si se hace directamente en el backend, debe actualizarse el frontend por medio del botón "Actualizar". Si se hace por medio del frontend, entonces la actualización es inmediata (en este caso se envía un JSON desde el Frontend).

La respuesta es la lista de los dispositivos actualizada.

**Endpoint:** /deletedevice/

```json
{
    "method": "delete",
    "request_headers": "application/json",
    "request_body": {"id":2},
    "response_code": 200,
    "response_body": 
        [
            { "id": 1, "name": "Lámpara 1", "description": "Luz Living", "state": 1, "type": 0 },
            { "id": 3, "name": "Velador", "description": "Velador Living", "state": 1, "type": 0 },
            {"id":10, "name":"Ventilador", "description":"Ventilador del Cuarto", "state":0, "type":3}
        ]
}
``` 
En caso de enviar no enviar correctamente el ID de un dispositivo, por cualquiera método, se retorna un código de estado *400 - Bad Request*. En caso de enviar una ID que no existe, se recibe un código de estado *406 - Not Acceptable*.


7) Editar configuraciones avanzadas (*No implementado*).
*Por implementar: agregar campos adicionales al estado para los dispositivos que lo permitan (ej. temperatura e intensidad(?) para aire acondicionado, atenuación y color para luces, porcentaje de apertura/cierra en ventanas, etc.). Estas configuraciones avanzadas pueden ser ajustadas en el frontend y enviadas al backend, o directamente ajustadas en el backend*

</details>

</details>


## Tecnologías utilizadas 🛠️

En esta sección podés ver las tecnologías más importantes utilizadas.

<details><summary><b>Mira la lista completa de tecnologías</b></summary><br>

* [Docker](https://www.docker.com/) - Ecosistema que permite la ejecución de contenedores de software.
* [Docker Compose](https://docs.docker.com/compose/) - Herramienta que permite administrar múltiples contenedores de Docker.
* [Node JS](https://nodejs.org/es/) - Motor de ejecución de código JavaScript en backend.
* [MySQL](https://www.mysql.com/) - Base de datos para consultar y almacenar datos.
* [PHPMyAdmin](https://www.phpmyadmin.net/) - Administrador web de base de datos.
* [Material Design](https://material.io/design) - Bibliotecas de estilo responsive para aplicaciones web.
* [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript tipado y con clases.

</details>

## Contribuir 🖇️

Si estás interesado en el proyecto y te gustaría sumar fuerzas para que siga creciendo y mejorando, podés abrir un hilo de discusión para charlar tus propuestas en [este link](https://github.com/gotoiot/app-fullstack-base/issues/new). Así mismo podés leer el archivo [Contribuir.md](https://github.com/gotoiot/gotoiot-doc/wiki/Contribuir) de nuestra Wiki donde están bien explicados los pasos para que puedas enviarnos pull requests.

## Sobre Goto IoT 📖

Goto IoT es una plataforma que publica material y proyectos de código abierto bien documentados junto a una comunidad libre que colabora y promueve el conocimiento sobre IoT entre sus miembros. Acá podés ver los links más importantes:

* **[Sitio web](https://www.gotoiot.com/):** Donde se publican los artículos y proyectos sobre IoT. 
* **[Github de Goto IoT:](https://github.com/gotoiot)** Donde están alojados los proyectos para descargar y utilizar. 
* **[Comunidad de Goto IoT:](https://groups.google.com/g/gotoiot)** Donde los miembros de la comunidad intercambian información e ideas, realizan consultas, solucionan problemas y comparten novedades.
* **[Twitter de Goto IoT:](https://twitter.com/gotoiot)** Donde se publican las novedades del sitio y temas relacionados con IoT.
* **[Wiki de Goto IoT:](https://github.com/gotoiot/doc/wiki)** Donde hay información de desarrollo complementaria para ampliar el contexto.

## Muestas de agradecimiento 🎁

Si te gustó este proyecto y quisieras apoyarlo, cualquiera de estas acciones estaría más que bien para nosotros:

* Apoyar este proyecto con una ⭐ en Github para llegar a más personas.
* Sumarte a [nuestra comunidad](https://groups.google.com/g/gotoiot) abierta y dejar un feedback sobre qué te pareció el proyecto.
* [Seguirnos en twitter](https://github.com/gotoiot/doc/wiki) y dejar algún comentario o like.
* Compartir este proyecto con otras personas.

## Autores 👥

Las colaboraciones principales fueron realizadas por:

* **[Agustin Bassi](https://github.com/agustinBassi)**: Ideación, puesta en marcha y mantenimiento del proyecto.
* **[Ernesto Giggliotti](https://github.com/ernesto-g)**: Creación inicial del frontend, elección de Material Design.
* **[Brian Ducca](https://github.com/brianducca)**: Ayuda para conectar el backend a la base de datos, puesta a punto de imagen de Docker.

También podés mirar todas las personas que han participado en la [lista completa de contribuyentes](https://github.com/###/contributors).

## Licencia 📄

Este proyecto está bajo Licencia ([MIT](https://choosealicense.com/licenses/mit/)). Podés ver el archivo [LICENSE.md](LICENSE.md) para más detalles sobre el uso de este material.

---

**Copyright © Goto IoT 2021** ⌨️ [**Website**](https://www.gotoiot.com) ⌨️ [**Group**](https://groups.google.com/g/gotoiot) ⌨️ [**Github**](https://www.github.com/gotoiot) ⌨️ [**Twitter**](https://www.twitter.com/gotoiot) ⌨️ [**Wiki**](https://github.com/gotoiot/doc/wiki)
