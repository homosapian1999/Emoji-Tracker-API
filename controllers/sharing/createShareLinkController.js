const shortid = require("shortid");
const db = require("../../models");

// // Getting the model
const Emoji = db.Emoji;
const Sharing = db.Sharing;

const createShareLinkController = async (req, res) => {
  try {
    const username = req.user._id;

    const uniqueLink = shortid.generate();

    const shareMoodHistory = await Emoji.findAll({
      attributes: ["emoji", "description", "date"],
      where: { username },
    });

    const emojiString = await Sharing.create({
      uniqueLink,
      isEnabled: true,
    });

    return res.status(201).send({
      success: true,
      message: "Link created successfully",
      link: uniqueLink,
      sharedData: shareMoodHistory,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error in create Share Link Controller",
    });
  }
};

module.exports = createShareLinkController;
