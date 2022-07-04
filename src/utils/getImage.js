const { ref, getDownloadURL } = require("firebase/storage");
const { storage } = require("../firebase");

export async function getImage(url) {
    const pathRef = ref(storage, url);
    const imageUrl = await getDownloadURL(pathRef);
    return imageUrl;
}
