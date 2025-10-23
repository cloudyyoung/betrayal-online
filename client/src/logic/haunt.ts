import { OmenCard, ScenarioCard } from "./cards";
import { HauntTraitorCondition } from "./types";

export class Haunt {
    id: number;
    name: string;
    scenario: ScenarioCard
    trigger: OmenCard
    traitor: HauntTraitorCondition

    constructor(id: number, name: string, scenario: ScenarioCard, trigger: OmenCard, traitor: HauntTraitorCondition) {
        this.id = id;
        this.name = name;
        this.scenario = scenario;
        this.trigger = trigger;
        this.traitor = traitor;
    }
}