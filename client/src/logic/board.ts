import type { RoomTileDirection, RoomTileRotation, RoomTileInducedCardType } from "./types";

export class House {
    groundFloor: Region;
    upperFloor: Region;
    basement: Region;

    constructor(groundFloor: Region, upperFloor: Region, basement: Region) {
        this.groundFloor = groundFloor;
        this.upperFloor = upperFloor;
        this.basement = basement;
    }
}

export class Region {
    id: string;
    name: string;
    tiles: PlacedRoomTile[];

    constructor(id: string, name: string, tiles: PlacedRoomTile[]) {
        this.id = id;
        this.name = name;
        this.tiles = tiles;
    }
}

export class RoomTile {
    id: string;
    name: string;
    validRegions: Region[];
    doorways: RoomTileDirection[];
    symbols: RoomTileInducedCardType[];

    constructor(id: string, name: string, validRegions: Region[], doorways: RoomTileDirection[], symbols: RoomTileInducedCardType[]) {
        this.id = id;
        this.name = name;
        this.validRegions = validRegions;
        this.doorways = doorways;
        this.symbols = symbols;
    }
}

export class PlacedRoomTile extends RoomTile {
    rotation: RoomTileRotation;
    x: number;
    y: number;

    constructor(roomTile: RoomTile, rotation: RoomTileRotation, x: number, y: number) {
        super(roomTile.id, roomTile.name, roomTile.validRegions, roomTile.doorways, roomTile.symbols);
        this.rotation = rotation;
        this.x = x;
        this.y = y;
    }
}
