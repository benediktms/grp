# grp
Co-living made easier
<br>
<br>
[![CI](https://github.com/benediktms/grp/actions/workflows/main.yml/badge.svg)](https://github.com/benediktms/grp/actions/workflows/main.yml)

## Environment Variables

Ensure the `.env.local` file has required environment variables:

```
DATABASE_URL=postgresql://<YOUR_DB_USERNAME>:<YOUR_PASSWORD>@localhost:5432/grp
```

Ensure the `.env.test.local` file has required environment variables:

```
DATABASE_URL=postgresql://<YOUR_DB_USERNAME>:<YOUR_PASSWORD>@localhost:5433/grp_test
```
Note: tests run on port 5433.

## Local setup

run the following commands:
```shell
yarn predev && yarn migrate
```
To run the application localy run:
```shell
yarn dev
```
The application will start on port 3000.

## Tests

Runs your tests using Jest.

```
yarn test
```
