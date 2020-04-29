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
    keyboard()
    return
}

// Input listener
function keyboard()
{
    let z = 0
    document.onkeydown = function(e)
    {
        if(movesLeft())
        {
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
                            zeroFlag = false
                            headIndex = zeroIndex
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
                            zeroFlag = false
                            headIndex = zeroIndex
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
                            zeroFlag = false
                            headIndex = zeroIndex
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
                            zeroFlag = false
                            headIndex = zeroIndex
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
                    }
                }
            }
            break
            
    }
    insertTile()
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



// debug
reset()
let abr = [0]
for(let i=0; i<16; i++)
{
    abr[i] = cell[i]
}
//keyboard(); 
console.log(abr)

