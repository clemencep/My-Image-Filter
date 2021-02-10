# Udagram Image Filtering Microservice

This API makes use of nodejs to read an image from an URL and then passes it to python with a sub process. Python then filters the image, finds the edges with OpenCV and returns an absolute path to the image to Nodejs.

The processed image, will then be sent as response to the user. Once the image is received by the user, all the temporary working files, will be deleted from the server.


### Setup Node environment

In order to use this service, it is necessary to have Nodejs v10.16 (or grater) installed on the machine.

Open a new terminal within the project directory and run:

1. Initialize a new project: `npm i`
2. run the development server with `npm run dev`

### Endpoint examples

Endpoint example without thresholds:
```
http://localhost:8082/filteredimage?image_url=https://images.unsplash.com/photo-1529940340007-8ef64abc360a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80
```

Endpoint example with thresholds:
```
http://localhost:8082/filteredimage?image_url=https://images.unsplash.com/photo-1529940340007-8ef64abc360a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80&lower=50&upper=200
```

http://myimagefilter-env-1.eba-bjdbg2qn.us-east-2.elasticbeanstalk.com/ to reach my Application# Project2Cloud
