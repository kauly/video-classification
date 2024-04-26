# Frontend

The frontend application that sent images to the backend for classification. Images are taken from the video at every 250ms, drawn at the preview Canvas and, at the same time, sent to the backend that will respond with the model output and then the boxes will be drawn if available.

## Running

Install the dependencies
```
npm i
```

Start the application

```
npm run dev
```

The application will be available at http://localhost:3000

