# express-async-error-catcher
Catch errors in async request handlers and forward them to your error handler

## Install

## Features
- Forward errors from rejected promises to your error handler
- Forwards the router generics from its `.get`, `.put`, `.post`, `.delete` to your request handler, if you'r using `typescript`

## Example
``` ts
import { asyncErrorCatcher } from "express-async-error-catcher"
import express from "express"

const router = express.Router()

type RouteParams = { id: string }
router.get<"/users/:id/", RouteParams>("/:id", asyncErrorCatcher(async (req, res) => {
  const userID = req.params.id // infered as 'string'
  await thisMayThrow(userID) // is forwarded to the error-handler if it throws
  // ...
}))
```