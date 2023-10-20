## Problem

As mentioned in #594，#560，#548，there a lot issues about woker.js，I also encountered the same problem when developing chrome extension，and it took me a long time to debug to solve this problem.

Now there are two ways to use @ffmpeg/ffmpeg：

### umd

We could load `ffmpeg` via cdn like `https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.7/dist/umd/ffmpeg.min.js`. But it will report an error like [814 xxxx is not found](https://github.com/ffmpegwasm/ffmpeg.wasm/issues/560#issuecomment-1703065141) when we execute `ffmpeg.load()`。

The reason is that `Webpack` will build the `new Worker(xxx)` into a seperate file，so there will be two file in `umd`，see [here](https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.7/dist/umd/)：

- ffmpeg.js
- 814.ffmpeg.js ( worker.js)

### esm

## Solution

A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
