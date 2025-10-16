import { Haunt } from "./haunt";

export class ScenarioCard {
    id: number;
    name: string
    description: string;
    haunts: Haunt[]

    constructor(id: number, name: string, description: string, haunts: Haunt[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.haunts = haunts;
    }
}

export class OmenCard {
    id: number;
    name: string
    description: string;

    constructor(id: number, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}
