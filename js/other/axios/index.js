import Axios from './Axios';


function createInstance(){
    const context=new Axios();
    let instance=Axios.prototype.request.bind(context);
    instance=Object.assign(instance,Axios.prototype,context)
    return instance;
}

let axios=createInstance();

export default axios;