const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Schema of posts
// const posts = {
//     id1: { id: 'id1', title: 'my first post', comments: [ { id: 'cid1', content: 'My comment on the first post' } ] }
// };

let posts = {};

app.get('/posts', (req, res) => {
    res.status(200).send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    console.log(type);
    if(type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: []};
    } else if(type === 'CommentCreated') {
        const { postId, id, comment } = data;
        posts[postId].comments.push({ id, content: comment });
    }
    console.log(posts);
    res.status(200).send({});
});

app.listen(4002, () => {
    console.log('Listening on 4002...')
}) 