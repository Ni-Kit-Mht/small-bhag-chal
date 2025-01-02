window.addEventListener('resize', drawTriangle);

function toggleSettingsMenu() {
    const settingsMenu = document.getElementById('settings-menu');
    settingsMenu.style.display = settingsMenu.style.display === 'none' ? 'block' : 'none';
  }
  
  function toggleSound() {
    const soundToggle = document.getElementById('sound-toggle');
    console.log(`Sound is now ${soundToggle.checked ? 'ON' : 'OFF'}`);
  }
  
  function adjustVolume() {
    const volumeSlider = document.getElementById('volume-slider');
    console.log(`Volume set to ${volumeSlider.value}`);
  }


function startGame() {
    const startMenu = document.getElementById('start-menu');
    const gameBoard = document.getElementById('game-board');
    
    // Hide the start menu and show the game board
    startMenu.style.display = 'none';

    gameBoard.style.display = 'flex';
    setTimeout(drawTriangle, 10);
  }
  
// Colors to be used for specific squares
const bhagColor = "red";
const bhakraColor = "yellow";

// Update to include event listeners and game state changes
function createGameBoard() {
    const gameBoard = document.getElementById('game-board');
    const totalCells = 81;
  
    const squareIndices = [13, 29, 31, 33, 45, 49, 53, 63, 67, 71];  // Array of squares to listen for clicks
    let firstClickedSquare = null;  // To track the first clicked square
    let previousClick = null;  // To track the previous click for the new behavior

    gameBoard.innerHTML = '';
  
    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.textContent = `Cell ${i + 1}`;
      
      // Add background color to the squares at specified indices
      if(i === 13) {
        cell.style.backgroundColor = bhagColor;  // Example color
      }
      if(i === 63 || i === 71 || i === 67) {
        cell.style.backgroundColor = bhakraColor;  // Example color
      }
  
      // Add event listeners for the specified squares
      if (squareIndices.includes(i)) {
        cell.style.cursor = "pointer";
        cell.addEventListener("click", (e) => handleSquareClick(e, i,cell));
        cell.addEventListener("contextmenu", (e) => {
          e.preventDefault(); // Prevent the default context menu from appearing
          handleSquareClick(e, i,cell);
        });
        //cell.addEventListener("touchstart", (e) => handleSquareClick(e, i, cell));  // Mobile support
      }
  
      gameBoard.appendChild(cell);
    }
    // Display the Game Over message
    function showGameOverMessage() {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = 'Game Over!';
        messageDiv.style.position = 'absolute';
        messageDiv.style.top = '50%';
        messageDiv.style.left = '50%';
        messageDiv.style.transform = 'translate(-50%, -50%)';
        messageDiv.style.fontSize = '30px';
        messageDiv.style.fontWeight = 'bold';
        messageDiv.style.backgroundColor = 'black';
        messageDiv.style.color = 'white';
        messageDiv.style.padding = '20px';
        document.body.appendChild(messageDiv);
        removeEventListeners();
    }
    // Remove all event listeners
    function removeEventListeners() {
        cellElements.forEach(({ cell, clickHandler, contextMenuHandler }) => {
            cell.removeEventListener("click", clickHandler);
            cell.removeEventListener("contextmenu", contextMenuHandler);
        });
    }
    // Define the surrounding squares based on the clickedSquareIndex
