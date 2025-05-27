# Dev
1. Crear copia de archivo .env.template y renombrarlo a .env
2. Configurar las variables de entorno necesarias
```
PORT=3000
MAILER_SERVICE=gmail
MAILER_EMAIL=
MAILER_SECRET_KEY=
PROD=false
...
```
3. Instalar dependencias: ```npm install``` | ```npm i```
4. Levantar bases de datos con el comando ```docker compose up -d``` (necesario tener docker desktop instalado)
5. Correr migraciones de base de datos con el comando ```npx prisma migrate dev```
6. Ejecutar ```npm run dev``` para levantar la aplicación
