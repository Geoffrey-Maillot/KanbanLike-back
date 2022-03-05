const { List } = require('../models');
const utils = require('../utils')

const listController = {

  getList: async (req , res, next) => {
    try {
      // je récupère l'id du user
      const userId = req.params.id
      // je trouve toutes les listes qui lui sont associées
      const lists = await List.findAll({
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

      res.status(200).json({lists})
    } catch (error) {
      next(error)
    }
  },

  createList: async (req, res, next) => {
    try {
        // je stock les données de la nouvelle liste dans une variable...
        const newListData = req.body
        // Que je destructure pour faire des tests dessus
        const { name, position, user_id } = newListData

    // Si il n'y a pas de nom on renvoie une erreur
        if(!name) {
     return res.status(401).json({
     "message": "le nom est invalide"
})
}
      // Je vérifie que la position n'existe pas déjà
        const checkList = await List.findAll({
            where: {
              user_id,
        }
        });

        const findPosition = checkList.filter((list) => list.position === parseInt(position, 10));

      // Si la position existe ou si elle est égal ou inférieur à 0 on renvoie une erreur
        if(findPosition.length > 0 || position <= 0) {
         return res.status(401).json({
        "message": "la position est invalide"
})
}
      // Si tous est ok on instancie et sauvegarde la liste en
        const newList = await List.build(newListData)

        await newList.save()

      // Je récupère la liste mise à jour
        const lists = await utils.findAllLists(user_id)

       await res.status(200).json({newList, lists})

    } catch (error) {
      next(error);
    }
},

  updateList: async (req, res, next) => {
    try {
       // je stock mes nouvelles valeurs dans une variable
    const newDataList = req.body
      // je récupère l'id du user
    const {userId} = req.body  
    // je récupère et je parse l'id de la liste des params
    const listId = parseInt(req.params.id)

    // je trouve ma list...
    const findList = await List.findByPk(listId)
    // ... et je la met à jour
    await findList.update(newDataList)

  // Je récupère la liste mise à jour
        const lists = await utils.findAllLists(userId)

    // réponse avec la liste mise à jour
    await res.status(200).json({findList, lists})
    } catch (error) {
      next(error)
    }
},

  deleteList: async (req, res, next) => {
    try {
       // je récupère et je parse l'id du user des params
      const listId = parseInt(req.params.id)
      const {userId} = req.body
   
      // je trouve ma list...
    const list = await List.findByPk(listId)

      // et je la supprime
    await list.destroy();

      // Je récupère la liste mise à jour
        const lists = await utils.findAllLists(userId)

      // j'envoie un message de success avec les listes
    await res.status(200).json({
    success: "true",
    lists
})
    } catch (error) {
      next(error)
    }
}

};

module.exports = listController;