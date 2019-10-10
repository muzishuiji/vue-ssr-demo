import axios from 'axios';
import dataList from './data'
export function fetchItem(id) {
    console.log(id, dataList.list.find(item => item.id == id))
    return Promise.resolve(dataList.list.find(item => item.id == id));
}
export function fetchList() {
    return Promise.resolve(dataList);
}
