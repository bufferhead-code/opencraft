# OpenCraft

OpenCraft is an open source implementation of the popular game InfiniteCraft. 

**You can learn more about how it works and how i made it [here](http://www.youtube.com/watch?v=aqrPOPq1kP0)**

[![I cloned Infinite Craft](http://img.youtube.com/vi/aqrPOPq1kP0/0.jpg)](http://www.youtube.com/watch?v=aqrPOPq1kP0 'I cloned Infinite Craft')


## Setup

Download the `mistral-7b-instruct-v0.1.Q8_0.gguf` into the server/models folder. You can downloa it [here](https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.1-GGUF/tree/main).

Please make sure to run both the frontend and the backend servers, otherwise OpenCraft will not work.

## Run the Frontend

<img width="500" alt="image" src="https://github.com/bufferhead-code/opencraft/assets/104107997/af0021f1-506d-4565-b2fd-ec9fa11721d1">

### Run with npm

To start the Vite Dev Server you can run 

```bash
cd frontend
npm run dev
```

### Run with Docker 

There is also a docker-compose.yml (frontend-only for now, because of performance reasons) which you can start with, it is configured to connect to a Traefik Reverse-Proxy: 

```bash
docker-compose up -d
```

## Run the Backend

You can start the API/Backend Server by running

```bash
cd server
npm run start
```

## Contributing

Please open an issue and wait for the approval of a Maintainer before submitting a PR. 

## Support me

We are building **[solidtime](https://www.solidtime.io) - The modern Open Source Time Tracker**

[<img width="600" alt="image" src="https://github.com/bufferhead-code/opencraft/assets/6266887/72437557-7a68-4da1-bcc7-befe808134fc">](https://www.solidtime.io)


