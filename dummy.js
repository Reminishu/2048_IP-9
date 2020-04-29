function UserInputTouch(){

document.addEventListener('touchstart',TouchStart, false);
document.addEventListener('touchmove', TouchMove, false );
alert("Dummy is active!")
var xMov = null;
var yMov = null;
//Get touches.
function getTouches(evt){
    return evt.touches 
}
//Check and initialise if touch happened. All details in JS documentation on how to implement.
function manageTouchStart(){
    firstTouch = getTouches(evt)[0];
    xMov = firstTouch.clientX;
    yMov = firstTouch.clientY;
}
//Function to handle movement. The core function.
function manageTouchMove(){
    //Checks if Movement happened. If not return.
    if(!(xMov)|| !(yMov)){
        return ;
    }
    //If pass initialise up variables too. We don't initially since if above is false no need.
    var xMovUp = evt.touches[0].clientX;
    var yMovUp = evt.touches[0].clientY;
    //Check the displacement. Will help us figure what movement it is.
    var DistanceX = xMov - xMovUp;
    var DistanceY = yMov - yMovUp;

    //Main Check for movement.
    //Check Dominant movement.
    if ( Maths.abs(DistanceX) > Maths.abs(DistanceY) ){
        if (DistanceX > 0){
            alert("Left Swipe");
        }
        else {
            alert("Right Swipe");
        }       
    }
    else {
        if (DistanceY > 0){
            alert("Up Swipe");            
        }
        else {
            alert("Down Swipe");
        }
    }
    //Reset Values.
    xMov = null;
    yMov = null;

}
}