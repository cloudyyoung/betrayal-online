export type RoomTileDirection = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';
export type RoomTileRotation = 0 | 90 | 180 | 270;
export type RoomTileInducedCardType = 'OMEN' | 'EVENT' | 'ITEM';

export interface House {
    groundFloor: Region
    upperFloor: Region
    basement: Region
}

export interface Region {
    id: string
    name: string
    tiles: PlacedRoomTile[]
}

export interface RoomTile {
    id: string
    name: string
    validRegions: Region[]
    doorways: RoomTileDirection[]
    symbols: RoomTileInducedCardType[]
}

export interface PlacedRoomTile extends RoomTile {
    rotation: RoomTileRotation
    x: number
    y: number
}
