# Zynet

Zynet is an application to monitor and regulate an electric kettle
according to a specified configuration. Currently it is written
written as a Node REST API with a controller written in Python,
this is the rewrite using WebSocket and the RxJS library. It's
still in the early stages but the descriptions below outline the
functionality this rewrite will ultimately replace.

## /server

The server hosts the WebSocket connection and broadcasts messages
between the controller and client. Updates are pushed from the
controller to the client and the client pushes configuration changes
to the controller.

## /controller

The controller is responsible for maintaining mash temperature
by toggling relays according to PID logic. It sends updates to
the server indicating the current mash temperature and relay state.

## /src

The Angular 4 web client sets the configuration for the controller
to use and then listens for updates on that configuration.
