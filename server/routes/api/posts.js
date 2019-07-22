const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});


//add
router.post('/', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

//delete
async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect('mongodb://cn123:abc123@ds253567.mlab.com:53567/gratitudes', {
        useNewUrlParser: true
    });
    return client.db('gratitudes').collection('posts');
}

module.exports = router;