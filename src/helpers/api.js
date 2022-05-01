import { collection, addDoc, getDocs,getDoc,updateDoc,deleteDoc, doc, query, where, orderBy } from "firebase/firestore";
import { db, storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import dayjs from 'dayjs';
import { async } from "@firebase/util";

export const fetch = async(uid = '') => {
    const q = query(collection(db, "diaries"), where("uid", "==", uid), orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(q);
    let diaries = [];
    querySnapshot.forEach((doc)=>{
        console.log(doc.id, "=>", doc.data());
        diaries.push({
            id: doc.id,
            body: doc.data().body,
            rate: doc.data().rate,
            image: doc.data().image,
            createdAt: doc.data().createdAt
        })
    });
    return diaries;
}

// Add a new document with a generated id.
export const postDiary = async(uid='', body='', rate=1, image=null) => {
    let uploadResult = '';
    if(image){
        const storageRef = ref(storage);
        const ext = image.name.split('.').pop();
        const hashName = Math.random().toString(36).slice(-8);
        const fullPath = '/images/' + hashName + '.' + ext;
        const uploadRef = ref(storageRef, fullPath);

        // 'file' comes from the Blob or File API
        await uploadBytes(uploadRef, image).then(async function(result) {
            console.log(result);
            console.log('Uploaded a blob or file!');

            await getDownloadURL(uploadRef).then(function(url){
                uploadResult = url;
            });
        });
    }

    console.log(dayjs().format('YYYY/MM/DD HH:mm:ss'));
    const docRef = await addDoc(collection(db, "diaries"), {
        uid: uid,
        rate: rate,
        body: body,
        image: uploadResult,
        createdAt: dayjs().format('YYYY/MM/DD HH:mm:ss')
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id ? true : false;
}

export const getDiary = async(id = 'test') => {
    const docRef = doc(db, "diaries", id);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
    } else {
        console.log("there is no data");
        return false;
    }
}


export const updateDiary = async(id = '', body = '', rate = 1, image = '') => {
    let uploadResult = '';
    if(image.name){
        const storageRef = ref(storage);
        const ext = image.name.split('.').pop();
        const hashName = Math.random().toString(36).slice(-8);
        const fullPath = '/images/' + hashName + '.' + ext;
        const uploadRef = ref(storageRef, fullPath);

        // 'file' comes from the Blob or File API
        await uploadBytes(uploadRef, image).then(async function(result) {
            console.log(result);
            console.log('Uploaded a blob or file!');

            await getDownloadURL(uploadRef).then(function(url){
                uploadResult = url;
            });
        });
    }

    const diaryRef = doc(db, "diaries", id);
    if( !diaryRef ){ return false; }
    let updateData;
    if(image.name){
        updateData = {
            body: body,
            rate: rate,
            image: uploadResult
        }
    } else {
        updateData = {
            body: body,
            rate: rate
        }
    }
    await updateDoc(diaryRef, updateData);

    return true;
}

export const deleteDiary = async(id) => {
    if(!id) { return false; }
    await deleteDoc(doc(db, "diaries", id));
    return true;
}

