const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

const conn = require("./conn");
app.use(express.json());
app.use(cors());

const tripRoutes = require("./routes/trip.routes");
app.use("/trip", tripRoutes);

// 🔁 Health Check (No Cache, Always 200 OK)
app.get("/", (req, res) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");

  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Travel Memory Health</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        html, body {
          margin: 0;
          padding: 0;
          height: 100vh;
          width: 100vw;
          background: #111;
          color: white;
          font-family: sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 20px;
        }
        .face {
          position: relative;
          width: 300px;
          height: 350px;
          background: linear-gradient(180deg,#452824 184px,#f2bbad 34px);
          border-top-right-radius: 250px 350px;
          border-top-left-radius: 250px 350px;
          border-bottom-left-radius: 250px 250px;
          border-bottom-right-radius: 250px 250px;
          border: 5px solid black;
        }
        .hairs {
          height: 180px;
          background-color: #f2bbad;
          position: absolute;
          width: 290px;
          border-top-right-radius: 250px 350px;
          border-top-left-radius: 250px 350px;
          top: 25px;
        }
        .snow {
          transform: translateX(150px);
          transform-origin: right;
        }
        .mountain-cap-1, .mountain-cap-2, .mountain-cap-3, .mountain-cap-4 {
          position: absolute;
          top: 20px;
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;
          border-top: 40px solid #452824;
        }
        .mountain-cap-1 { left: -65px; }
        .mountain-cap-2 { left: -35px; }
        .mountain-cap-3 { left: -5px; }
        .mountain-cap-4 { left: 25px; }
        .earL, .earR {
          height: 70px;
          width: 50px;
          background-color: #f2bbad;
          position: absolute;
          top: 150px;
          border: 5px solid black;
        }
        .earL { left: -30px; z-index: -1; }
        .earR { right: -30px; z-index: -4; }
        .eyeR, .eyeL {
          height: 10px;
          width: 10px;
          background-color: black;
          position: absolute;
          top: 120px;
          z-index: 2;
          border-radius: 50%;
        }
        .eyeR { left: 128px; animation: blinkR 5s infinite linear; }
        .eyeL { right: 128px; animation: blinkL 5s infinite linear; }
        .nose {
          background: #fefefe;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          position: absolute;
          top: 220px;
          left: 140px;
          z-index: 100;
          transition: all .3s ease-in-out;
        }
        .nose:hover {
          scale: 1 1.25;
          top: 236px;
        }
        .nose:active {
          animation: propeller .5s infinite linear;
          transform-origin: 50% -55px;
        }
        .nose:before {
          content: "";
          position: absolute;
          top: -64px;
          left: 50%;
          border: 10px solid transparent;
          border-bottom: 62px solid #fefefe;
          transform: translateX(-50%);
        }
        .mouth {
          position: absolute;
          top: 300px;
          left: 140px;
          background: #a36655;
          width: 25px;
          height: 18px;
          border: 5px solid black;
          border-radius: 50%;
          transition: all .3s linear;
        }
        .face:active .mouth {
          top: 290px;
          width: 60px;
          height: 25px;
          left: 123px;
          border-radius: 7px 7px 130px 130px;
        }
        .bo {
          z-index: 10;
          zoom: 0.8;
        }
        .smileL, .smileR {
          position: absolute;
          height: 0px;
          width: 0px;
          rotate: 310deg;
          top: 180px;
          transition: all .1s linear;
        }
        .smileL { left: 70px; }
        .smileR { right: 70px; }
        @keyframes blinkL {
          98% { height: 10px; width: 10px; right: 128px; top: 120px; }
          100% { height: 3px; width: 11px; right: 126px; top: 123px; }
        }
        @keyframes blinkR {
          98% { height: 10px; width: 10px; left: 128px; top: 120px; }
          100% { height: 3px; width: 11px; left: 126px; top: 123px; }
        }
        @keyframes propeller {
          to { transform: rotateZ(360deg); }
        }
      </style>
    </head>
    <body>
      
      <div class="bo">
        <div class="face">
          <div class="earL"></div>
          <div class="earR"></div>
          <div class="eyeL"></div>
          <div class="eyeR"></div>
          <div class="hairs"></div>
          <div class="nose"></div>
          <div class="mouth"></div>
          <div class="smileL">
            <svg viewBox="0 0 65 65" xmlns="http://www.w3.org/2000/svg">
              <filter id="blurMe"><feGaussianBlur in="SourceGraphic" stdDeviation="2" /></filter>
              <path d="M25 19c-6 2-12 4-18 5..." fill="#EF7F71" filter="url(#blurMe)" />
              <path d="M35 35c-6 2-12 4-18 5..." fill="#EF7F71" filter="url(#blurMe)" />
              <path d="M45 50c-6 2-12 4-18 5..." fill="#EF7F71" filter="url(#blurMe)" />
            </svg>
          </div>
          <div class="smileR">
            <svg viewBox="0 0 65 65" xmlns="http://www.w3.org/2000/svg">
              <filter id="blurMe"><feGaussianBlur in="SourceGraphic" stdDeviation="2" /></filter>
              <path d="M25 19c-6 2-12 4-18 5..." fill="#EF7F71" filter="url(#blurMe)" />
              <path d="M35 35c-6 2-12 4-18 5..." fill="#EF7F71" filter="url(#blurMe)" />
              <path d="M45 50c-6 2-12 4-18 5..." fill="#EF7F71" filter="url(#blurMe)" />
            </svg>
          </div>
          <div class="snow">
            <div class="mountain-cap-1"></div>
            <div class="mountain-cap-2"></div>
            <div class="mountain-cap-3"></div>
            <div class="mountain-cap-4"></div>
          </div>
        </div>
      </div>
      <div>✅ Travel Memory backend is running!</div>
    </body>
    </html>
  `);
});

// Optional: Hello Route
app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});
