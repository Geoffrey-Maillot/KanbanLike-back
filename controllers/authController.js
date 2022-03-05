const { User } = require('../models/')
const bcrypt = require('bcrypt');
const jwtwebtoken = require('jsonwebtoken')


const authController = {
  signup: async (req, res, next) => {
    console.log(req)
    try {
      // Je récupère le nouvel utilisateur
      let { first_name, last_name, email, password } = req.body

      // Je vérifie que l'email n'existe pas déjà
      const user = await User.findOne({
        where: {
          email,
        }
      });
      // Si oui j'envoie un erreur
      if (user) {
        return res.status(401).json({
          error: {
            message: 'Cet email existe déjà'
          }
        })
      }
      // si non je continue et je hash le password avec bcrypt
      password = await bcrypt.hash(password, 10);

      // j'instancie et je crée mon utilisateur
      const newUser = await User.build({
        first_name,
        last_name,
        email,
        password
      })

      await newUser.save();
      // Je retire le password pour qu'il n'apparaisse pas dans la réponse
      newUser.password = undefined
      // je retourne status success avec le user nouvellement crée
      await res.status(200).json({ newUser })

    } catch (error) {
      next(error)
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body
      // On récupère le user
      const user = await User.findOne({
        where: {
          email,
        }
      })
      // Si on ne trouve pas de user correspondant à l'email on renvoie un erreur
      if (!user) {
        return res.status(401).json({
          error: {
            message: "Cet email n'existe pas"
          }
        })
      }
      // Je compare les passwords avec bcrypt
      const truePassword = await bcrypt.compare(password, user.password)
      // Si les password correspondent je renvoie le user
      if (!truePassword) {
        return res.status(401).json({
          error: {
            message: "Le mot de passe est incorrect"
          }
        })
      }

      // Je retire password avant d'envoyer le user
      user.password = undefined
      // Je récupère seulement les datas du user 
      const userData = user.dataValues

      const token = jwtwebtoken.sign(userData, process.env.SECRET_TOKEN, { expiresIn: '2h', algorithm: 'HS256' })

      res.status(200).json({
        token,

      })
    }
    catch (error) {
      next(error)
    }
  },

}

module.exports = authController;
