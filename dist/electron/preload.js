"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    storeGet: (key) => electron_1.ipcRenderer.invoke('store-get', key),
    storeSet: (key, value) => electron_1.ipcRenderer.invoke('store-set', key, value),
    storeDelete: (key) => electron_1.ipcRenderer.invoke('store-delete', key),
});
