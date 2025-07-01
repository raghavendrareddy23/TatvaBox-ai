const Tatva = require('../models/tatvaModel');
const cloudinary = require('../utils/cloudinary')
const fs = require('fs')

exports.getRandomTatva = async (req, res) => {
  const count = await Tatva.countDocuments();
  const random = Math.floor(Math.random() * count);
  const tatva = await Tatva.findOne().skip(random);
  res.json(tatva);
};

exports.getAllTatvas = async (req, res) => {
  const tatvas = await Tatva.find();
  res.json(tatvas);
};

exports.getTatvaById = async (req, res) => {
  try {
    const tatvaById = await Tatva.findById(req.params.id);
    if (!tatvaById) {
      return res
        .status(404)
        .json({ success: false, message: "Tatva not found" });
    }
    res.status(200).json({ success: true, data: tatvaById });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error fetching tatva" });
  }
};

exports.createTatva = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: "Title and description are required" });
    }

    let result = null;

    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path, { folder: 'tatvas' });
      fs.unlinkSync(req.file.path);
    }

    const tatva = new Tatva({
      title,
      description,
      tatvaUrl: result?.secure_url || '',
      cloudinary_id: result?.public_id || ''
    });

    await tatva.save();
    res.status(201).json(tatva);
  } catch (err) {
    if (req.file && result?.public_id) {
      await cloudinary.uploader.destroy(result.public_id);
    }
    res.status(500).json({ error: err.message });
  }
};

exports.updateTatva = async (req, res) => {
  try {
    const tatva = await Tatva.findById(req.params.id);
    if (!tatva) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: "Tatva not found" });
    }

    let result = null;

    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path, { folder: 'tatvas' });
      fs.unlinkSync(req.file.path);
    }

    const updatedData = {
      title: req.body.title || tatva.title,
      description: req.body.description || tatva.description,
      tatvaUrl: result?.secure_url || tatva.tatvaUrl,
      cloudinary_id: result?.public_id || tatva.cloudinary_id
    };

    const updatedTatva = await Tatva.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (req.file && tatva.cloudinary_id && tatva.cloudinary_id !== updatedTatva.cloudinary_id) {
      await cloudinary.uploader.destroy(tatva.cloudinary_id);
    }

    res.json(updatedTatva);
  } catch (err) {
    if (req.file && result?.public_id) {
      await cloudinary.uploader.destroy(result.public_id);
    }
    res.status(500).json({ error: err.message });
  }
};


exports.deleteTatva = async (req, res) => {
  try {
    const tatva = await Tatva.findById(req.params.id);
    if (!tatva) return res.status(404).json({ message: "Tatva not found" });

    // Delete from Cloudinary
    if (tatva.cloudinary_id) {
      await cloudinary.uploader.destroy(tatva.cloudinary_id);
    }

    await Tatva.findByIdAndDelete(req.params.id);
    res.json({ message: "Tatva deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};