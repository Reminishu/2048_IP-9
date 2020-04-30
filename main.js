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
    let k = 0, j = 0
    //adding 2 starting blocks
    k = j = Math.floor(Math.random() * 16)
    cell[k] = 2
    while(k === j)
    {
        j = Math.floor(Math.random() * 16)
    }
    cell[j] = 2
    score = 0
    draw()
    keyboard()
    return
}

// Input listener
function keyboard()
{
    document.onkeydown = function(e)
    {
        if(movesLeft())
        {
            // draw()
            switch (e.keyCode)
            {
                case 37:
                    console.log('left');
                    move(4)
                    break;
                case 38:
                    console.log('up');
                    move(1)
                    break;
                case 39:
                    console.log('right');
                    move(2)
                    break;
                case 40:
                    console.log('down');
                    move(3)
                    break;
            }
        }
        else
        {
            // This is loss
            console.log('lost') //debugging
        }
        draw()
    }
}


// Move tiles
function move(key)
{
    let headValue = -1      //holds the value of a unique valued block for move and merge
    let headIndex = -1      //index of the unique value
    let zeroIndex = -1      //index of first zero in sequence
    let zeroFlag = false    //flag for zero encounter
    switch(key)      //keyboard() here is the listener function
    {
        case 1:     //Up
            for(let i=0; i<4; i++)
            {
                headIndex = headValue = zeroIndex = -1      //reset value for next column
                zeroFlag = false
                for(let j=i; j<i+13; j+=4)
                {
                    if(cell[j] !== 0 && cell[j] !== headValue)      //!0 and !head, we encounter a unique non-zero value
                    {
                        headValue = cell[j]
                        headIndex = j
                        if(zeroFlag)        //there was one or a sequence of zeroes before this unique value
                        {
                            cell[zeroIndex] = cell[j]
                            cell[j] = 0
                            headIndex = zeroIndex
                            zeroIndex = j
                        }
                    }
                    else if(cell[j] === 0 && !zeroFlag)     //first zero at start or after a unique value
                    {
                        zeroFlag = true
                        zeroIndex = j
                    }
                    else if(cell[j] === headValue)      //we encounter a consecutive matching non-zero value
                    {
                        merge(j,headIndex)
                        headIndex = headValue = -1
                        zeroFlag = true
                        zeroIndex = j
                    }
                }
            }
            break

        case 2:     //Right
            for(let i=3; i<16; i+=4)
            {
                headIndex = headValue = zeroIndex = -1      //reset value for next row
                zeroFlag = false
                for(let j=i; j>i-4; j--)
                {
                    if(cell[j] !== 0 && cell[j] !== headValue)      //!0 and !head, we encounter a unique non-zero value
                    {
                        headValue = cell[j]
                        headIndex = j
                        if(zeroFlag)        //there was one or a sequence of zeroes before this unique value
                        {
                            cell[zeroIndex] = cell[j]
                            cell[j] = 0
                            headIndex = zeroIndex
                            zeroIndex = j
                        }
                    }
                    else if(cell[j] === 0 && !zeroFlag)     //first zero at start or after a unique value
                    {
                        zeroFlag = true
                        zeroIndex = j
                    }
                    else if(cell[j] === headValue)      //we encounter a consecutive matching non-zero value
                    {
                        merge(j,headIndex)
                        headIndex = headValue = -1
                        zeroFlag = true
                        zeroIndex = j
                    }
                }
            }
            break

        case 3:     //Down
            for(let i=15; i>11; i--)
            {
                headIndex = headValue = zeroIndex = -1      //reset value for next column
                zeroFlag = false
                for(let j=i; j>i-13; j-=4)
                {
                    if(cell[j] !== 0 && cell[j] !== headValue)      //!0 and !head, we encounter a unique non-zero value
                    {
                        headValue = cell[j]
                        headIndex = j
                        if(zeroFlag)        //there was one or a sequence of zeroes before this unique value
                        {
                            cell[zeroIndex] = cell[j]
                            cell[j] = 0
                            headIndex = zeroIndex
                            zeroIndex = j
                        }
                    }
                    else if(cell[j] === 0 && !zeroFlag)     //first zero at start or after a unique value
                    {
                        zeroFlag = true
                        zeroIndex = j
                    }
                    else if(cell[j] === headValue)      //we encounter a consecutive matching non-zero value
                    {
                        merge(j,headIndex)
                        headIndex = headValue = -1
                        zeroFlag = true
                        zeroIndex = j
                    }
                }
            }
            break

        case 4:     //Left
            for(let i=0; i<13; i+=4)
            {
                headIndex = headValue = zeroIndex = -1      //reset value for next row
                zeroFlag = false
                for(let j=i; j<i+4; j++)
                {
                    if(cell[j] !== 0 && cell[j] !== headValue)      //!0 and !head, we encounter a unique non-zero value
                    {
                        headValue = cell[j]
                        headIndex = j
                        if(zeroFlag)        //there was one or a sequence of zeroes before this unique value
                        {
                            cell[zeroIndex] = cell[j]
                            cell[j] = 0
                            headIndex = zeroIndex
                            zeroIndex = j
                        }
                    }
                    else if(cell[j] === 0 && !zeroFlag)     //first zero at start or after a unique value
                    {
                        zeroFlag = true
                        zeroIndex = j
                    }
                    else if(cell[j] === headValue)      //we encounter a consecutive matching non-zero value
                    {
                        merge(j,headIndex)
                        headIndex = headValue = -1
                        zeroFlag = true
                        zeroIndex = j
                    }
                }
            }
            break
            
    }
    insertTile()
    draw()
    console.log(cell)       //debugging
    return
}

