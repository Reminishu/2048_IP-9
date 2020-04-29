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
    return
}

// Input listener
function keyboard()
{
    return 4
}

// Move
function move()
{
    let headValue = -1      //holds the value of a unique valued block for move and merge
    let headIndex = -1      //index of the unique value
    let zeroIndex = -1      //index of first zero in sequence
    let zeroFlag = false    //flag for zero encounter
    switch(keyboard())      //keyboard() here is the listener function
    {
        case 1:     //Up
            for(let i=0; i<4; i++)
            {
                headIndex = headValue = zeroIndex = -1      //reset value for next column
                zeroFlag = false
                for(let j=i; j<i+13;j+=4)
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
                for(let j=i; j>i-4;j--)
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
                for(let j=i; j>i-13;j-=4)
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
                for(let j=i; j<i+4;j++)
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
    return
}

// Merge
function merge(a,b)
{
    cell[b] = cell[b]*2
    cell[a] = 0
    score+= cell[b]
    if(cell[b] === 2048)
    {
        //win
    }
    return
}

// debug
reset()
let abr = [0]
for(let i=0; i<16; i++)
{
    abr[i] = cell[i]
}
console.log(abr)
move()
console.log(cell)