import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

let users = []

const tweets = [];

app.post('/sign-up', (req, res) => {
  const userInfo = req.body; 
  if(!userInfo.username||!userInfo.avatar){
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }
  users.push(userInfo);
  return res.status(201).json(userInfo)
});

// to post a tweet
app.post('/tweets', (req, res) => {
  const {user} = req.headers;
  const tweet = req.body; 

  if(!user||!tweet.tweet){
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  const userInfo= users.find((obj)=>obj.username === user)
  tweets.unshift({...tweet, username:user, avatar: userInfo.avatar})

  return res.status(201).json({
    tweet:
    {
        username:user,
        tweet:tweet.tweet,
        avatar:userInfo.avatar,
    },
  })
});

// to get all tweeets
app.get('/tweets', (req, res) => {
  const topTenTweets = tweets.slice(0, 10);
  res.send(topTenTweets);
});


// to get the tweeets of a specific user
app.get('/tweets/:userName', (req, res) => {
  const userName = req.params.userName;
  const myTweets = tweets.filter((obj)=>obj.username === userName);
  res.send(myTweets);
});


app.listen(5000);