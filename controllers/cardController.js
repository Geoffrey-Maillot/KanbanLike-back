const { Card, Label } = require('../models');
const utils = require('../utils')

const cardController = {

  
  createCard: async (req, res, next) => {
    try {
        // je stock les données de la nouvelle liste dans une variable...
        const newCardData = req.body
        // Que je destructure pour faire des tests dessus
        const { name, position, list_id, userId } = newCardData

        // Si il n'y a pas de nom on renvoie une erreur
        if(!name) {
     return res.status(401).json({
     "message": "le nom est invalide"
})
}
      // Je vérifie que la position n'existe pas déjà
        const card = await Card.findAll({
            where: {
        list_id,
}
        })

        const findPosition = card.filter((card) => card.position === parseInt(position, 10));

      // Si la position existe ou si elle est égal ou inférieur à 0 on renvoie une erreur
        if(findPosition.length > 0 || position <= 0) {
         return res.status(401).json({
        "message": "la position est invalide"
})
}
      // Si tous est ok on instancie et sauvegarde la liste en
        const newCard = await Card.build(newCardData)

        await newCard.save()

       // Je récupère la liste mise à jour
        const lists = await utils.findAllLists(userId)

       await res.status(200).json({newCard, lists})

    } catch (error) {
      next(error);
    }
},

  updateCard: async (req, res, next) => {
    try {
       // je stock mes nouvelles valeurs dans une variable
    const newDataCard = req.body  

    // je récupère l'id du user
    const { userId } = req.body

    // je récupère et je parse l'id du user des params
    const cardId = parseInt(req.params.id, 10)


    // je trouve ma list...
    const card = await Card.findByPk(cardId)

    // ... et je la met à jour
    await card.update(newDataCard)

   // Je récupère la liste mise à jour
        const lists = await utils.findAllLists(userId)

    // réponse avec la list mise à jour
    await res.status(200).json({card, lists})
    } catch (error) {
      next(error)
    }
},

  deleteCard: async (req, res, next) => {
    try {
       // je récupère et je parse l'id du user des params
      const cardId = parseInt(req.params.id)

      // je récupère le user
    const {userId} = req.body;

      // je trouve ma card...
    const card = await Card.findByPk(cardId)

      // et je la supprime
    await card.destroy();

     // Je récupère la liste mise à jour
        const lists = await utils.findAllLists(userId)

      // j'envoie un message de success
    await res.status(200).json({
    success: "true",
    lists
})
    } catch (error) {
      next(error)
    }
},

addLabel: async (req, res, next) => {
    try {
    // Je récupère et je parse l'id de la carte et du label
    const labelId = parseInt(req.params.labelId, 10);
    const cardId = parseInt(req.params.cardId, 10);

    // Je récupère la carte et le label de la BDD
    const card = await Card.findByPk(cardId);
    const label =await  Label.findByPk(labelId);

    // Si je ne trouve l'un des élément j'envoie une erreur
    if(!card) {
        return res.status(401).json({
    success: false,
    message: "card not found"
})
    }

    if(!label) {
              return res.status(401).json({
    success: false,
    message: "label not found"
})
    } 
    // Pour les relations NN ( belongToMany)
    // Sequelize fournis une méthode aux models qui sont reliées par une table de liaison
    // pour relier deux tables dans la table de liaison: 

    await card.addLabel(label)

     // Je récupère la liste mise à jour
        const lists = await utils.findAllLists(user_id)

    await res.status(200).json({
    "sucess": true,
    lists
})
    } catch (error) {
      next(error)
    }
    
},

removeLabel: async (req, res, next) => {
    try {
    // Je récupère et je parse l'id de la carte et du label
      const cardId  = parseInt(req.params.cardId);
      const labelId = parseInt(req.params.labelId);

      // Je récupère la carte et le label de la BDD
      const card = await Card.findByPk(cardId);
      const label = await Label.findByPk(labelId);

    // Si je ne trouve l'un des élément j'envoie une erreur
      if(!card) {
    return res.status(401).json({
    sucess: false,
    message: "card not found"
})
}

      if(!label) {
              return res.status(401).json({
    success: false,
    message: "label not found"
})
    }
     // Pour les relations NN ( belongToMany)
    // Sequelize fournis une méthode aux models qui sont reliées par une table de liaison
    // pour supprimer le champs qui relie deux tables dans la table de liaison: 
    await card.removeLabel(label);

     // Je récupère la liste mise à jour
        const lists = await utils.findAllLists(user_id)

      res.status(200).json({
    lists
})

    } catch (error) {
      next(error)
    }
}

};

module.exports = cardController;