import fb from "../config/firebase.config";

const gardenCollection = fb.collection("gardens");

export const createGarden = async (gardenData) => {
    const newGarden = {
        name: gardenData.name,
        user: fb.collection("users").doc(gardenData.id_user),
        shade: fb.collection("shade_levels").doc(gardenData.id_shade)
    };
    const docRef = await gardenCollection.add(newGarden);

    return {
        message: "Garden was created correctly",
        id: docRef.id, ...newGarden
    }
};

export const getGardenByName = async (name) => {
    const snapshot = await gardenCollection.where("name", "==", name).get();
    if (snapshot.empty) {
        throw new Error(`Garden "${name}" was not found`)
    }
    const docRef=snapshot.docs[0];
    return {
        message: `Garden "${name}" was found correctly`,
        id:docRef.id,...docRef.data()
    }
};

export const updateGarden=async(id,updatedData)=>{
    const doc=await gardenCollection.doc(id).get();
    if(!doc.exists){
        throw new Error("Garden was not found")
    }
    await doc.ref.update(updatedData)
    return{
        message:'Garden was updated correctly',
        updatedFields:updatedData,
    }
};

export const deleteGarden=async(id)=>{
    const doc=await gardenCollection.doc(id).get()
    if(!doc.exists){
        throw new Error("Garden was not found ")
    }
    await doc.ref.delete();
    return{
        message:'Garden was deleted correctly '
    }
}

