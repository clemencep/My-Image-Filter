"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const util_1 = require("./util/util");
const valid_url_1 = __importDefault(require("valid-url"));
const child_process_1 = require("./util/child-process");
(() => __awaiter(this, void 0, void 0, function* () {
    // Init the Express application
    const app = express_1.default();
    // Set the network port
    const port = process.env.PORT || 8081;
    // Use the body parser middleware for post requests
    app.use(body_parser_1.default.json());
    // endpoint to get the image, process it and return the filtered image
    app.get("/filteredimage/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let { image_url } = req.query;
            let { lower } = req.query;
            let { upper } = req.query;
            // Check if the user has entered any query parameter
            if (!image_url) {
                return res.status(422)
                    .send({ error: 'Please Enter a URL' });
            }
            // If we have a query parameter, check if it is a valid url
            if (!valid_url_1.default.isUri(image_url)) {
                return res.status(415).send({ error: 'Please provide a valid url' });
            }
            // Process the image
            let imgPath = yield util_1.filterImageFromURL(image_url);
            if (imgPath) {
                const newPath = yield child_process_1.findEdges(imgPath, lower, upper);
                res.on('finish', () => util_1.deleteLocalFiles([imgPath, newPath.trim()]));
                return res.status(200).sendFile(newPath.trim());
            }
            else {
                return res.status(500).send({ error: 'We can not elaborate your image' });
            }
        }
        catch (_a) {
            return res.status(500).send({ error: 'We can not process your request' });
        }
    }));
    // Root Endpoint
    // Displays a simple message to the user
    app.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.status(200).send({
            "message": "You are accessing an image filter server",
            "route": "/filteredimage",
            "parameters": {
                "parameter1": "The URL of the Image(required)",
                "parameter2": "lower (optional - lower Canny threshold. upper required)",
                "parameter3": "upper (optional - upper Canny threshold. lower required)"
            },
            "example": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-tulips-blooming-in-field-royalty-free-image-1584131616.jpg?crop=0.630xw:1.00xh;0.186xw,0&resize=640:*"
        });
    }));
    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
}))();
//# sourceMappingURL=server.js.map