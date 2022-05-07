import { collection, addDoc, getDocs,getDoc,updateDoc,deleteDoc, doc, query, where, orderBy, limit } from "firebase/firestore";
import { db, storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import dayjs from 'dayjs';
import { async } from "@firebase/util";

export const fetch = async(uid = '', filterMonth=null) => {
    let q;
    if(filterMonth){
        filterMonth = filterMonth.replace("-", "/");
        // console.log(filterMonth);
        q = query(collection(db, "diaries"), 
        where("uid", "==", uid), 
        where("createdAt", ">=", filterMonth + '/01'),
        where("createdAt", "<=", filterMonth + '/31'), 
        limit(31));
    } else {
        q = query(collection(db, "diaries"), where("uid", "==", uid), orderBy("createdAt", "desc"));
    }
    

    const querySnapshot = await getDocs(q);
    let diaries = [];
    querySnapshot.forEach((doc)=>{
        console.log(doc.id, "=>", doc.data());
        diaries.push({
            id: doc.id,
            title: doc.data().title,
            body: doc.data().body,
            rate: doc.data().rate,
            image: doc.data().image,
            createdAt: doc.data().createdAt
        })
    });
    return diaries;
}

// Add a new document with a generated id.
export const postDiary = async(uid='', title='', body='', rate=1, image='') => {
    let uploadResult = '';
    // console.log('image', image);
    // console.log('image.name', image.name);
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

    console.log(dayjs().format('YYYY/MM/DD HH:mm:ss'));
    console.log(uploadResult);
    const docRef = await addDoc(collection(db, "diaries"), {
        uid: uid,
        title: title,
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


export const updateDiary = async(id = '', title='', body = '', rate = 1, image = '') => {
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
            title: title,
            body: body,
            rate: rate,
            image: uploadResult
        }
    } else {
        updateData = {
            title: title,
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

