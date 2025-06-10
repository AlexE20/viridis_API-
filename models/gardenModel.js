class Garden{
    constructor(id,data){
        this.id=id;
        this.idUser=data.idUser;
        this.name=data.name;
        this.shadeLevel=data.shadeLevel;

    }
}

module.exports=Garden;