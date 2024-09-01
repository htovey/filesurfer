const equalStrings = (str1, str2) => {
    if (str1 === str2) {
        return true;
    }
    str1 = str1 ? str1.toLowerCase().trim() : null;
    str2 = str2 ? str2.toLowerCase().trim() : null;

    if (str1 === str2) {
        return true;
    }
    return false;
};

const equalValues= (val1, val2, varName) => {
    let compare = varName ? varName : 'no name given';
    if (val1 === val2) {
        return true;
    }
    if (typeof val1 === Array && typeof val2 === Array) {
        if (val1.length!== val2.length) {
            return false;
        }
        for (let i = 0; i < val1.length; i++) {
            if (!equalValues(val1[i], val2[i])) {
                return false;
            }
        }
        return true;
    }
    if (typeof val1 === Object || typeof val1 === 'object') {
        val1 = typeof val1 === 'object' ? new Object(val1) : val1;
        val2 = typeof val2 === 'object' ? new Object(val2) : val2;
        let obj1len = Object.keys(val1).length;
        let obj2len = Object.keys(val2).length;    
        if (obj1len != obj2len) {
            console.log(compare+' objects have different number of keys');
            let max = obj1len > obj2len ? val1 : val2;
            let min = obj1len < obj2len ? val1 : val2;
            Object.entries(max).forEach((val, key) => {
                if (Object.entries(min).indexOf(key) < 0) {
                    console.log(compare+' object missing attrib: '+key);
                }
            });
            return false;
        }
        for (let key in val1) {
            if (!equalValues(val1[key], val2[key], compare+'.'+key)) {
                console.log('unequal '+compare+' attributes for '+key+': '+val1[key]+', '+val2[key]);
                return false;
            }
        }
        return true;
    }
    return false;
}

const isNullOrEmpty = (value) => {
    if (value === null) {
        return true;
    }
    //check non primitives first
    if (value instanceof Map) {
        return value.size == 0;
    }

    if (typeof value === String || typeof value === "string") {
        return value === '' || value === ' ';
    }

    if (typeof value === "object") {
        const vals = Object.values(value);
        if (vals.length > 0) {
            for (let val in vals) {
                if (vals[val] !== '') {
                    return false;
                }
            }
        }
        return true;
    }

    if (typeof value === Array) {
        return value.length === 0;
    }
}

const isSubString = (subStr, isIn) => {
    let index = isIn.toUpperCase().indexOf(subStr.toUpperCase());
    return index >= 0;
    // return isIn.toUpperCase().indexOf(subStr.toUpperCase()) > 0;
}

export default { isNullOrEmpty, isSubString, equalValues, equalStrings };