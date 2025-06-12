const plantService=require('../services/userPlantService')

const getAllUserPlants=async(req,res)=>{
    const {userId,gardenId}=req.params;
    try{
        const UserPlants=await plantService.getAllUserPlantsByGarden(userId,gardenId);
        if(UserPlants.lenght==0){
            return res.status(404).json({message:'Not plants yet'})
        }
        return res.status(200).json(UserPlants)
    }catch(error){
    console.error('Error getting plants:', error);
    res.status(500).json({ message: 'Internal server error' });
    }
    
}

const deletePlantById=async(req,res)=>{
    const {userPlantId}=req.params;
    try {
        const plantDeleted=await plantService.deletePlantById(userPlantId);
        if(!plantDeleted){
            return res.status(404).json({message:'Plant was not found'})
        }
        return res.status(200).json({message:'Plant eliminated successfully'})
    } catch (error) {
            res.status(500).json({message:"Internal server error"})
    }
}

const addUserPlant=async(req,res)=>{
    const {userId, plantId, gardenId}=req.params;
    const UserPlant=plantService.addUserPlant(userId,plantId,gardenId);

    try {
        if(!UserPlant){
            return res.status(400).json({message:'Bad request'})
        }
        return res.status(200).json(UserPlant)
    } catch (error) {
        res.status(500).json({message:'Internal server error '})
    }
}



module.exports={
    getAllUserPlants,
    deletePlantById,
    addUserPlant

}