function getSurroundingSquares(clickedSquareIndex) {
    const surroundingSquares = {
        31: [13, 29, 33],  // When clickedSquareIndex is 31, surrounding squares are 13, 29, 33
        49: [45, 53],      // When clickedSquareIndex is 49, surrounding squares are 45, 53
    };

    return surroundingSquares[clickedSquareIndex] || [];  // Return the corresponding surrounding squares or an empty array if none
}

    // Event handler function
    function handleSquareClick(event, clickedSquareIndex, cell) {
        if(clickedSquareIndex == 31){
            const surroundingSquares = getSurroundingSquares(clickedSquareIndex);

            if(gameBoard.children[surroundingSquares[0]].style.backgroundColor == bhakraColor && gameBoard.children[surroundingSquares[1]].style.backgroundColor == bhakraColor && gameBoard.children[surroundingSquares[2]].style.backgroundColor == bhakraColor){
                if (cell.style.backgroundColor === bhagColor && clickedSquareIndex == 31) {
                    showGameOverMessage();
                }
            }
                
        } 
        if(clickedSquareIndex == 49){
            const surroundingSquares = getSurroundingSquares(clickedSquareIndex);

            if(gameBoard.children[surroundingSquares[0]].style.backgroundColor == bhakraColor && gameBoard.children[surroundingSquares[1]].style.backgroundColor == bhakraColor){
                if (cell.style.backgroundColor === bhagColor) {
                    showGameOverMessage();
                }
            }
                
        } 
               
        const clickedSquare = event.target;
        const firstSquareColor = firstClickedSquare ? firstClickedSquare.style.backgroundColor : '#f0f0f0';

        // Check if there's a previous click and apply the color change logic
        if (previousClick !== null) {
            if (previousClick === 13) {
                if (clickedSquareIndex === 45 || clickedSquareIndex === 53) {
                    // Change background color of 29 or 33 based on bhakraColor
                    const targetSquareIndex = clickedSquareIndex === 45 ? 29 : 33;
                    const targetElement = gameBoard.children[targetSquareIndex];
                    if (targetElement && targetElement.style.backgroundColor === bhakraColor) {
                        targetElement.style.backgroundColor = "#f0f0f0";
                    }
                }
            } else if (previousClick === 29) {
                if (clickedSquareIndex === 33) {
                    // Change background color of 31 based on bhakraColor
                    const targetElement = gameBoard.children[31];
                    if (targetElement && targetElement.style.backgroundColor === bhakraColor) {
                        targetElement.style.backgroundColor = "#f0f0f0";
                    }
                }
            }else if (previousClick === 45) {
                if (clickedSquareIndex === 13 || clickedSquareIndex === 53) {
                    // Change background color of 31 based on bhakraColor
                    const targetSquareIndex = clickedSquareIndex === 13 ? 29 : 49;
                    const targetElement = gameBoard.children[targetSquareIndex];
                    if (targetElement && targetElement.style.backgroundColor === bhakraColor) {
                        targetElement.style.backgroundColor = "#f0f0f0";
                    }
                }
            }else if (previousClick === 53) {
                if (clickedSquareIndex === 13 || clickedSquareIndex === 45) {
                    // Change background color of 31 based on bhakraColor
                    const targetSquareIndex = clickedSquareIndex === 13 ? 29 : 49;
                    const targetElement = gameBoard.children[targetSquareIndex];
                    if (targetElement && targetElement.style.backgroundColor === bhakraColor) {
                        targetElement.style.backgroundColor = "#f0f0f0";
                    }
                }
            }else if (previousClick === 33) {
                if (clickedSquareIndex === 29) {
                    // Change background color of 31 based on bhakraColor
                    const targetElement = gameBoard.children[31];
                    if (targetElement && targetElement.style.backgroundColor === bhakraColor) {
                        targetElement.style.backgroundColor = "#f0f0f0";
                    }
                }
            }
        }

        // If a square was previously clicked
        if (firstClickedSquare) {
            // If clicked on a square with red or yellow background, do nothing
            if (clickedSquare !== firstClickedSquare && (clickedSquare.style.backgroundColor === bhagColor || clickedSquare.style.backgroundColor === bhakraColor)) {
                return;
            }

            // If the first square's color is red or yellow, swap colors
            if (firstSquareColor === bhagColor || firstSquareColor === bhakraColor) {
                resetSquareBackground(firstClickedSquare);  // Reset first square to default
                clickedSquare.style.backgroundColor = firstSquareColor;  // Set second square to first square's color
            } else {
                // If both squares have neutral background, reset both to neutral
                if (clickedSquare.style.backgroundColor === '#f0f0f0') {
                    resetSquareBackground(firstClickedSquare);
                    clickedSquare.style.backgroundColor = '#f0f0f0';
                }
            }

            // Remove blue border from the first clicked square after swap
            removeBorder(firstClickedSquare);

            // Reset the first clicked square after swap
            firstClickedSquare = null;
        } else {
            // If it's the first square, save it and add a blue border
            firstClickedSquare = clickedSquare;
            addBlueBorder(firstClickedSquare);
        }

        // Update previous click to the current clicked square
        previousClick = clickedSquareIndex;
    }

    // Helper function to reset the square background color
    function resetSquareBackground(square) {
        square.style.backgroundColor = '#f0f0f0';  // Reset to default gray color
    }

    // Helper function to add a blue offset border to the selected square
    function addBlueBorder(square) {
        square.style.border = '4px solid blue';  // Add blue border
    }

    // Helper function to remove the blue offset border
    function removeBorder(square) {
        square.style.border = '';  // Remove the border
    }
}
  
  function drawTriangle() {
    const svg = document.getElementById('triangle-lines');
    const cells = document.querySelectorAll('.cell');
  
    function getCellCenter(cell) {
      const rect = cell.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      return { x: centerX, y: centerY };
    }
  
    // Existing triangle points
    const cell14 = cells[13];
    const cell46 = cells[45];
    const cell54 = cells[53];
  
    const point1 = getCellCenter(cell14);
    const point2 = getCellCenter(cell46);
    const point3 = getCellCenter(cell54);
    const point14 = getCellCenter(cell14);
    // New additional lines
    const cell30 = cells[29];
    const cell34 = cells[33];
    const cell32 = cells[31];
    const cell50 = cells[49];
    const cell68 = cells[67];
    const cell64 = cells[63];
    const cell72 = cells[71];
  
    const point30 = getCellCenter(cell30);
    const point34 = getCellCenter(cell34);
    const point32 = getCellCenter(cell32);
    const point50 = getCellCenter(cell50);
    const point68 = getCellCenter(cell68);
    const point64 = getCellCenter(cell64);
    const point72 = getCellCenter(cell72);
  
    svg.innerHTML = ''; // Clear previous lines
  
    function createLine(start, end) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', start.x);
      line.setAttribute('y1', start.y);
      line.setAttribute('x2', end.x);
      line.setAttribute('y2', end.y);
      line.setAttribute('stroke', 'black');
      line.setAttribute('stroke-width', '5');
      svg.appendChild(line);
    }
  
    // Draw the original triangle
    createLine(point1, point2);
    createLine(point2, point3);
    createLine(point3, point1);
  
    // Draw the new additional lines
    createLine(point30, point34); // Line joining 30 to 34
    createLine(point14, point32); // Line joining 14 to 32
    createLine(point50, point68); // Line joining 50 to 68
    createLine(point64, point72); // Line joining 64 to 72
  }
  
  // Initialize the game board and draw the triangle
  createGameBoard();
  