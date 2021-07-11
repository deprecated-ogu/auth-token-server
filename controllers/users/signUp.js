const { User } = require('../../models');

module.exports = (req, res) => {
  const { userId, password, email } = req.body;

	User.findOne({
		where: { userId }
	}).then((data) => {
		if (data)
			return res.json({ data: null, message: 'already used ID' });
		let newUser = {
			userId: userId,
			password: password,
			email: email
		}
		User.create(newUser);
		res.json({ message: "success sign up" })
	}).catch((err) => {
		console.log(err);
	})
};