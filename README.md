![vibe_up_full_logo](https://github.com/antyep/vibe_up_backend/assets/147875916/901277ae-26fe-4ae9-a772-0391a3604e9b)

# Goal

The aim of this project is to develop a robust backend API integrated with a flexible database, designed to support the core features of the application efficiently.

# Backend Functionalities

Our backend system offers users a seamless experience, simplifying registration, login, and profile management. Through our API, users effortlessly interact with the platform, updating their personal details as needed.

Additionally, users can explore and engage with posts from others, fostering community interaction through likes. This encourages connections among users and enhances the overall platform experience.

Furthermore, our backend prioritizes security, implementing robust authentication measures to protect user data. In summary, our API provides essential features for modern social networking, ensuring a secure and enjoyable user experience.

# User endpoints

### Login

```bash
  POST localhost:3000/api/auth/login
```

#### Body

```bash
  {
        "email":"johndoe@email.com",
        "password":"password",
    }
```


### Register

```bash
  POST localhost:3000/api/auth/register
```

### Body

```bash
  {
        "Username":"John",
        "password":"TextNumber",
        "email":"johndoe@email.com",
    }
```

### Get Songs

NOTE: Requires token

```bash
  GET localhost:3000/api/songs
```

### Like

NOTE: Requires token

```bash
  POST localhost:3000/api/posts/like/:id
```

### Create posts

NOTE: Requires token

```bash
  POST localhost:3000/api/posts
```

### Delete post

NOTE: Requires token

```bash
  DELETE localhost:3000/api/posts/:id
```

### Get posts

NOTE: Requires token

```bash
  GET localhost:3000/api/posts
```

### Update profile

NOTE: Requires token

```bash
  PUT localhost:3000/api/auth/profile
```

# Admin endpoints

### Delete user

NOTE: Requires ADMIN token

```bash
  PUT localhost:3000/api/users/:id
```

### Bring all users

NOTE: Requires ADMIN token

```bash
  PUT localhost:3000/api/users
```
# Installation

1. Clone the repository
```bash
  git clone https://github.com/antyep/vibe_up_backend.git
```
2. Install dependencies (Terminal)
```bash
  npm i
```
3. Run docker (Terminal)
```bash
  docker compose up
```
4. Run migration (Terminal)
```bash
  npm run migrate:run
```
5. Run Datasource
```bash
  npm run dev
```

### Additionally, you could run seeders with the following command:
```bash
  npm run db:seed
```


# Database

![image](https://github.com/antyep/vibe_up_backend/assets/147875916/fb05b445-1c58-4b17-8bd6-7c664f71e71c)

# Stack
- Nodemon
- TypeScript
- MySQL
- TypeORM
- Express.JS
- Node.JS
- JWT
- Git
