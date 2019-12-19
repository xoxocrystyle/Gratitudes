const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});


//
router.post('/', async(req, res) => {
    const posts = await loadPostsCollection();
    console.log(posts);
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})



router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
  });

async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect('mongodb://cn123:abc123@ds253567.mlab.com:53567/gratitudes', {
        useNewUrlParser: true
    });
    return client.db('gratitudes').collection('posts');
}

module.exports = router;