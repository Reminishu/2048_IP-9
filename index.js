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
                            zeroIndex+=4
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
                            zeroIndex--
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
                            zeroIndex-=4
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
                            zeroIndex++
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
    const tile4 =document.getElementById('tile1')
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

    if(tile1)
    {
        tile1.textContent=  cell[0]
        if(cell[0] === 0){tile1.className = 'num0'}
        if(cell[0] === 2){tile1.className = 'num2'}
        if(cell[0] === 4){tile1.className = 'num4'}
        if(cell[0] === 8){tile1.className = 'num8'}
        if(cell[0] === 16){tile1.className = 'num16'}
        if(cell[0] === 32){tile1.className = 'num32'}
        if(cell[0] === 64){tile1.className = 'num64'}
        if(cell[0] === 128){tile1.className = 'num128'}
        if(cell[0] === 256){tile1.className = 'num256'}
        if(cell[0] === 512){tile1.className = 'num512'}
        if(cell[0] === 1024){tile1.className = 'num1024'}
        if(cell[0] === 2048){tile1.className = 'num2048'}
        if(cell[0] === 4096){tile1.className = 'num4096'}
        if(cell[0] === 8192){tile1.className = 'num8192'}
        if(cell[0] === 16384){tile1.className = 'num16384'}
        if(cell[0] === 32768){tile1.className = 'num32768'}
        if(cell[0] === 65536){tile1.className = 'num65536'}
        if(cell[0] === 131072){tile1.className = 'num131072'}
    }
    if(tile2)
    {
        tile2.textContent=  cell[1]
        if(cell[1] === 0){tile2.className = 'num0'}
        if(cell[1] === 2){tile2.className = 'num2'}
        if(cell[1] === 4){tile2.className = 'num4'}
        if(cell[1] === 8){tile2.className = 'num8'}
        if(cell[1] === 16){tile2.className = 'num16'}
        if(cell[1] === 32){tile2.className = 'num32'}
        if(cell[1] === 64){tile2.className = 'num64'}
        if(cell[1] === 128){tile2.className = 'num128'}
        if(cell[1] === 256){tile2.className = 'num256'}
        if(cell[1] === 512){tile2.className = 'num512'}
        if(cell[1] === 1024){tile2.className = 'num1024'}
        if(cell[1] === 2048){tile2.className = 'num2048'}
        if(cell[1] === 4096){tile2.className = 'num4096'}
        if(cell[1] === 8192){tile2.className = 'num8192'}
        if(cell[1] === 16384){tile2.className = 'num16384'}
        if(cell[1] === 32768){tile2.className = 'num32768'}
        if(cell[1] === 65536){tile2.className = 'num65536'}
        if(cell[1] === 131072){tile2.className = 'num131072'}
    }
    if(tile3)
    {
        tile3.textContent=  cell[2]
        if(cell[2] === 0){tile3.className = 'num0'}
        if(cell[2] === 2){tile3.className = 'num2'}
        if(cell[2] === 4){tile3.className = 'num4'}
        if(cell[2] === 8){tile3.className = 'num8'}
        if(cell[2] === 16){tile3.className = 'num16'}
        if(cell[2] === 32){tile3.className = 'num32'}
        if(cell[2] === 64){tile3.className = 'num64'}
        if(cell[2] === 128){tile3.className = 'num128'}
        if(cell[2] === 256){tile3.className = 'num256'}
        if(cell[2] === 512){tile3.className = 'num512'}
        if(cell[2] === 1024){tile3.className = 'num1024'}
        if(cell[2] === 2048){tile3.className = 'num2048'}
        if(cell[2] === 4096){tile3.className = 'num4096'}
        if(cell[2] === 8192){tile3.className = 'num8192'}
        if(cell[2] === 16384){tile3.className = 'num16384'}
        if(cell[2] === 32768){tile3.className = 'num32768'}
        if(cell[2] === 65536){tile3.className = 'num65536'}
        if(cell[2] === 131072){tile3.className = 'num131072'}
    }
    if(tile4)
    {
        tile4.textContent=  cell[3]
        if(cell[3] === 0){tile4.className = 'num0'}
        if(cell[3] === 2){tile4.className = 'num2'}
        if(cell[3] === 4){tile4.className = 'num4'}
        if(cell[3] === 8){tile4.className = 'num8'}
        if(cell[3] === 16){tile4.className = 'num16'}
        if(cell[3] === 32){tile4.className = 'num32'}
        if(cell[3] === 64){tile4.className = 'num64'}
        if(cell[3] === 128){tile4.className = 'num128'}
        if(cell[3] === 256){tile4.className = 'num256'}
        if(cell[3] === 512){tile4.className = 'num512'}
        if(cell[3] === 1024){tile4.className = 'num1024'}
        if(cell[3] === 2048){tile4.className = 'num2048'}
        if(cell[3] === 4096){tile4.className = 'num4096'}
        if(cell[3] === 8192){tile4.className = 'num8192'}
        if(cell[3] === 16384){tile4.className = 'num16384'}
        if(cell[3] === 32768){tile4.className = 'num32768'}
        if(cell[3] === 65536){tile4.className = 'num65536'}
        if(cell[3] === 131072){tile4.className = 'num131072'}
    }
    if(tile5)
    {
        tile5.textContent=  cell[4]
        if(cell[4] === 0){tile5.className = 'num0'}
        if(cell[4] === 2){tile5.className = 'num2'}
        if(cell[4] === 4){tile5.className = 'num4'}
        if(cell[4] === 8){tile5.className = 'num8'}
        if(cell[4] === 16){tile5.className = 'num16'}
        if(cell[4] === 32){tile5.className = 'num32'}
        if(cell[4] === 64){tile5.className = 'num64'}
        if(cell[4] === 128){tile5.className = 'num128'}
        if(cell[4] === 256){tile5.className = 'num256'}
        if(cell[4] === 512){tile5.className = 'num512'}
        if(cell[4] === 1024){tile5.className = 'num1024'}
        if(cell[4] === 2048){tile5.className = 'num2048'}
        if(cell[4] === 4096){tile5.className = 'num4096'}
        if(cell[4] === 8192){tile5.className = 'num8192'}
        if(cell[4] === 16384){tile5.className = 'num16384'}
        if(cell[4] === 32768){tile5.className = 'num32768'}
        if(cell[4] === 65536){tile5.className = 'num65536'}
        if(cell[4] === 131072){tile5.className = 'num131072'}
    }
    if(tile6)
    {
        tile6.textContent=  cell[5]
        if(cell[5] === 0){tile6.className = 'num0'}
        if(cell[5] === 2){tile6.className = 'num2'}
        if(cell[5] === 4){tile6.className = 'num4'}
        if(cell[5] === 8){tile6.className = 'num8'}
        if(cell[5] === 16){tile6.className = 'num16'}
        if(cell[5] === 32){tile6.className = 'num32'}
        if(cell[5] === 64){tile6.className = 'num64'}
        if(cell[5] === 128){tile6.className = 'num128'}
        if(cell[5] === 256){tile6.className = 'num256'}
        if(cell[5] === 512){tile6.className = 'num512'}
        if(cell[5] === 1024){tile6.className = 'num1024'}
        if(cell[5] === 2048){tile6.className = 'num2048'}
        if(cell[5] === 4096){tile6.className = 'num4096'}
        if(cell[5] === 8192){tile6.className = 'num8192'}
        if(cell[5] === 16384){tile6.className = 'num16384'}
        if(cell[5] === 32768){tile6.className = 'num32768'}
        if(cell[5] === 65536){tile6.className = 'num65536'}
        if(cell[5] === 131072){tile6.className = 'num131072'}
    }
    if(tile7)
    {
        tile7.textContent=  cell[6]
        if(cell[6] === 0){tile7.className = 'num0'}
        if(cell[6] === 2){tile7.className = 'num2'}
        if(cell[6] === 4){tile7.className = 'num4'}
        if(cell[6] === 8){tile7.className = 'num8'}
        if(cell[6] === 16){tile7.className = 'num16'}
        if(cell[6] === 32){tile7.className = 'num32'}
        if(cell[6] === 64){tile7.className = 'num64'}
        if(cell[6] === 128){tile7.className = 'num128'}
        if(cell[6] === 256){tile7.className = 'num256'}
        if(cell[6] === 512){tile7.className = 'num512'}
        if(cell[6] === 1024){tile7.className = 'num1024'}
        if(cell[6] === 2048){tile7.className = 'num2048'}
        if(cell[6] === 4096){tile7.className = 'num4096'}
        if(cell[6] === 8192){tile7.className = 'num8192'}
        if(cell[6] === 16384){tile7.className = 'num16384'}
        if(cell[6] === 32768){tile7.className = 'num32768'}
        if(cell[6] === 65536){tile7.className = 'num65536'}
        if(cell[6] === 131072){tile7.className = 'num131072'}
    }
    if(tile8)
    {
        tile8.textContent=  cell[7]
        if(cell[7] === 0){tile8.className = 'num0'}
        if(cell[7] === 2){tile8.className = 'num2'}
        if(cell[7] === 4){tile8.className = 'num4'}
        if(cell[7] === 8){tile8.className = 'num8'}
        if(cell[7] === 16){tile8.className = 'num16'}
        if(cell[7] === 32){tile8.className = 'num32'}
        if(cell[7] === 64){tile8.className = 'num64'}
        if(cell[7] === 128){tile8.className = 'num128'}
        if(cell[7] === 256){tile8.className = 'num256'}
        if(cell[7] === 512){tile8.className = 'num512'}
        if(cell[7] === 1024){tile8.className = 'num1024'}
        if(cell[7] === 2048){tile8.className = 'num2048'}
        if(cell[7] === 4096){tile8.className = 'num4096'}
        if(cell[7] === 8192){tile8.className = 'num8192'}
        if(cell[7] === 16384){tile8.className = 'num16384'}
        if(cell[7] === 32768){tile8.className = 'num32768'}
        if(cell[7] === 65536){tile8.className = 'num65536'}
        if(cell[7] === 131072){tile8.className = 'num131072'}
    }
    if(tile9)
    {
        tile9.textContent=  cell[8]
        if(cell[8] === 0){tile9.className = 'num0'}
        if(cell[8] === 2){tile9.className = 'num2'}
        if(cell[8] === 4){tile9.className = 'num4'}
        if(cell[8] === 8){tile9.className = 'num8'}
        if(cell[8] === 16){tile9.className = 'num16'}
        if(cell[8] === 32){tile9.className = 'num32'}
        if(cell[8] === 64){tile9.className = 'num64'}
        if(cell[8] === 128){tile9.className = 'num128'}
        if(cell[8] === 256){tile9.className = 'num256'}
        if(cell[8] === 512){tile9.className = 'num512'}
        if(cell[8] === 1024){tile9.className = 'num1024'}
        if(cell[8] === 2048){tile9.className = 'num2048'}
        if(cell[8] === 4096){tile9.className = 'num4096'}
        if(cell[8] === 8192){tile9.className = 'num8192'}
        if(cell[8] === 16384){tile9.className = 'num16384'}
        if(cell[8] === 32768){tile9.className = 'num32768'}
        if(cell[8] === 65536){tile9.className = 'num65536'}
        if(cell[8] === 131072){tile9.className = 'num131072'}
    }
    if(tile10)
    {
        tile10.textContent= cell[9]
        if(cell[9] === 0){tile10.className = 'num0'}
        if(cell[9] === 2){tile10.className = 'num2'}
        if(cell[9] === 4){tile10.className = 'num4'}
        if(cell[9] === 8){tile10.className = 'num8'}
        if(cell[9] === 16){tile10.className = 'num16'}
        if(cell[9] === 32){tile10.className = 'num32'}
        if(cell[9] === 64){tile10.className = 'num64'}
        if(cell[9] === 128){tile10.className = 'num128'}
        if(cell[9] === 256){tile10.className = 'num256'}
        if(cell[9] === 512){tile10.className = 'num512'}
        if(cell[9] === 1024){tile10.className = 'num1024'}
        if(cell[9] === 2048){tile10.className = 'num2048'}
        if(cell[9] === 4096){tile10.className = 'num4096'}
        if(cell[9] === 8192){tile10.className = 'num8192'}
        if(cell[9] === 16384){tile10.className = 'num16384'}
        if(cell[9] === 32768){tile10.className = 'num32768'}
        if(cell[9] === 65536){tile10.className = 'num65536'}
        if(cell[9] === 131072){tile10.className = 'num131072'}
    }
    if(tile11)
    {
        tile11.textContent= cell[10]
        if(cell[10] === 0){tile11.className = 'num0'}
        if(cell[10] === 2){tile11.className = 'num2'}
        if(cell[10] === 4){tile11.className = 'num4'}
        if(cell[10] === 8){tile11.className = 'num8'}
        if(cell[10] === 16){tile11.className = 'num16'}
        if(cell[10] === 32){tile11.className = 'num32'}
        if(cell[10] === 64){tile11.className = 'num64'}
        if(cell[10] === 128){tile11.className = 'num128'}
        if(cell[10] === 256){tile11.className = 'num256'}
        if(cell[10] === 512){tile11.className = 'num512'}
        if(cell[10] === 1024){tile11.className = 'num1024'}
        if(cell[10] === 2048){tile11.className = 'num2048'}
        if(cell[10] === 4096){tile11.className = 'num4096'}
        if(cell[10] === 8192){tile11.className = 'num8192'}
        if(cell[10] === 16384){tile11.className = 'num16384'}
        if(cell[10] === 32768){tile11.className = 'num32768'}
        if(cell[10] === 65536){tile11.className = 'num65536'}
        if(cell[10] === 131072){tile11.className = 'num131072'}
    }
    if(tile12)
    {
        tile12.textContent= cell[11]
        if(cell[11] === 0){tile12.className = 'num0'}
        if(cell[11] === 2){tile12.className = 'num2'}
        if(cell[11] === 4){tile12.className = 'num4'}
        if(cell[11] === 8){tile12.className = 'num8'}
        if(cell[11] === 16){tile12.className = 'num16'}
        if(cell[11] === 32){tile12.className = 'num32'}
        if(cell[11] === 64){tile12.className = 'num64'}
        if(cell[11] === 128){tile12.className = 'num128'}
        if(cell[11] === 256){tile12.className = 'num256'}
        if(cell[11] === 512){tile12.className = 'num512'}
        if(cell[11] === 1024){tile12.className = 'num1024'}
        if(cell[11] === 2048){tile12.className = 'num2048'}
        if(cell[11] === 4096){tile12.className = 'num4096'}
        if(cell[11] === 8192){tile12.className = 'num8192'}
        if(cell[11] === 16384){tile12.className = 'num16384'}
        if(cell[11] === 32768){tile12.className = 'num32768'}
        if(cell[11] === 65536){tile12.className = 'num65536'}
        if(cell[11] === 131072){tile12.className = 'num131072'}
    }
    if(tile13)
    {
        tile13.textContent= cell[12]
        if(cell[12] === 0){tile13.className = 'num0'}
        if(cell[12] === 2){tile13.className = 'num2'}
        if(cell[12] === 4){tile13.className = 'num4'}
        if(cell[12] === 8){tile13.className = 'num8'}
        if(cell[12] === 16){tile13.className = 'num16'}
        if(cell[12] === 32){tile13.className = 'num32'}
        if(cell[12] === 64){tile13.className = 'num64'}
        if(cell[12] === 128){tile13.className = 'num128'}
        if(cell[12] === 256){tile13.className = 'num256'}
        if(cell[12] === 512){tile13.className = 'num512'}
        if(cell[12] === 1024){tile13.className = 'num1024'}
        if(cell[12] === 2048){tile13.className = 'num2048'}
        if(cell[12] === 4096){tile13.className = 'num4096'}
        if(cell[12] === 8192){tile13.className = 'num8192'}
        if(cell[12] === 16384){tile13.className = 'num16384'}
        if(cell[12] === 32768){tile13.className = 'num32768'}
        if(cell[12] === 65536){tile13.className = 'num65536'}
        if(cell[12] === 131072){tile13.className = 'num131072'}
    }
    if(tile14)
    {
        tile14.textContent= cell[13]
        if(cell[13] === 0){tile14.className = 'num0'}
        if(cell[13] === 2){tile14.className = 'num2'}
        if(cell[13] === 4){tile14.className = 'num4'}
        if(cell[13] === 8){tile14.className = 'num8'}
        if(cell[13] === 16){tile14.className = 'num16'}
        if(cell[13] === 32){tile14.className = 'num32'}
        if(cell[13] === 64){tile14.className = 'num64'}
        if(cell[13] === 128){tile14.className = 'num128'}
        if(cell[13] === 256){tile14.className = 'num256'}
        if(cell[13] === 512){tile14.className = 'num512'}
        if(cell[13] === 1024){tile14.className = 'num1024'}
        if(cell[13] === 2048){tile14.className = 'num2048'}
        if(cell[13] === 4096){tile14.className = 'num4096'}
        if(cell[13] === 8192){tile14.className = 'num8192'}
        if(cell[13] === 16384){tile14.className = 'num16384'}
        if(cell[13] === 32768){tile14.className = 'num32768'}
        if(cell[13] === 65536){tile14.className = 'num65536'}
        if(cell[13] === 131072){tile14.className = 'num131072'}
    }
    if(tile15)
    {
        tile15.textContent= cell[14]
        if(cell[14] === 0){tile15.className = 'num0'}
        if(cell[14] === 2){tile15.className = 'num2'}
        if(cell[14] === 4){tile15.className = 'num4'}
        if(cell[14] === 8){tile15.className = 'num8'}
        if(cell[14] === 16){tile15.className = 'num16'}
        if(cell[14] === 32){tile15.className = 'num32'}
        if(cell[14] === 64){tile15.className = 'num64'}
        if(cell[14] === 128){tile15.className = 'num128'}
        if(cell[14] === 256){tile15.className = 'num256'}
        if(cell[14] === 512){tile15.className = 'num512'}
        if(cell[14] === 1024){tile15.className = 'num1024'}
        if(cell[14] === 2048){tile15.className = 'num2048'}
        if(cell[14] === 4096){tile15.className = 'num4096'}
        if(cell[14] === 8192){tile15.className = 'num8192'}
        if(cell[14] === 16384){tile15.className = 'num16384'}
        if(cell[14] === 32768){tile15.className = 'num32768'}
        if(cell[14] === 65536){tile15.className = 'num65536'}
        if(cell[14] === 131072){tile15.className = 'num131072'}
    }
    if(tile16)
    {
        tile16.textContent= cell[15]
        if(cell[15] === 0){tile16.className = 'num0'}
        if(cell[15] === 2){tile16.className = 'num2'}
        if(cell[15] === 4){tile16.className = 'num4'}
        if(cell[15] === 8){tile16.className = 'num8'}
        if(cell[15] === 16){tile16.className = 'num16'}
        if(cell[15] === 32){tile16.className = 'num32'}
        if(cell[15] === 64){tile16.className = 'num64'}
        if(cell[15] === 128){tile16.className = 'num128'}
        if(cell[15] === 256){tile16.className = 'num256'}
        if(cell[15] === 512){tile16.className = 'num512'}
        if(cell[15] === 1024){tile16.className = 'num1024'}
        if(cell[15] === 2048){tile16.className = 'num2048'}
        if(cell[15] === 4096){tile16.className = 'num4096'}
        if(cell[15] === 8192){tile16.className = 'num8192'}
        if(cell[15] === 16384){tile16.className = 'num16384'}
        if(cell[15] === 32768){tile16.className = 'num32768'}
        if(cell[15] === 65536){tile16.className = 'num65536'}
        if(cell[15] === 131072){tile16.className = 'num131072'}
    }
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

function startGame()
{
    reset()
    draw()
}

// debug
// reset()
let abr = [0]
for(let i=0; i<16; i++)
{
    abr[i] = cell[i]
}
//keyboard(); 
console.log(abr)