let cell = [0]      //board array
let score = 0       //score for session
let highScore = 0   //high score
let win = false


// Initialization and reset
function reset()
{
    for(let i = 0; i<16; i++)   //initializing the board with 0
    {
        cell[i] = 0
    }
    //adding 2 starting blocks
    cell[Math.floor(Math.random() * 16)] = 2
    cell[Math.floor(Math.random() * 16)] = 2
    score = 0
}

// Input listener
function UserInput(){
document.onkeydown = function(e) {
    switch (e.keyCode) {
        //Add code to flow output where needed.
        case 37:
            alert('left');
            break;
        case 38:
            alert('up');
            break;
        case 39:
            alert('right');
            break;
        case 40:
            alert('down');
            break;
    }
};
};
// Move
function move()
{
    let headValue = 0
    let headIndex = 0
    let zeroIndex = 0
    let zeroFlag = false
    switch(Keyboard())      //keyboard() here is the listener function
    {
        case 1:     //Up
            for(let i=0; i<4; i++)
            {
                for(let j=i; j<i+13;j+=4)
                {
                    if(cell[j] !== 0 && cell[j] !== headValue)      //!0 and !head
                    {
                        if(zeroFlag)
                        {
                            
                        }
                    }
                }
            }
    }
}

// debug
reset()
console.log(cell)