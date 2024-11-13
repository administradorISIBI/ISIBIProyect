##Proyecto construido con Docker##
Comandos para levantar los servicios
- docker-compose build
- docker-compose up -d

--

No olvidar cambiar el .env del proyecto frontend /app/.env, la url que se debe colocar es la del servidor
- En desarrollo es el puerto 80, ejemplo: http://192.168.1.2/
- En producción es el puerto 8010: ejempplo: http://192.168.1.2:8010/

Esto es debido a que en desarrollo el puerto de el front end es el 5173 y en producción es el 80
