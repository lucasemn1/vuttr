const crypto = require('crypto');
const fs = require('fs');
const path = require('path')

function generateToken() {
    return crypto.randomBytes(40).toString('hex');
}

function readFile() {
    try {
        const localFile = path.join(__dirname, '..', '..', '.env');

        let fileString = fs.readFileSync(localFile, 'utf8');

        return fileString;
    }
    catch(err) {
        const localFile = path.join(__dirname, '..', '..', '.env.example');

        let fileString = fs.readFileSync(localFile, 'utf8');

        return fileString;
    }
}

function saveFile(fileData) {
    const localFile = path.join(__dirname, '..', '..', '.env');

    try{
        fs.writeFileSync(localFile, fileData, 'utf8');
        return true;
    }
    catch(err) {
        console.error(err);
        return false;
    }
}

function transformArrayInUniqueString(array) {
    let newDataFile = '';
    array.forEach( line => {
        newDataFile += `${line} \n`
    });

    return newDataFile;
}

function saveIfKeyFieldExists(contentInStringArray = []) {
    const newLines = contentInStringArray.map( line => {
        if( line.substring(0, 7) === 'APP_KEY' ) {
            return `APP_KEY=${generateToken()}`
        }

        return line;
    });

    const newDataFile = transformArrayInUniqueString(newLines);

    return saveFile(newDataFile);
}

function saveIfKeyFieldNotExists(contentInStringArray = []) {
    contentInStringArray.push(`APP_KEY=${generateToken()}`);

    const newDataFile = transformArrayInUniqueString(contentInStringArray);

    return saveFile(newDataFile);
}

function saveKey() {
    const fileString = readFile();
    const fileStringLines = fileString.split('\n');

    let keyExists = false;

    for( line of fileStringLines ) {
        if( line.substring(0, 7) === 'APP_KEY' ) {
            keyExists = true;
        }
    }

    if(keyExists) {
        return saveIfKeyFieldExists(fileStringLines);
    }
    else {
        return saveIfKeyFieldNotExists(fileStringLines);
    }
}

if(saveKey()) {
    console.log('APP_KEY SUCCESSFULLY GENERATED!')
}
else {
    console.error('ERROR GENERATING APP_KEY')
}