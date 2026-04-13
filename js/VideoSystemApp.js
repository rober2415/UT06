"use strict";

import VideoSystemController from "./controllers/VideoSystemController.js";
import VideoSystem from "./models/VideoSystem.js";
import VideoSystemView from "./views/VideoSystemView.js";

const VideoSystemApp = new VideoSystemController(VideoSystem.getInstance("nuevaInstancia"),
    new VideoSystemView()
);

export default VideoSystemApp;
