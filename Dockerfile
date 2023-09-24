FROM denoland/deno:1.37.0

WORKDIR /app
COPY . .

EXPOSE 3333

CMD [ "deno", "task", "dev" ]
