class Sockets{
    constructor(id){
        this.id = id;
        this.chats = {};
    }
    getId(){
        return this.id;
    }
}



module.exports = {
    Sockets
}