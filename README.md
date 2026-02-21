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

**Set Up MongoDB**

Start the MongoDB container using docker:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

**Running the Project**

```bash
npm run start:dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## Deployment

Follow these steps to set up the project in a docker container.

**Set Up Environment Variables**

Copy the file named `.env.example` and rename it `.env.production` in the root of your project and replace the placeholder values with yours.

**Running the Project**

```bash
docker-compose up -d
```
