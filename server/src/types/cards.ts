import { Haunt } from './haunt';

export interface ScenarioCard {
    id: number
    name: string
    description: string
    haunts: Haunt[]
}

export interface OmenCard {
    id: number
    name: string
    description: string
}
