function gameOfLife(boardWidth,boardHeight ){
    this.width = boardWidth
    this.height = boardHeight
    this.board = document.querySelector('#board')
    this.cells = []
    this.createBoard = function(){
        this.board.style.width = this.width * 10 + 'px'
        this.board.style.height = this.height * 10 + 'px'
        this.sum = this.width * this.height
        for (var i = 0; i < this.sum; i++) {
            var divs = document.createElement('div')
            divs.id = i
            this.board.appendChild(divs)
            this.cells.push(divs)
        }
        this.cells.forEach(element => {
            element.addEventListener('mouseover', function(){
                element.classList.toggle('live')
            })
        });
    }
    this.index = function(element){
        var yCoor = element.offsetTop
        var yFirst = this.cells[0].offsetTop
        var xCoor = element.offsetLeft
        var xFirst = this.cells[0].offsetLeft
        var x = (xCoor - xFirst)/10
        var y = (yCoor - yFirst)/10
        return [x, y]
    }
    this.setCellState = function(x, y, state){
        var index = (x + (y * this.width))
        var divElement = document.getElementById(index)
        if(state == 'live'){
            divElement.classList.add('live')
        }
        else if(state == 'die'){
            divElement.classList.remove('live')
        }
    }
    this.computeCellNextState = function(x, y){
        var index = (x + (y * this.width))
        var indexDiv = document.getElementById(index)
        var neighbour = []
        var neighbour1 = (x-1) +((y-1) * this.width)
        var neighbour2 = x + ((y-1) * this.width)
        var neighbour3 = (x+1) + ((y-1) * this.width)
        var neighbour4 = (x-1) + (y * this.width)
        var neighbour5 = (x+1) + (y * this.width)
        var neighbour6 = (x-1) + ((y+1) * this.width)
        var neighbour7 = x + ((y+1) * this.width)
        var neighbour8 = (x+1) + ((y+1) * this.width)
        neighbour.push(neighbour1, neighbour2, neighbour3, neighbour4, neighbour5,
            neighbour6, neighbour7, neighbour8)
        var allNeighbours = []
        neighbour.forEach(element => {
            var divNeigh = document.getElementById(element)
            allNeighbours.push(divNeigh)
        });
        var liveNeighbours = 0
        allNeighbours.forEach(element => {
            if(element != null && element.classList.contains('live')){
                liveNeighbours++
            }
        });
        var state = ''
        if(indexDiv.classList.contains('live') && liveNeighbours < 2){
            state = 'die'
        }
        else if(indexDiv.classList.contains('live') && (liveNeighbours == 2 || liveNeighbours == 3)){
            state = 'live'
        }
        else if(indexDiv.classList.contains('live') && liveNeighbours > 3){
            state = 'die'
        }
        else if(!indexDiv.classList.contains('live') && liveNeighbours == 3){
            state = 'live'
        }
        else{
            state = 'die'
        }
        return state
    }
    this.computeNextGeneration = function(){
        var futureBoard = []
        var allCells = document.querySelectorAll('#board div')
        allCells.forEach(element => {
            var cellIndex = this.index(element)
            var nextState = this.computeCellNextState(cellIndex[0], cellIndex[1])
            futureBoard.push(nextState)
        });
        return futureBoard
    }
    this.printNextGeneration = function(){
        var futureBoard = this.computeNextGeneration()
        var allCells = document.querySelectorAll('#board div')
        for(var i = 0; i < allCells.length; i++){
            var index = this.index(allCells[i])
            this.setCellState(index[0], index[1], futureBoard[i])
        }
    }
}

var playbtn = document.querySelector('#play')
playbtn.addEventListener('click', function(){
    this.disabled = true
    play = setInterval(game.printNextGeneration.bind(game), 200);
})
var pausebtn = document.querySelector('#pause')
pausebtn.addEventListener('click', function(){
    clearInterval(play)
    var playbtn = document.querySelector('#play')
    playbtn.disabled = false
})

var inputWidth = prompt("Width length:")
var inputHeight = prompt("Height length:")
var game = new gameOfLife(inputWidth, inputHeight)
game.createBoard()

