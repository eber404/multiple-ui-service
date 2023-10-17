### about

An example on how to have multiple UIs on the same service

### requirements

- Deno environment https://deno.land/manual@v1.29.2/getting_started/installation

### steps

1. run `docker compose up`
2. access redis dashboard on your web browser `http://localhost:8001`
3. follow steps below <br >
   - click on `I already have a database`
   - select `Connect to a Redis Database`
   - Host: `redis`
   - Port: `6379`
   - Name: `redis`
4. Access `CLI` tab on left menu
5. Copy payload below to send via PubSub message

`publish 'create-user' '{"user_name": "johndoe", "user_email": "johndoe@gmail.com", "user_password": "12345678"}'`
