const { Label } = require('../models');
const utils = require('../utils')

const labelController = {

  getLabel: async (_, res, next) => {
  try {
    const labels = await Label.findAll();
    await res.status(200).json({labels})
  } catch (error) {
    next(error)
  }
},

  createLabel: async (req, res, next) => {
    try {
        // je stock les données de la nouvelle liste dans une variable...
        const newLabelData = req.body
    
        const newLabel = await Label.build(newLabelData)

        await newLabel.save()

       await res.status(200).json({newLabel})

    } catch (error) {
      next(error);
    }
},

  updateLabel: async (req, res, next) => {
    try {
       // je stock mes nouvelles valeurs dans une variable
    const newLabelData = req.body  
    // je récupère et je parse l'id du user des params
    const labelId = parseInt(req.params.id, 10)


    // je trouve le label...
    const label = await Label.findByPk(labelId)

    // ... et je la met à jour
    await label.update(newLabelData)

    // réponse avec la list mise à jour
    await res.status(200).json({label})
    } catch (error) {
      next(error)
    }
},

  deleteLabel: async (req, res, next) => {
    try {
       // je récupère et je parse l'id du user des params
      const labelId = parseInt(req.params.id)

      // je trouve ma card...
    const label = await Label.findByPk(labelId)

      // et je la supprime
    await label.destroy();
      // j'envoie un message de success
    await res.status(200).json({
    success: "true"
})
    } catch (error) {
      next(error)
    }
}

};

module.exports = labelController;