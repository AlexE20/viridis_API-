import fb from "../config/firebase.config";

const userCollection = fb.collection("users");


export const createUser = async (userData) => {
    const newUser = {
        name: userData.name,
        lastname: userData.lastname,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        badge: fb.collection("badges").doc(userData.id_badge)
    };
    const docRef = await userCollection.add(newUser)
    return {
        message: "User added correctly",
        id: docRef.id
    };
};

export const updateUser = async (id, updatedData) => {
    const doc = await userCollection.doc(id).get();
    if (!doc.exists) {
        throw new Error('User was not found')
    }
    await doc.ref.update(updatedData)
    return {
        message: "User updated correctly",
        updatedFields: updatedData,
        id: doc.id
    };

};

export const deleteUser = async (id) => {
    const doc = await userCollection.doc(id).get();
    if (!doc.exists) {
        throw new Error("User was not found");
    }
    await doc.ref.delete();
    return {
        message: "User deleted succesfully",
        id: doc.id
    };
};



export const getUserById = async (id) => {
    const doc = await userCollection.doc(id).get();
    if (!doc.exists) {
        throw new Error("User was not found");
    }
    return { id: doc.id, ...doc.data() };
};

