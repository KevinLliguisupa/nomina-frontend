// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBaOJy732OocWsH0G1ODT1Gfq3iagjzvLY",
  authDomain: "projectnomina.firebaseapp.com",
  projectId: "projectnomina",
  storageBucket: "projectnomina.appspot.com",
  messagingSenderId: "865482510251",
  appId: "1:865482510251:web:08c9122021acfbb2ce8cee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function subirArchivo(file, name){
  const storageRef = ref(storage, '/empleados/imagenes/' + name);
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url;
  // .then((snapshot) => {

  //   // console.log(snapshot);
  // });
}