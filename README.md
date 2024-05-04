#Stack
Mongodb - nest - Moongose

#Ejecutar en desarrollo

1.-Clonar repositorio
2.-instalar dependencias
```
  npm install
```
3.-Instalar nest cli
```
  npm i -g @nestjs/cli
```
4.-Levantar la base de datos
```
  docker-compose up -d
```

5.-Renombrear ```env.template``` a ```.env``` 
6.-Llenar variables de entorno y solicitar valores secretos
```
MONGO_URL='mongodb://localhost:27017/nest-pokemon-db'
PORT=3000
DEFAULT_LIMIT=5
```
6.-Ejecutar seed
```
  http://localhost:3000/api/v1/seed
```