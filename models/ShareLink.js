module.exports = (sequelize, Datatypes) => {
  const ShareLink = sequelize.define("Sharing", {
    uniqueLink: {
      type: Datatypes.STRING,
      unique: true,
    },
    isEnabled: {
      type: Datatypes.BOOLEAN,
      defaultValue: true,
    },
  });

  return ShareLink;
};
