const express = require("express");
const ThumbnailGenerator = require("video-thumbnail-generator").default;
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "html");

app.get("/thumb", (req, res) => {
  const tg = new ThumbnailGenerator({
    sourcePath: "./SampleVideo_1280x720_1mb.mp4",
    thumbnailPath: "./",
    tmpDir: "./" //only required if you can't write to /tmp/ and you need to generate gifs
  });
  tg.generateCb(
    {
      count: 1,
      timemarks: ["3"]
    },
    (err, result) => {
      if (err) console.log("err", err);
      console.log("result", result);
      res.send({ data: result });
    }
  );
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
