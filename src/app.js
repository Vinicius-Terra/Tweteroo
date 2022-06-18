import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

let users = []

const tweets = [];

app.post('/sign-up', (req, res) => {
  const userInfo = req.body; 
  users.push(userInfo);
  res.send("ok");
  console.log(users)
});

app.post('/tweets', (req, res) => {
  const tweet = req.body; 
  const userInfo= users.find((obj)=>obj.username === tweet.username)
  tweets.unshift({...tweet, avatar: userInfo.avatar})
  res.send("ok");
  console.log(tweet)
});


app.get('/tweets', (req, res) => {
  const topTenTweets = tweets.slice(0, 10);
  res.send(topTenTweets);
});

app.listen(5000);