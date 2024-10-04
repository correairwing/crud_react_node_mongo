const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

const ItemSchema = new mongoose.Schema({ name: String});
const Item = mongoose.model('Item', ItemSchema);

app.post('/items', async(req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
});

app.get('/items', async(req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.put('/items/:id', async(req, res) => {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updatedItem);
});

app.delete('/items/:id', async(req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));