# OpenCraft

OpenCraft is an open source implementation of the popular game InfiniteCraft. 

**You can learn more about how it works and how i made it [here](http://www.youtube.com/watch?v=u2zZJ5hZdt0)**

[![I cloned Infinite Craft](http://img.youtube.com/vi/u2zZJ5hZdt0/0.jpg)](http://www.youtube.com/watch?v=u2zZJ5hZdt0 'I cloned Infinite Craft')


## Setup

Download the `mistral-7b-instruct-v0.1.Q8_0.gguf` into the server/models folder. You can downloa it [here](https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.1-GGUF/tree/main).

## Run the Frontend

You can either stat the frontend by running `npm run dev` in the `frontend` folder or you can use the docker-compose file to start the frontend.

```bash
docker-compose up -d
```

## Run the Backend

You can start the backend server by running `npm run start` in the `backend` folder.

