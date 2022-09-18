# express-async-error-catcher
Catch errors in async request handlers and forward them to your error handler

## Install
```
npm i express-async-error-catcher
```
## Features
- Forward errors from rejected promises to your error handler
- Forwards the router generics from its `.get`, `.put`, `.post`, `.delete` to your request handler, if you'r using `typescript`

## Example
``` ts
import express, { Request, Response, NextFunction } from "express"
import { asyncErrorCatcher } from "express-async-error-catcher"

const app = express()

app.get("/safe", asyncErrorCatcher(async (req, res) => {
  await new Promise((res, rej) => {
    setTimeout(() => rej("rejected"), 2000) // Is caught by 'errorHandler' after 2s
  })
  // ...
}))
app.get("/unsafe", async (req, res) => {
  await new Promise((res, rej) => {
    setTimeout(() => rej("rejected"), 2000) // Is NOT caught by 'errorHandler' Terminates express with 'UnhandledPromiseRejection'
  })
  // ...
})

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  console.log("caught error", error)
  // ...
}

app.use(errorHandler)
app.listen(3000)
```