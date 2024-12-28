# Installation

## 1. Clone the repository

```bash
git clone https://github.com/Kuzma02/MERN-Login-And-Register-With-JSON-Web-Token.git
```

## 2. Install dependencies

### Navigate to the project directory

```bash
cd folder-name
```

### Install backend dependencies

```bash
npm install
```

### Install frontend dependencies

```bash
cd client
npm install
```

## 3. Configure MongoDB and JWT

1. Visit the MongoDB website, create an account, a database, and copy the connection string.
2. Generate a 256-bit random key and add it to the `.env` file. Create the `.env` file in the root directory with the following contents:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## 4. Run the application

### Start the backend server

```bash
node app.js
```

### In a new terminal, start the frontend

```bash
cd client
npm run dev
```

## 5. Visit the application

Open your browser and navigate to:

```
http://localhost:5173
```

## Notes

- This project uses Node.js version 20. To use it, run:

```bash
nvm use 20
```

- In the `client` repository, install the libraries required for the QR scanner:

```bash
npm install html5-qrcode --legacy-peer-deps
```

- Then, run `npm run dev` in the `client` directory.

If you encounter any issues or have further questions, please refer to the project's README or open an issue on the [GitHub repository](https://github.com/Kuzma02/MERN-Login-And-Register-With-JSON-Web-Token).
