
const game = new Phaser.Game(1080, 800, Phaser.AUTO, '', {
    preload:preload,
    create,create,
    update:update,
})

function preload(){
    
    game.image.load('bg', 'assets/work_1.jpg')
}


function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE)

    game.add.sprite(0,0,'bg')
}



function update(){}