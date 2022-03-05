const { List } = require('../models');

  // Méthode qui recherche toute les liste d'un user
  // Je la met dans un fichier à part pour l'appeller plus facilement
  // car je veux renvoyer mes listes à chaque requête.
 exports.findAllLists = (userId) => {
      const lists = List.findAll({
        where: {
        user_id: userId
      },
        include: {
          association: "cards",
          include: "labels"
      },
        order: [
        ["position", "ASC"],
        ["cards", "position", "ASC"]
        ]
  })
     return lists
 }