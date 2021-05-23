function testNumber() {
    var arr = new Int32Array(1);
    arr[0] = 1234;
    arr[1]
    // var buf1 = Buffer.from(arr);
    var buf2 = Buffer.from(arr.buffer,'hex');
    // console.log("buf1:", buf1);
    console.log("buf2:", buf2);
    buf2.writeInt32BE(1234);
    console.log("buf3:", buf2);
    buf2.writeUInt32LE(1234);
    console.log("buf3:", buf2);
};
testNumber();