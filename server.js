const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
const puppeteer = require('puppeteer-core');
const path = require('path');
const axios = require('axios');
const {execFile} = require('child_process');

const baseURL = "https://render-vyiztljbvq-el.a.run.app"
// const baseURL = "http://localhost:8080"

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/render/:email/:id', async function (req, res) {
    const {email, id} = req.params;
    const r = Math.floor(Math.random() * 100)

    const startRecord = async () => {
        console.log("preparing")
        const data = await axios.get(`https://quantavid-vyiztljbvq-el.a.run.app/api/videos/${email}/video/${id}`);
        // const duration = 10;
        const duration = data.data.slides.length * 5;

        const browser = await puppeteer.launch({
            // headless: false,
            executablePath: "/usr/bin/google-chrome-stable",
            args: ['--no-sandbox']
        });
        const page = await browser.newPage();
        await page.setViewport({height: 576, width: 1024})
        page.on('pageerror', err => console.error(err));
        await page.goto(`${baseURL}/${email}/${id}`, {waitUntil: 'networkidle0', timeout: 0});

        await page.waitForSelector(".video");

        let ffmpegPath = 'ffmpeg';
        let fps = 30;

        let outFile = path.join(__dirname, 'dom' + r + '.avi')

        const args = ffmpegArgsY(fps);

        args.push(outFile);

        const ffmpeg = execFile(ffmpegPath, args, {maxBuffer: 1024 * 1024 * 1024});

        const closed = new Promise((resolve, reject) => {
            ffmpeg.on('error', reject);
            ffmpeg.on('close', resolve);
        });

        console.log("starting")
        let i = 0, prev = Date.now(), p = Date.now(), n = Date.now();
        for (let current = 0; current <= 1; current += 1 / fps / duration) {
            p = n;
            await page.evaluate(async (current) => {
                await window.progress(current)
                // window.tl.progress(current)
            }, current);
            n = Date.now();
            console.log(`frame ${i}/${fps * duration}`, "evaluated in", `${n - p}ms`);
            p = n;
            let screenshot = await page.screenshot({omitBackground: true, type: "jpeg"});
            n = Date.now();
            console.log(`frame ${i}/${fps * duration}`, "shot in", `${n - p}ms`)
            p = n;
            await write(ffmpeg.stdin, screenshot);
            // await new Promise(resolve => setTimeout(resolve, 100))
            n = Date.now();
            console.log(`frame ${i++}/${fps * duration}`, "fed in", `${n - p}ms`);
        }

        console.log("out of loop");
        ffmpeg.stdin.end();
        console.log("ended stream");
        await closed;
        console.log("stream resolved");
        await browser.close();
        console.log("generated", `dom${r}.avi of duration ${duration}s and fps ${fps} in ${(Date.now() - prev) / 1000}s with ${(Date.now() - prev) / ++i}ms per frame`);
    };
    await startRecord();
    res.end(`Check ${baseURL}/${'dom' + r + '.avi'}`);
})

app.get("/api/videos/:email/video/:id", (req, res) => {
    const {email, id} = req.params;
    axios.get(`https://quantavid-vyiztljbvq-el.a.run.app/api/videos/${email}/video/${id}`)
        .then(data => res.send(data.data))
        .catch(err => console.error(err))
})

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

var server = app.listen(port, () => console.log("Server started on port 8080"));
server.setTimeout(500000);

const ffmpegArgsY = fps => [
    '-y',
    '-f',
    'image2pipe',
    '-r',
    `${+fps}`,
    '-i',
    '-',
    '-c:v',
    'libx264', // h264 codec
    '-auto-alt-ref',
    '0',
    '-s:v',
    '1280x720',
    '-crf',
    '20',
    '-pix_fmt',
    'yuv420p',
    '-metadata:s:v:0',
    'alpha_mode="1"',
    '-tune',
    'stillimage',
    '-movflags',
    '+faststart',
];

const write = (stream, buffer) =>
    new Promise((resolve, reject) => {
        stream.write(buffer, error => {
            if (error) reject(error);
            else resolve();
        });
    });
