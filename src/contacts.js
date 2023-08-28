// import localforage from "localforage";
import { matchSorter } from "match-sorter";

let contacts = [
{"id":1,"title":"起床","audio":1},
{"id":2,"title":"更衣","audio":1},
{"id":3,"title":"招呼","audio":1},
{"id":4,"title":"盥洗","audio":1},
{"id":5,"title":"洗澡","audio":1},
{"id":7,"title":"就寝","audio":1},
{"id":8,"title":"放学回家","audio":1},
{"id":9,"title":"过得如何","audio":1},
{"id":10,"title":"介绍同学朋友","audio":1},
{"id":11,"title":"学校情况","audio":1},
{"id":12,"title":"社团","audio":1},
{"id":13,"title":"运动会","audio":1},
{"id":14,"title":"餐前准备","audio":0},
{"id":15,"title":"用餐时","audio":0},
{"id":16,"title":"外出用餐","audio":0},
{"id":17,"title":"零食点心","audio":1}
];

export async function getContacts(query) {
  await fakeNetwork(`getContacts:${query}`);
  // for (let i = 0; i < 13; i++) {
  //   let contact = { id, createdAt: Date.now() };
  // }
  // let contacts = await localforage.getItem("contacts");
  // if (!contacts) contacts = [];
  if (query) {
    return matchSorter(contacts, query, { keys: ["id","title"] });
  }
  return contacts;
}

// export async function createContact() {
//   await fakeNetwork();
//   let id = Math.random().toString(36).substring(2, 9);
//   let contact = { id, createdAt: Date.now() };
//   let contacts = await getContacts();
//   contacts.unshift(contact);
//   await set(contacts);
//   return contact;
// }

export async function getContact(id) {
  await fakeNetwork(`contact:${id}`);
  // let contacts = await localforage.getItem("contacts");
  let contact = contacts.find(contact => contact.id === Number(id));
  return contact ?? null;
}

// export async function deleteContact(id) {
//   let contacts = await localforage.getItem("contacts");
//   let index = contacts.findIndex(contact => contact.id === id);
//   if (index > -1) {
//     contacts.splice(index, 1);
//     await set(contacts);
//     return true;
//   }
//   return false;
// }

// function set(contacts) {
//   return localforage.setItem("contacts", contacts);
// }

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}
