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

## Prerequisites

This is a project build on the following tech stack, and are required to run the project

- `Nodejs-express`: run time environment to run our
  endpoints. I am using version v16.19.0 in my
  local machine but anything above v15 works just fine.

- `Postgres`: My design idea was to use a relational database.
  But I wanted the `SQL` database to have good writes and scalable.

This is all the prerequisites, everything else are just node packages

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
npx prisma migrate deploy
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

##### Important Information

But if we send no `parentId` parameter, our application takes a default `null` value and makes it a root node.

To add children, we send `POST` request with the `patentId` parameter along side `label`.

If we don't send any `label`, the api will throw `400 BAD REQUEST` error.

---

## Unit test

To test our API endpoints, I have added test cases using `supertest`
and `jest`(jest was pre-installed).

As standards, I am using a test database to test my APIs and clearing all the data at end.

To run the cases you have to create a separate database and add it's `URL` and `name` to
out `env` file. e.g.

```
TEST_DATABASE_URL="postgresql://${database user name}:${user password}@localhost:5432/${test database name}?schema=public"


TEST_DB_NAME="${test database name}"
```

Once that is done we could run our test cases bu entering the following command

```shell
npm test
```

##### Important information

To run our test cases and point to test database for APIs, I have created a `testPrisma` instance
which I am using based on the `process.env.NODE_ENV`.

More details on this can be found in `prisma/get_prisma_client.js`

##### Known flaws in test case

In the first test case of `/api/tree POST` where `parentId` is not provided.
So while query the database with `{label "label", parentId: null }`, we get a list
of root nodes with given `label`.

The only way we can be sure that this is the expected root is by adding some constraints on label and id.

---

To get more information on the design decisions and data schema, refer to `database.md`
