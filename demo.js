// const os = require("node:os");
// // console.log(os.networkInterfaces()[Object.keys(os.networkInterfaces())[0]][0]['mac']);
// // console.log(os.hostname());
// // console.log(os.userInfo());
// // console.log(os.arch());
// // console.log(os.cpus()[0]);
// // console.log(process.env.HOME);
// const osNetworks = os.networkInterfaces();
// const firstNetworkName = Object.keys(osNetworks)[0];
// const firstNetworkDetails = osNetworks[firstNetworkName];
// const firstNetworkMacAddress = firstNetworkDetails[0];
// console.log(firstNetworkMacAddress);

function a() {
    throw new Error("Some error");
}

function b(){
    try {
        a();
        console.log("Hi from b");
    } catch (error) {
        console.log(error.message);
    }
}

b();