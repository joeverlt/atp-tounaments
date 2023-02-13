# Proyecto de Partidos de Tenis

Este proyecto muestra una lista de partidos de tenis con los jugadores que más veces han ganado cada partido. Al hacer clic en el nombre del jugador, se muestra la última vez que ganó ese partido y algunos datos adicionales sobre ese partido.

### Tecnologías usadas

Este proyecto fue desarrollado con las siguientes tecnologías:

- Next.js 13
- Node.js
- Next-UI
- Express
- JSON Web Token (JWT)

### Funcionalidad

- Muestra una lista de partidos de tenis con los jugadores que más veces han ganado cada partido
- Al hacer clic en el nombre del jugador, se muestra la última vez que ganó ese partido y algunos datos adicionales sobre ese partido

### Cómo ejecutar el proyecto en producción con Docker Compose

Para ejecutar el proyecto en producción con Docker Compose, siga los siguientes pasos:

- Clona el repositorio del proyecto en tu máquina local
- Crea un archivo .env.local dentro de la carpeta "/tounaments-client" basandote en el archovo .env.local.sample
- Crea un archivo .env dentro de la carpeta "/tounaments-server" basandote en el archovo .env.sample
- Ejecuta el siguiente comando en la línea de comandos para levantar los contenedores:
  bash

  docker-compose up -d

### Importante

- Asegúrate de tener Docker y Docker Compose instalados en tu máquina local
- Utiliza los archivos .env correspondientes para pasar variables de entorno al proyecto.
- Con el fin de facilitar la ejecucion del proyecto, se agregaron algunas de las variables de entorno del los archivos .env a los .env.samples
