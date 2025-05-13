import fb from "../config/firebase.config";

const plantCollection = fb.collection("plants")

export const createPlant = async (plantData) => {
    const newPlant = {
        name: plantData.name,
        scientificName: plantData.scientificName,
        wattering: plantData.wattering,
        recommendations:plantData.recommendations,
        photo:plantData.photo,
        streak:plantData.streak,
        last_wattered:plantData.last_wattered,
        garden:fb.collection("gardens").doc(plantData.id_garden),
        difficulty:fb.collection("difficulties").doc(plantData.id_difficulty),
        shade_level:fb.collection("shadeLevels").doc(plantData.id_shade_level)
    }
    const docRef=await plantCollection.add(newPlant);
    return{
        message: "Plant created successfully",
        id:docRef.id,...newPlant
    }
};


export const updatePlant=async(id,updatedData)=>{
    const doc= await plantCollection.doc(id).get();
    if(!doc.exists){
        throw new Error("Plant was not found");
    }
    await doc.ref.update(updatedData)

    return{
        message:'Plant updated successfully',
        updatedFields:updatedData
    }
};

export const deletePlant=async(id)=>{
    const doc= await plantCollection.doc(id).get();
    if(!doc.exists){
        throw new Error("Plant was not found");
    }
    await doc.ref.delete();
    return{
        message:"Plant was deleted successfully",
        id:doc.id
    }
};

export const getPlantByName=async(name)=>{
    const snapshot=await plantCollection.where("name","==",name).get();
    if(snapshot.empty){
        throw new Error(`Plant "${name}" was not found `)
    }
    const docRef=snapshot.docs[0];
    return {
        message: `Plant"${name}" was found correctly`,
        id:docRef.id,...docRef.data()
    }

}

