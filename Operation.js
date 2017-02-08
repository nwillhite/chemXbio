/**
 * Created by nwillhite on 1/27/17.
 */


class Operation {

    constructor (name, id, classification, inputs)
    {
        this.NAME = name;
        this.ID = id;
        this.CLASSIFICATION = classification;
        this.INPUTS = [];
        this.INPUTS.push({OPERATION:inputs});
        this.OUTPUTS = [];

    }
    set name (name) {this.NAME = name};
    get name () {return this.NAME};
    set id (id) {this.ID = id};
    get id () {return this.ID};
    set classification (classification) {this.CLASSIFICATION = classification};
    get classification () {return this.CLASSIFICATION};
    set input (inputs) {this.INPUTS = inputs};
    get input () {return this.INPUTS};
}


class Inputs {

    constructor(type, name, volume, vunits, temp, tunits)
    {
        this.INPUT_TYPE = type;
        this.NAME = name;

    }
    set type (type) {this.INPUT_TYPE = type};
    get type () {return this.INPUT_TYPE};

}


var inputVarb = {

    INPUT_TYPE : "VARIABLE",
    VARIABLE : {
        NAME : "blood"
    }
};
