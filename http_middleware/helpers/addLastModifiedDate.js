export function addLastModifiedDate(obj) {
    obj.lastModifiedDate = Date.now();
    return obj;
}
