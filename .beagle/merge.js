const { parseString, Builder } = require('xml2js')
const builder = new Builder();
const parseStringAsync = function (str) {
    return new Promise((resolve, reject) => {
        parseString(str, (err, result) => {
            if (err) reject(err);
            else resolve(result)
        })
    })
}
const path = require('path');
const fs = require('fs');

const sourceXlf = process.argv[process.argv.length - 2];
const targetXlf = process.argv[process.argv.length - 1];
if (sourceXlf && targetXlf && sourceXlf.endsWith('.xlf') && targetXlf.endsWith('.xlf')) {
    mergeXlf(path.resolve(process.cwd(), sourceXlf), path.resolve(process.cwd(), targetXlf))    
} else {
    console.warn('输入不正确')
}

async function mergeXlf(sourceXlf, targetXlf) {
    let sourceObj = null;
    let sourceItems = [];
    try {
        sourceObj = await parseStringAsync(fs.readFileSync(sourceXlf));
        sourceItems = sourceObj.xliff.file[0].body[0]['trans-unit']
    } catch (e) {
        console.warn('sourceXlf 不正确', e)
        throw e;
    }
    let targetObj = null;
    let targetItems = [];
    try {
        targetObj = await parseStringAsync(fs.readFileSync(targetXlf));
        targetItems = targetObj.xliff.file[0].body[0]['trans-unit']
    } catch (e) {
        console.warn('targetXlf 不正确', e)
        throw e;
    }
    for (let index = 0; index < targetItems.length; index++) {
        const targetItem = targetItems[index];
        if (!targetItem.target || targetItem.target.length == 0) {
            const sourceItem = sourceItems.find(sourceItem => sourceItem.source.length == targetItem.source.length && sourceItem.source[0] == targetItem.source[0]);
            if (sourceItem && sourceItem.target && sourceItem.target.length > 0) {
                const contextGroup = targetItem['context-group'];
                delete targetItem['context-group'];
                targetItem.target = sourceItem.target;
                targetItem['context-group'] = contextGroup;
            }
        }
    }
    fs.writeFileSync(targetXlf, builder.buildObject(targetObj));
}