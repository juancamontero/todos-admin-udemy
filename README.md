# Development
Para levantar en desarrollo

* levantar base de datos

```
docker compose up -d
```
* Inicializar priama
``` 
npx prisma init
```
* Actualizar .env
* Crear modelos customizados en schema.prisma

```
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Todo {
  id          String   @id @default(uuid())
  description String
  complete    Boolean  @default(false)
  createAt    DateTime @default(now())
  updateAt    DateTime @updatedAt
}
``````
* hacer primera migración

``` 
npx prisma migrate dev
```

* generar cliente

```
npx prisma generate
```
* create prisma nextjs Client
``` 
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export default prisma;
```
* ejecutar seed para la database en [seed database](localhost:3000/api/seed)