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
	const [length, setLength] = useState(4)
	const [isEasterEggShow, setIsEasterEggShow ] = useState(false)
	const [lengthPow, setLengthPow ] = useState(length*length)

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

	// change grid size
	useEffect(()=>{
		initializeGrid()
		initializeCircle()
	}, [lengthPow])

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
			
		if(intArr.length > 0){
			return createRandomArray(intArr, resultArr)
		} else{
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

	const handleLengthInputChange = e =>{
		setLength(e.target.value)
		if( parseInt(e.target.value) >0 ){
			setLengthPow( e.target.value* e.target.value )
		}
	}

	const handleNumberClick = e =>{
		setCircleIndexTrue( parseInt(e.target.value) -1 )
	}

	const handleSearchInputChange = e =>{
		setSearchValue( parseInt(e.target.value) )
		if( parseInt(e.target.value) === -1 ){
			setIsEasterEggShow(true)
		}
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
				<p> 請直接點選數字圈選或輸入數字圈選 </p>
				<p> 連線連成三條即獲勝 </p>
				<p style={{fontSize: '.7rem', textAlign:'end', color:'gray'}}>何不試試看負數</p>
				<div className="search__main">
					<input className="search__input" type="number" value={searchValue} onChange={handleSearchInputChange} placeholder={`輸入數字 1~${length*length} 以直接圈選`} />
					<button className="search__button" onClick={handleSearchClick}>圈選 </button>
				</div>

				{
					grid[1] && <BingoBlock 
						grid = {grid}
						handleNumberClick = {handleNumberClick}
						circle= {circle}
					/>
				}
				{
					isEasterEggShow && <div>
						<span> 賓果大小(x乘x)： </span>
						<input value={length} onChange={handleLengthInputChange} style={{marginTop: '2rem'}} />
					</div>
				}
			</div>
			{
				isWin && <WinPopUp handleRestartClick = {handleRestartClick} result={result}/>
			}
		</div>
	)
}

export default App;
