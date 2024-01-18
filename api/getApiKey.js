module.exports = (req, res) => {
  const apiKey = process.env.GITHUB_ACCESS_TOKEN;
  res.json({ apiKey });
};
