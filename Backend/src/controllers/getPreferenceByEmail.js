const { findPreferenceById } = require("../services/preferenceService")


const getPreferenceByEmailBD = async (req, res) => {
    console.log('Esto es query by id', req.query)
    try {
        const { id } = req.query
        const search = await findPreferenceById(id)
        console.log(search)
        res.status(200).json(search)
    } catch (error) {
        res.status(500).json(error.message)
    }

}

module.exports = getPreferenceByEmailBD