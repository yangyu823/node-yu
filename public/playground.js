const os = require('os');
const fs = require('fs');
const {promisify} = require('util');
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const beep = () => process.stdout.write("\x07");
const delay = (second) => new Promise((resolves => {
    setTimeout(resolves, second * 1000);
}));
const myobj = {};
// console.log(os.cpus());
// console.log(os.freemem());
// console.log(os.homedir());
function doA() {
    return new Promise(((resolve, reject) => {
        fs.readFile('./public/hello.txt', (err, data) => {
            if (!err) {
                resolve(data.toString())
            }
        });
    }))
}
function doB() {
    return new Promise(((resolve, reject) => {
        fs.readFile('./public/helloworld.txt', (err, data) => {
            if (!err) {
                resolve(data.toString())
            }
        });
    }))
}
async function test() {
    myobj['data1'] = await doA();
    myobj['data2'] = await doB();
    console.log(myobj)
}
console.log('test',myobj);
test();

// Async process playground
const SequentialTest = async ()=>{
    console.log('starting');
    await delay(1);
    console.log('waiting');
    await delay(2);
    await writeFile('file.txt', 'Sample File ....');
    beep();
    console.log('file.txt created ');
    await delay(3);
    await unlink('file.txt');
    beep();
    console.log('file.txt removed');
};

SequentialTest();