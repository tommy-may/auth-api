## Quick Start

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://github.com/nvm-sh/nvm) (nvm)
- [pnpm](https://pnpm.io/) (Node Package Manager)
- [Docker](https://www.docker.com/products/docker-desktop/)

**Installation**

This project uses a specific version of Node defined in the .nvmrc file:

```bash
nvm use
```

Install the project dependencies using pnpm:

```bash
pnpm install
```

**Set Up Environment Variables**

Copy the file named `.env.example` and rename it `.env` in the root of your project and replace the placeholder values with yours.

**Running the Project**

```bash
npm run start:dev
```

## Deployment

Follow these steps to set up the project in a docker container.

**Set Up Environment Variables**

Copy the file named `.env.example` and rename it `.env.production` in the root of your project and replace the placeholder values with yours.

**Running the Project**

```bash
docker-compose up -d
```
