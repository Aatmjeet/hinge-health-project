# Hinge Health Assignment

## Description
The problem statement is to create a `CRUD` API application,
which can store a given tree.

The tree should be served on `/api/tree GET` endpoint and 
a new node can be added with a given `label` to a given `parentId`
through a `/api/tree POST` endpoint

## My solution
To solve this problem, I have created a basic `node-express` application
that stores the tree in `Postgres` database using `Prisma` ORM.

---
## Setup

### Install steps
- We start by installing our `npm packages` using
```shell
npm install
```
- Once that is done, we have to create an `.env` file to store the database URL.

- Once that file is created we add our postgres database URL as `DATABASE_URL` in the file.

- Replace variables accordingly in the following URL

```env
DATABASE_URL="postgresql://${database user name}:${user password}@localhost:5432/${database name}?schema=public"
```
- Now we are done with install


### Setup
- We start by setting up `Prisma` to generate the `PrismaClient()` using
```shell
npx prisma generate
```
- Now that we have prisma setup, we migrate our models to database using following command
```shell
npm migrate up
```
- Everything is setup now, time to run the server
```shell
npm start
```
---

## Endpoint
Current my solution has only 2 resource endpoint
```
/api/tree GET - To get the tree(s)
/api/tree POST - To create tree/ insert nodes
```

### Creating the tree(s)
A root node is nothing but a node without parent.
The way to create a node is to send a `POST` request with following body
```
{
	"label": "some label",
	"parentId": "ID of parent"
}
```
But if we send no `parentId` parameter, the code takes it as a root node.

To add children, we send `POST` request with the `patentId` parameter along side `label`

---
## Unit test
Coming soon.
