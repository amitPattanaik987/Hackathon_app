const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const Hackathon = require("./models/Hackathon_list");
const user = require("./models/User");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(
  "sk_test_51Pt1NCGwu7WfDqJU5XLyZyNP7kPYM4aADSWhpy5V93F5pxoQBGB8k6WqMnE7jw9EUzulZiDcxuUu2PtshWGi8Lyv00b0wuPOYx"
);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET, // Click 'View API Keys' above to copy your API secret
});

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://amitpattanaik987:5uzItG1hsYVYqhmB@hackathonlist.jlc98.mongodb.net/?retryWrites=true&w=majority&appName=Hackathonlist"
  )
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch(() => {
    console.log("Failed to connect with db");
  });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/image_upload", upload.single("image"), async (req, res) => {
  const x = await cloudinary.uploader.upload(req.file.path);
  fs.unlink(req.file.path, (err) => {
    if (err) console.log(err);
    else {
      console.log("Deleted file");
    }
  });
  return res.status(200).json(x.secure_url);
});

app.post("/addhackathon", async (req, res) => {
  const newdata = new Hackathon({
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description,
    level: req.body.level,
    image: req.body.responseData,
    problemStatements: req.body.problemStatements,
  });
  
  await newdata.save();
  res.json({
    success: true,
    name: req.body.name,
  });
});

app.get("/gethackathons", async (req, res) => {
  let hackathons = await Hackathon.find();
  console.log("All Products Fetched");
  res.status(200).json(hackathons);
});

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  let check = await user.findOne({ email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "Existing User Found With same Email Address",
    });
  }
  const account = new user({
    name: username,
    email: email,
    password: password,
  });
  await account.save();
  console.log("user created");
  res.status(200).send({
    Success: true,
    data: "User created",
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let check = await user.findOne({ email });
  if (check) {
    if (check.password === password) {
      const id = check.id;
      const logged_in_email = check.email;
      const token = jwt.sign(id, "secret_token");
      res.status(200).send({
        success: true,
        token,
        logged_in_email,
      });
    } else {
      res.status(404).send({
        success: false,
        data: "Invalid Credentials",
      });
    }
  } else {
    res.status(404).send({
      success: false,
      data: "Invalid Credentials",
    });
  }
});

app.post("/checkprime", async (req, res) => {
  const email = req.body.email;
  const response = await user.findOne({ email });
  if (response.prime_member) {
    res.json({
      status: true,
    });
  } else {
    res.json({
      status: false,
    });
  }
});

app.post("/payment", async (req, res) => {
  const price = req.body;

  const lineitems = [
    {
      price_data: {
        currency: "inr",
        product_data: {
          name: "Subscription Cost :",
        },
        unit_amount: Math.round(price.Amount * 100),
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    line_items: lineitems,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",
  });

  res.json({ id: session.id });
});

app.put("/setsubscribed", async (req, res) => {
  const email = req.body.email;
  const data = await user.findOne({ email });
  data.prime_member = true;
  await data.save();
});

app.post("/getprime", async (req, res) => {
  const { email } = req.body;
  const response = await user.findOne({ email });
  if (response) {
    if (response.prime_member) {
      res.json({
        success: true,
      });
    } else {
      res.json({
        success: false,
      });
    }
  }
});

app.post("/problems",async(req,res)=>{
  console.log(req.body.cardclicked);
  const clickedcard = req.body.cardclicked;
  const problems=await Hackathon.find({name:clickedcard});
  console.log(problems[0].problemStatements);
  res.send(problems[0].problemStatements);
})

app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
