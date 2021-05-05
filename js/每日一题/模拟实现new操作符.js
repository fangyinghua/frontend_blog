function new_object() {
    const Constructor=[].shift().call(arguments);
    const obj=Object.create(Constructor.prototype);
    const res=Constructor.apply(this,arguments);
    return res instanceof Object?res:obj;
}