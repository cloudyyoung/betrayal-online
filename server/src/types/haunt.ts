import { OmenCard, ScenarioCard } from './cards';

export type HauntTraitorCondition =
    | 'HAUNT_REVEALER'
    | 'NO_TRAITOR'
    | 'HIDDEN_TRAITOR'
    | 'LEFT_OF_THE_HAUNT_REVEALER'
    | 'OLDEST_CHARACTER'
    | 'HIGHEST_MIGHT'
    | 'HIGHEST_SPEED'
    | 'HIGHEST_KNOWLEDGE'
    | 'HIGHEST_KNOWLEDGE_OTHER_THAN_THE_HAUNT_REVEALER'
    | 'LOWEST_SANITY'
    | 'LOWEST_SANITY_OTHER_THAN_THE_HAUNT_REVEALER'
    | 'SEE_EVENT'
    | 'MOST_OMENS'

export interface Haunt {
    id: number
    name: string
    scenario: ScenarioCard
    trigger: OmenCard
    traitor: HauntTraitorCondition
}
