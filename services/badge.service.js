import fb from "../config/firebase.config";

const badgeCollection=fb.collection("badges")

export const createBadge=async(badgeData)=>{
    const newBadge={
        name:badgeData.name
    }
    const docRef=await badgeCollection.add(newBadge)
    return{
        message:"Badge was added correctly",
        id:docRef.id
    }
};

export const getAllBadges = async () => {
  const snapshot = await badgeCollection.get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const deleteBadge=async(id)=>{
  const doc= await badgeCollection.doc(id).get();
  if(!doc.exists){
    throw new Error('Badge was not found')
  }
  await doc.ref.delete();

  return{
    message:'Badge was deleted successfully',
    id:doc.id
  }
}