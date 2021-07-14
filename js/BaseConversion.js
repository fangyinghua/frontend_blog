

const codeData=[
'A','B','C','D','E',
'F','G','H','I','J',
'K','L','M','N','O',
'P','Q','R','S','T',
'U','V','W','X','Y',
'Z','a','b','c','d',
'e','f','g','h','i',
'j','k','i','m','n',
'o','p','q','r','s',
't','u','v','w','x',
'y','z','0','1','2',
'3','4','5','6','7',
'8','9','+','/'
];

// 解码
const decode=(num)=>{
    let res=0;
    const part=num.split('.');
    const part1=part[0];
    for(let i=0,len=part1.length;i<len;++i){
        const index=codeData.findIndex((item)=>item===part1[i]);
        if(index>-1){
            res+=(index*(64**(len-i-1)));
        }
    }

    //处理小数
    const part2=part[1];
    if(!part2){
        return res;
    }
    let res1=0;
    for(let i=0,len=part2.length;i<len;++i){
        const index=codeData.findIndex((item)=>item===part2[i]);
        if(index>-1){
            res1+=(index*(64**(-i-1)));
        }
    }

    return res+res1;
}

// 编码
const encode=(num)=>{
    if(num<0){
        return new RangeError('num 必须大于0的数');
    }

    //处理整数部分
    const integer=num | 0;
    const decimal=num-integer;

    let intStr='', tempInt=integer;
    while(tempInt>=64){
       const merchant=(tempInt/64)  | 0; //商
       const remainder=merchant % 64;//余数
       intStr+= codeData[merchant];
       tempInt=remainder;
    }
    intStr+= codeData[tempInt];

    //处理小数
    let tempDec=decimal,decStr='',count=0;
    const maxCount=10;

    while(tempDec>0 && count<maxCount){
        tempDec=tempDec*64;
        const merchant= tempDec | 0;//商
        const remainder=tempDec-merchant;//小数部分
        decStr+=codeData[merchant];
        count++;
        tempDec=remainder;
    }   
    return  `${intStr}.${decStr}`;
}


console.log(decode('B.GZmZmZmZo'));

console.log(encode(1.1))