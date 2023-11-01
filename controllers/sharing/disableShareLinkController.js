const db = require("../../models");

// Getting the model
const Sharing = db.Sharing;

const disableShareLinkController = async (req, res) => {
  try {
    const { uniqueLink } = req.params;
    const existingLink = await Sharing.findOne({ where: { uniqueLink } });
    if (existingLink) {
      const [updatedRows] = await Sharing.update(
        { isEnabled: false },
        { where: { uniqueLink } }
      );

      if (updatedRows === 0) {
        return res.status(404).send({
          success: false,
          message: "Sharing link not found",
        });
      }

      return res.status(201).send({
        success: true,
        message: "Link has been disabled successfully",
      });
    }

    return res.status(404).send({
      success: false,
      message: "Link not found",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error in disable Share link controller",
      err,
    });
  }
};

module.exports = disableShareLinkController;