// Merge similar tiles
function merge(a,b)
{
    cell[b] = cell[b]*2
    cell[a] = 0
    score+= cell[b]
    console.log(score)  //debugging
    if(cell[b] === 2048)
    {
        //win
        // alert('won')
    }
    return
}

//Random tile insert
function insertTile()
{
    let arr = []        //buffer array to store indices of zeroes in board array
    for(let i=0; i<16; i++)
    {
        if(cell[i] === 0)
        {
            arr.push(i)     //appending the index of zero in buffer array
        }
    }
    if(arr.length<1)
    {
        return
    }
    //With the inbuilt random we first get an index for buffer array, we use the value stored at that index as the target index for the new tile. We again take a random value and if it's less than 0.9, we insert 2 else we insert 4, simulating a 10-90 split for 4-2 insertion.
    let f = arr[Math.floor(Math.random() * arr.length)]
    cell[f] = (Math.random( ) > 0.9 ? 4 : 2)
    console.log(f)      //debugging
    return
}

// Valid moves remaining
function movesLeft()
{
    for(let i=0; i<4; i++)
    {
        for(let j=i; j<i+12; j+=4)
        {
            if(cell[j] === 0 || cell[j+4] ===0 || cell[j] === cell[j+4])
            {
                return true
            }
        }
    }
    for(let i=3; i<16; i+=4)
    {
        for(let j=i; j>i-3; j--)
        {
            if(cell[j] === cell[j-1])
            {
                return true
            }
        }
    }
    return false
}


// Update tile
function draw()
{
    const tile1 =document.getElementById('tile1')
    const tile2 =document.getElementById('tile2')
    const tile3 =document.getElementById('tile3')
    const tile4 =document.getElementById('tile4')
    const tile5 =document.getElementById('tile5')
    const tile6 =document.getElementById('tile6')
    const tile7 =document.getElementById('tile7')
    const tile8 =document.getElementById('tile8')
    const tile9 =document.getElementById('tile9')
    const tile10 =document.getElementById('tile10')
    const tile11 =document.getElementById('tile11')
    const tile12 =document.getElementById('tile12')
    const tile13 =document.getElementById('tile13')
    const tile14 =document.getElementById('tile14')
    const tile15 =document.getElementById('tile15')
    const tile16 =document.getElementById('tile16')

    const scoreShow = document.getElementById('Score')
    if(scoreShow){scoreShow.innerText = score.toString()}

    if(tile1){tile1.textContent=  cell[0]}
    if(tile2){tile2.textContent=  cell[1]}
    if(tile3){tile3.textContent=  cell[2]}
    if(tile4){tile4.textContent=  cell[3]}
    if(tile5){tile5.textContent=  cell[4]}
    if(tile6){tile6.textContent=  cell[5]}
    if(tile7){tile7.textContent=  cell[6]}
    if(tile8){tile8.textContent=  cell[7]}
    if(tile9){tile9.textContent=  cell[8]}
    if(tile10){tile10.textContent= cell[9]}
    if(tile11){tile11.textContent= cell[10]}
    if(tile12){tile12.textContent= cell[11]}
    if(tile13){tile13.textContent= cell[12]}
    if(tile14){tile14.textContent= cell[13]}
    if(tile15){tile15.textContent= cell[14]}
    if(tile16){tile16.textContent= cell[15]}
}


// On-screen button logic
function buttonLeft()
{
    move(4)
    draw()
}
function buttonUp()
{
    move(1)
    draw()
}
function buttonDown()
{
    move(3)
    draw()
}
function buttonRight()
{
    move(2)
    draw()
}


// debug
reset()
let abr = [0]
for(let i=0; i<16; i++)
{
    abr[i] = cell[i]
}
//keyboard(); 
console.log(abr)



//For grid to work, something like this is needed -
//domobj = function(){}
//var grid = document.CreateElement('grid)
//grid.innertext = num;
//grid.classname = 'hor' + obj
//poaition[0] + '' + 'ver' + obj
//position[1] + '' + 'num' + num;
// + some other stuff I don't quite understand