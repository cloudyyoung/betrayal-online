import { Player } from '../src/logic/player';
import { PlayableCharacter } from '../src/logic/character';
import { DateTime } from 'luxon';

describe('Player', () => {
    let mockCharacter: PlayableCharacter;
    let player: Player;

    beforeEach(() => {
        // Create a mock character with typical trait scales
        mockCharacter = {
            id: 'test-character',
            name: 'Test Character',
            age: 20,
            birthday: DateTime.now(),
            description: 'A test character',
            mightScale: [0, 2, 3, 4, 5, 6, 7, 8, 8],
            startingMightIndex: 4,
            speedScale: [0, 2, 3, 4, 5, 6, 7, 8, 8],
            startingSpeedIndex: 3,
            sanityScale: [0, 2, 3, 4, 5, 6, 7, 8, 8],
            startingSanityIndex: 5,
            knowledgeScale: [0, 2, 3, 4, 5, 6, 7, 8, 8],
            startingKnowledgeIndex: 2,
        };

        player = new Player('player-1', mockCharacter);
    });

    describe('constructor', () => {
        it('should initialize with correct id', () => {
            expect(player.id).toBe('player-1');
        });

        it('should initialize with the provided character', () => {
            expect(player.character).toBe(mockCharacter);
        });

        it('should initialize team as NEUTRAL', () => {
            expect(player.team).toBe('NEUTRAL');
        });

        it('should initialize trait indices from character starting values', () => {
            expect(player.mightIndex).toBe(mockCharacter.startingMightIndex);
            expect(player.speedIndex).toBe(mockCharacter.startingSpeedIndex);
            expect(player.sanityIndex).toBe(mockCharacter.startingSanityIndex);
            expect(player.knowledgeIndex).toBe(mockCharacter.startingKnowledgeIndex);
        });
    });

    describe('trait getters', () => {
        it('should return correct might value based on index', () => {
            expect(player.might).toBe(mockCharacter.mightScale[4]);
            expect(player.might).toBe(5);
        });

        it('should return correct speed value based on index', () => {
            expect(player.speed).toBe(mockCharacter.speedScale[3]);
            expect(player.speed).toBe(4);
        });

        it('should return correct sanity value based on index', () => {
            expect(player.sanity).toBe(mockCharacter.sanityScale[5]);
            expect(player.sanity).toBe(6);
        });

        it('should return correct knowledge value based on index', () => {
            expect(player.knowledge).toBe(mockCharacter.knowledgeScale[2]);
            expect(player.knowledge).toBe(3);
        });
    });

    describe('trait updater', () => {
        it('should set might index within valid range', () => {
            player.mightIndex = 6;
            expect(player.mightIndex).toBe(6);
            expect(player.might).toBe(7);
        });

        it('should clamp might index to 0 when set below 0', () => {
            player.updateTraits({mightDelta: -5});
            expect(player.mightIndex).toBe(0);
            expect(player.might).toBe(0);
        });

        it('should clamp might index to max when set above scale length', () => {
            player.updateTraits({mightDelta: 100});
            expect(player.mightIndex).toBe(8);
            expect(player.might).toBe(8);
        });

        it('should set speed index within valid range', () => {
            player.speedIndex = 5;
            expect(player.speedIndex).toBe(5);
            expect(player.speed).toBe(6);
        });

        it('should clamp speed index to 0 when set below 0', () => {
            player.speedIndex = -3;
            expect(player.speedIndex).toBe(0);
            expect(player.speed).toBe(0);
        });

        it('should clamp speed index to max when set above scale length', () => {
            player.updateTraits({speedDelta: 50});
            expect(player.speedIndex).toBe(8);
            expect(player.speed).toBe(8);
        });

        it('should set sanity index within valid range', () => {
            player.sanityIndex = 4;
            expect(player.sanityIndex).toBe(4);
            expect(player.sanity).toBe(5);
        });

        it('should clamp sanity index to 0 when set below 0', () => {
            player.sanityIndex = -1;
            expect(player.sanityIndex).toBe(0);
            expect(player.sanity).toBe(0);
        });

        it('should clamp sanity index to max when set above scale length', () => {
            player.updateTraits({sanityDelta: 20});
            expect(player.sanityIndex).toBe(8);
            expect(player.sanity).toBe(8);
        });

        it('should set knowledge index within valid range', () => {
            player.knowledgeIndex = 7;
            expect(player.knowledgeIndex).toBe(7);
            expect(player.knowledge).toBe(8);
        });

        it('should clamp knowledge index to 0 when set below 0', () => {
            player.updateTraits({knowledgeDelta: -10});
            expect(player.knowledgeIndex).toBe(0);
            expect(player.knowledge).toBe(0);
        });

        it('should clamp knowledge index to max when set above scale length', () => {
            player.updateTraits({knowledgeDelta: 999});
            expect(player.knowledgeIndex).toBe(8);
            expect(player.knowledge).toBe(8);
        });
    });

    describe('critical state checks', () => {
        it('should identify might as critical when index is 1', () => {
            player.mightIndex = 1;
            expect(player.isMightCritical).toBe(true);
        });

        it('should not identify might as critical when index is not 1', () => {
            player.mightIndex = 0;
            expect(player.isMightCritical).toBe(false);
            player.mightIndex = 2;
            expect(player.isMightCritical).toBe(false);
        });

        it('should identify speed as critical when index is 1', () => {
            player.speedIndex = 1;
            expect(player.isSpeedCritical).toBe(true);
        });

        it('should not identify speed as critical when index is not 1', () => {
            player.speedIndex = 0;
            expect(player.isSpeedCritical).toBe(false);
            player.speedIndex = 3;
            expect(player.isSpeedCritical).toBe(false);
        });

        it('should identify sanity as critical when index is 1', () => {
            player.sanityIndex = 1;
            expect(player.isSanityCritical).toBe(true);
        });

        it('should not identify sanity as critical when index is not 1', () => {
            player.sanityIndex = 0;
            expect(player.isSanityCritical).toBe(false);
            player.sanityIndex = 4;
            expect(player.isSanityCritical).toBe(false);
        });

        it('should identify knowledge as critical when index is 1', () => {
            player.knowledgeIndex = 1;
            expect(player.isKnowledgeCritical).toBe(true);
        });

        it('should not identify knowledge as critical when index is not 1', () => {
            player.knowledgeIndex = 0;
            expect(player.isKnowledgeCritical).toBe(false);
            player.knowledgeIndex = 5;
            expect(player.isKnowledgeCritical).toBe(false);
        });
    });

    describe('death state', () => {
        it('should be dead when might index is 0', () => {
            player.mightIndex = 0;
            expect(player.isDead).toBe(true);
        });

        it('should be dead when speed index is 0', () => {
            player.speedIndex = 0;
            expect(player.isDead).toBe(true);
        });

        it('should be dead when sanity index is 0', () => {
            player.sanityIndex = 0;
            expect(player.isDead).toBe(true);
        });

        it('should be dead when knowledge index is 0', () => {
            player.knowledgeIndex = 0;
            expect(player.isDead).toBe(true);
        });

        it('should be alive when all trait indices are above 0', () => {
            player.mightIndex = 3;
            player.speedIndex = 3;
            player.sanityIndex = 3;
            player.knowledgeIndex = 3;
            expect(player.isDead).toBe(false);
        });

        it('should be dead when multiple traits are at 0', () => {
            player.mightIndex = 0;
            player.speedIndex = 0;
            expect(player.isDead).toBe(true);
        });
    });

    describe('team assignment', () => {
        it('should allow team to be set to SURVIVOR', () => {
            player.team = 'SURVIVOR';
            expect(player.team).toBe('SURVIVOR');
        });

        it('should allow team to be set to TRAITOR', () => {
            player.team = 'TRAITOR';
            expect(player.team).toBe('TRAITOR');
        });

        it('should allow team to be set back to NEUTRAL', () => {
            player.team = 'SURVIVOR';
            player.team = 'NEUTRAL';
            expect(player.team).toBe('NEUTRAL');
        });
    });

    describe('edge cases and integration', () => {
        it('should handle trait changes that bring player to critical state', () => {
            player.mightIndex = 2;
            expect(player.isMightCritical).toBe(false);
            player.mightIndex = 1;
            expect(player.isMightCritical).toBe(true);
            expect(player.isDead).toBe(false);
        });

        it('should handle trait changes that kill the player', () => {
            player.mightIndex = 1;
            expect(player.isDead).toBe(false);
            player.mightIndex = 0;
            expect(player.isDead).toBe(true);
        });

        it('should handle boundary values correctly', () => {
            // Test exact boundary at 0
            player.mightIndex = 0;
            expect(player.mightIndex).toBe(0);
            expect(player.isDead).toBe(true);

            // Reset and test exact boundary at max
            player = new Player('player-2', mockCharacter);
            player.mightIndex = 8;
            expect(player.mightIndex).toBe(8);
            expect(player.isDead).toBe(false);
        });

        it('should maintain trait values independently', () => {
            player.mightIndex = 7;
            player.speedIndex = 2;
            player.sanityIndex = 6;
            player.knowledgeIndex = 4;

            expect(player.mightIndex).toBe(7);
            expect(player.speedIndex).toBe(2);
            expect(player.sanityIndex).toBe(6);
            expect(player.knowledgeIndex).toBe(4);
        });
    });
});
