export class Pokemon {

    constructor(

        private _name: string,
        private _type1: string,
        private _type2: string,
        private _hp: number,
        private _attack: number,
        private _defense: number,
        private _specialAttack: number,
        private _specialDefense: number,
        private _speed: number,
        private _description: string,
        private _photo: string,

      ) { }
    
    public get name(): string {
        return this._name;
    }

    public get type1(): string {
        return this._type1;
    }

    public get type2(): string {
        return this._type2;
    }

    public get hp(): number {
        return this._hp;
    }

    public get attack(): number {
        return this._attack;
    }

    public get defense(): number {
        return this._defense;
    }

    public get specialAttack(): number {
        return this._specialAttack;
    }

    public get specialDefense(): number {
        return this._specialDefense;
    }

    public get speed(): number {
        return this._speed;
    }

    public get description(): string {
        return this._description;
    }

    public get photo(): string {
        return this._photo;
    }

    public set name(name: string) {
        this._name = name;
    }

    public set type1(type1: string) {
        this._type1 = type1;
    }

    public set type2(type2: string) {
        this._type2 = type2;
    }

    public set hp(hp: number) {
        this._hp = hp;
    }

    public set attack(attack: number) {
        this._attack = attack;
    }

    public set defense(defense: number) {
        this._defense = defense;
    }

    public set specialAttack(specialAttack: number) {
        this._specialAttack = specialAttack;
    }

    public set specialDefense(specialDefense: number) {
        this._specialDefense = specialDefense;
    }

    public set speed(speed: number) {
        this._speed = speed;
    }

    public set description(description: string) {
        this._description = description;
    }

    public set photo(photo: string) {
        this._photo = photo;
    }

}
