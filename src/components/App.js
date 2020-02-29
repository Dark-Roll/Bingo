import React, { useState, useEffect } from "react";
import WinPopUp from './WinPopUp';
import BingoBlock from './BingoBlock';
import './App.css';
import { boundRecordResult } from '../actions/resultAction';
import { useSelector } from 'react-redux';


function App() {
	const [grid, setGrid] = useState([[]])
	const [circle, setCircle] = useState([])
	const [isWin, setIsWin] = useState(false)
	const [searchValue, setSearchValue] = useState(0)

	const result = useSelector(state => state.result);

	// intialize
	useEffect(()=>{
		initializeCircle()
		initializeGrid()
	}, [])

	// compute if user win
	useEffect(()=>{		
		let circledArr = circle && circle.filter(e=> e === 1)

		// there is no 3 lines when circled is less than 9 
		if( circledArr.length >= 9 ){
			computeLine()
		}
	}, [circle])

	const length = 4
	const lengthPow = length * length
	const howManyLineIsWin = 3

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

		if( rowLine + columnLine + slashLine >= howManyLineIsWin){
			showWin()
		}
	}

	const showWin = ()=>{
		boundRecordResult({
			...result,
			win: ++result.win
		})
		setIsWin(true)
	}

	const handleNumberClick = e =>{
		setCircleIndexTrue( parseInt(e.target.value) -1 )
	}

	const handleInputChange = e =>{
		setSearchValue(e.target.value)
	}

	const handleSearchClick = ()=>{
		if(searchValue > 0 && searchValue <= lengthPow){			
			setCircleIndexTrue( searchValue -1 )
		} else {
			alert( '請確認輸入數字是否正確')
		}
	}

	const setCircleIndexTrue = index => {
		let newArr = [ ...circle.slice(0, index), 1, ...circle.slice(index+1) ]
		setCircle(newArr)
	}

	// Example: grid = [ [1,1,0,0], [0,0,1,1], [], [] ]
	// grid[2] 會顯示當 x 是 2 的時候，y 的資料
	// grid[2][1] 會顯示當 x 是 2，y 是 1 的時候的資料

	const handleRestartClick =()=>{
		setIsWin(false)
		setSearchValue(0)

		initializeCircle()
		initializeGrid()
	}

	return (
		<div className="bingo__container">
			<div className="bingo__main">
				<h1> 賓果遊戲 </h1>
				<div className="search__main">
					<input className="search__input" type="number" value={searchValue} onChange={handleInputChange} placeholder={`輸入數字 1~${length*length} 以直接圈選`} />
					<button className="search__button" onClick={handleSearchClick}>圈選 </button>
				</div>

				{
					grid[1] && <BingoBlock 
						grid = {grid}
						handleNumberClick = {handleNumberClick}
						circle= {circle}
					/>
				}
			</div>
			{
				isWin && <WinPopUp handleRestartClick = {handleRestartClick} result={result}/>
			}
		</div>
	)
}

export default App;
