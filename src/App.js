import React, { useState, useEffect } from "react";
import './App.css';

function App() {
	const [grid, setGrid] = useState([[]])
	const [circle, setCircle] = useState([])
	const [isWin, setIsWin] = useState(true)
	const [searchValue, setSearchValue] = useState(0)


	// intialize
	useEffect(()=>{

		initializeCircle()
		initializeGrid()
	}, [])

	const length = 4
	const lengthPow = length * length

	const initializeCircle = ()=>{
		let arr = []
		for (let index = 0; index < lengthPow; index++) {
			arr[index] = 0
		}
		setCircle(arr)

	}

	const initializeGrid = ()=>{
		let intArr =[]
		let resultArr = []
		for (let index = 0; index < lengthPow; index++) {
			intArr[index] = index +1
		}

		console.log( createRandomArray(intArr, resultArr) )
		console.log( createRandomArray(intArr, resultArr) )
		let randomArr = createRandomArray(intArr, resultArr)

		let gridArr = []
		let nthRow = 0
		for (let index = 0; index < lengthPow; index++) {
			// fills one x with y of length
			if(index % length ===0 ){
				if(index !== 0){
					++nthRow
				}
				gridArr.push([randomArr[index]])
			} else{
				gridArr[nthRow].push(randomArr[index])
			}			
		}

		setGrid(gridArr)
	}

	const createRandomArray = (intArr, resultArr= [])=>{

		let randomNum = Math.floor(Math.random() * 100 % intArr.length)
		resultArr.push(intArr[randomNum])
		intArr.splice(randomNum, 1)
	
		console.log(intArr);
		
		if(intArr.length > 0){
			createRandomArray(intArr, resultArr)
			console.log("length > 0, intArr is:", intArr);
		} else{
			console.log("length =< 0, intArr is:", intArr);
			return resultArr
		}

	}

	const computeLine = ()=>{
		
		let rowLine = 0
		let columnLine = 0
		let slashLine = 0

		// calculate row line
		for (let x = 0; x < length; x++) {
			
			let ColumnArr = grid[x].filter(e=> circle[e-1] === 0 )
			// or grid[x].includes(0) === false, line++

			if(ColumnArr.length === 0){
				++columnLine
			}			
		}
		console.log(columnLine);

		// calculate row line
		for (let y = 0; y < length; y++) {
			let includesZero = false

			for (let x = 0; x < length; x++) {
				if (circle[grid[x][y]-1] === 0 ){
					includesZero = true
				}				
			}
			if(includesZero === false){
				++rowLine
			}
		}
		console.log(rowLine);

		// calculate slash line
		let includesZero = false
		for (let x = 0; x < length; x++) {
			if(circle[grid[x][x]-1] === 0 ){
				includesZero = true
			}
		}
		if( includesZero === false ){
			++slashLine
		}
		console.log(slashLine);


		// calculate backslash line
		includesZero = false
		for (let x = 0; x < length; x++) {
			// length has to substract 1
			if(circle[grid[x][length - x -1]-1] === 0 ){
				includesZero = true
			}
		}
		if( includesZero === false ){
			++slashLine
		}
		console.log(slashLine);

		if( rowLine + columnLine + slashLine >= 3){
			showWin()
		}
	}

	const showWin = ()=>{
		setIsWin(true)
	}

	const handleInputChange = e =>{
		setSearchValue(e.target.value)
		if(e.target.value>0 && e.target.value<= lengthPow){
			
			let changeIndex = e.target.value -1 
			let newArr = [ ...circle.slice(0, changeIndex), 1, ...circle.slice(changeIndex+1) ]
			console.log(newArr);
			setCircle(newArr)
		}
	}

	// Example: grid = [ [1,1,0,0], [0,0,1,1], [], [] ]
	// grid[2] 會顯示當 x 是 2 的時候，y 的資料
	// grid[2][1] 會顯示當 x 是 2，y 是 1 的時候的資料

	const handleNumberClick = e =>{
		
		let changeIndex = parseInt(e.target.value) -1 
		let newArr = [ ...circle.slice(0, changeIndex), 1, ...circle.slice(changeIndex+1) ]
		console.log(newArr);
		setCircle(newArr)
	}

	const handleRestartClick =()=>{
		setIsWin(false)
		setSearchValue(0)

		initializeCircle()
		initializeGrid()
	}

	return (
		<>
			<div>

				{/* show */}
				數字 1~ 16 被圈的，不是 x y，這是 circle
				<br />
				{circle.slice(0, 4).join(' ')}
				<br/>
				{circle.slice(4, 8).join(' ')}
				<br/>
				{circle.slice(8, 12).join(' ')}
				<br/>
				{circle.slice(12, 16).join(' ')}
				<br/>
				<button onClick={computeLine}> compute </button>
			</div>
			<div>
				{
					grid[1] && <>
						<p> 這是 bingo 陣列 </p>
						<input type="number" value={searchValue} onChange={handleInputChange} placeholder={`輸入數字 1~${length*length} 以直接圈選`} />
						<br />
						
						{grid[0].map( (e, i) => <button style={{display: 'inline-block', width:'30px', textAlign: 'center'}}
							className={circle[parseInt(e)-1] === 1 ? 'circled' : '' }
							value={e}
							onClick={handleNumberClick}
							key={i}
						>
							{ e} 
						</button>)}
						<br/>
						{grid[1].map( (e, i)=> <button style={{display: 'inline-block', width:'30px', textAlign: 'center'}}
							className={circle[parseInt(e)-1] === 1 ? 'circled' : '' }
							value={e}
							onClick={handleNumberClick}
							key={i}
						>
							{ e} 
						</button>)}
						<br/>
						{grid[2].map( (e, i)=> <button style={{display: 'inline-block', width:'30px', textAlign: 'center'}}
							className={circle[parseInt(e)-1] === 1 ? 'circled' : '' }
							value={e}
							onClick={handleNumberClick}
							key={i}
						>
							{ e} 
						</button>)}
						<br/>
						{grid[3].map( (e, i)=> <button style={{display: 'inline-block', width:'30px', textAlign: 'center'}}
							className={circle[parseInt(e)-1] === 1 ? 'circled' : '' }
							value={e}
							onClick={handleNumberClick}
							key={i}
						>
							{ e} 
						</button>)}
					</>
				}
			</div>
			{
				isWin && <div className="victoryContainer">
					{/* 重新開始按鈕放在蓋板內 */}
					<p> You win </p>
					<button onClick={handleRestartClick}>Restart</button>
				</div>
			}

		</>
	)
}

export default App;
