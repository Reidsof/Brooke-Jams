const BLOCKS = {
    T_BLOCK : {
        colour: 'purple',
        borderColour: 'indigo',
        pivot : { x: 4, y: 1 },
        blocks: [
            { x: 4, y: 0},
            { x: 3, y: 1},
            { x: 4, y: 1},
            { x: 5, y: 1}
        ]
    },
    J_BLOCK : {
        colour: 'blue',
        borderColour: 'darkblue',
        pivot : { x: 4, y: 1 },
        blocks: [
            { x: 3, y: 0},
            { x: 3, y: 1},
            { x: 4, y: 1},
            { x: 5, y: 1}
        ]
    },
    L_BLOCK : {
        colour: 'orange',
        borderColour: 'darkorange',
        pivot : { x: 4, y: 1 },
        blocks: [
            { x: 5, y: 0},
            { x: 3, y: 1},
            { x: 4, y: 1},
            { x: 5, y: 1}
        ]
    },
    O_BLOCK : {
        colour: 'yellow',
        borderColour: 'goldenrod',
        blocks: [
            { x: 4, y: 0},
            { x: 5, y: 0},
            { x: 4, y: 1},
            { x: 5, y: 1}
        ]
    },
    S_BLOCK : {
        colour: 'green',
        borderColour: 'darkgreen',
        pivot : { x: 4, y: 1},
        blocks: [
            { x: 4, y: 0},
            { x: 5, y: 0},
            { x: 4, y: 1},
            { x: 3, y: 1}
        ]
    },
    Z_BLOCK : {
        colour: 'red',
        borderColour: 'darkred',
        pivot : { x: 4, y: 1},
        blocks: [
            { x: 3, y: 0},
            { x: 4, y: 0},
            { x: 4, y: 1},
            { x: 5, y: 1}
        ]
    },
    I_BLOCK : {
        colour: 'cyan',
        borderColour: 'darkcyan',
        pivot : { x: 4, y: 1},
        blocks: [
            { x: 4, y: 0},
            { x: 4, y: 1},
            { x: 4, y: 2},
            { x: 4, y: 3}
        ]
    }
}

export class Block
{
    constructor(block_type) {
        const block = BLOCKS[block_type];
        
        if (!block) throw new Error(
            'Unknown block type'
        );
        this.block_type = block_type;
        this.colour = block.colour;
        this.borderColour = block.borderColour;
        this.pivot = block.pivot ? { ...block.pivot } : null;
        this.blocks = block.blocks.map(part => ({ ...part }));
    }

    move(dx, dy) {
        this.blocks.forEach(part => {
            part.x += dx;
            part.y += dy;
        });
        if (this.pivot) {
            this.pivot.x += dx;
            this.pivot.y += dy;
        }
    }

    rotate() {
        if (!this.pivot) return this.blocks.map(part => ({ ...part }));
        
        const { x: px, y: py } = this.pivot;
        return this.blocks.map(part => ({
            x: px - (part.y - py),
            y: py + (part.x - px)
        }));
    }
}