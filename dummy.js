



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
    document.onkeydown = function(e)
    {
        switch (e.keyCode)
        {
            case 37:
                alert('left');
                move(4)
                break;
            case 38:
                alert('up');
                move(1)
                break;
            case 39:
                alert('right');
                move(2)
                break;
            case 40:
                alert('down');
                move(3)
                break;
        }
    }
}

function UserInputTouch(){

    document.addEventListener('touchstart',TouchStart, false);
    document.addEventListener('touchmove', TouchMove, false );
    
    var xMov = null;
    var yMov = null;
    //Get touches. Handled by browser API
    /*function getTouches(evt){
        return evt.touches 
    }*/ 
    
    //Check and initialise if touch happened. All details in JS documentation on how to implement.
    function TouchStart(e){
        firstTouch = e.touches[0];
        xMov = firstTouch.clientX;
        yMov = firstTouch.clientY;
    }
    //Function to handle movement. The core function.
    function TouchMove(e){
        //Checks if Movement happened. If not return.
        if(!(xMov)|| !(yMov)){
            return ;
        }
        //If pass initialise up variables too. We don't initially since if above is false no need.
        var xMovUp = e.touches[0].clientX;
        var yMovUp = e.touches[0].clientY;
        //Check the displacement. Will help us figure what movement it is.
        var DistanceX = xMov - xMovUp;
        var DistanceY = yMov - yMovUp;
    
        //Main Check for movement.
        //Check Dominant movement.
        if ( Math.abs(DistanceX) > Math.abs(DistanceY) ){
            if (DistanceX > 0){
                alert("Left Swipe");
                move(4);                
            }
            else {
                alert("Right Swipe");
                move(2);
                
            }       
        }
        else {
            if (DistanceY > 0){
                alert("Up Swipe"); 
                move(1);
                          
            }
            else {
                alert("Down Swipe");
                move(3);
               
            }
        }
        //Reset Values.
        xMov = null;
        yMov = null;
    
    }
    }

// Move
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
    insert()
    console.log(cell)       //debugging
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

//Random tile insert
function insert()
{
    let arr = []        //buffer array to store indices of zeroes in board array
    for(let i=0; i<16; i++)
    {
        if(cell[i] === 0)
        {
            arr.push(i)     //appending the index of zero in buffer array
        }
    }
    //With the inbuilt random we first get an index for buffer array, we use the value stored at that index as the target index for the new tile. We again take a random value and if it's less than 0.9, we insert 2 else we insert 4, simulating a 10-90 split for 4-2 insertion.
    let f = arr[Math.floor(Math.random() * arr.length)]
    cell[f] = (Math.random( ) > 0.9 ? 4 : 2)
    console.log(f)      //debugging
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
// move()
// console.log(cell)
setInterval(keyboard, 10)
setInterval(UserInputTouch,10);
