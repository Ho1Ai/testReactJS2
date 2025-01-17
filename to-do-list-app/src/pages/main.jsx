import React, { useState, useEffect } from 'react'
import EachContainer from '../jsxComponents/toDoEachContainer';
import AddNewToDo from '../jsxComponents/bodyAddNewToDo';


const MainPage = () => {
    let keyMaker = 0; //I used arr.map(child...), so EachContainer needs keys

    const colorSymbolArray = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F']   // color generator array. Always new color. 
    
    const generateNewCL = () => {
        let newCL=`#`
        for (let i = 0; i<6; i++) {
            newCL+=`${colorSymbolArray[Math.round(Math.random()*(colorSymbolArray.length-1))]}`
        }
        return newCL
    } //color generator function. It generates HEX color 
    
    let [arr, setArr]=useState([])

    useEffect(()=>{
        try{
            setArr(JSON.parse(localStorage.getItem('to-do array'))) // не думаю, что это лучший вариант для подгрузки каких-то данных из памяти
        } catch (error) {
            console.log(error);
        }
    }, [])

    const pushNewAction = (title) => {
        setArr(prev => {
            const newArr = [...prev, {name: title, color: generateNewCL()}]
            localStorage.setItem('to-do array', JSON.stringify(newArr))
            return newArr;
        });
    }

    const removeAnAction = (num) => {
        setArr(oldArr => {
            const newArr = oldArr.filter((_,index) => index!==(num-1))
            localStorage.setItem('to-do array', JSON.stringify(newArr)) 
            return newArr;
        })
    }



    return (
        <>
            <section className='mainActivity'>
                <AddNewToDo pushing = {pushNewAction}/>
                {arr == undefined ? console.log("nothing") : arr.map(child => {
                    keyMaker++;
                    return (<EachContainer name={child.name} color={child.color} key={keyMaker} indexOfContainer={keyMaker} remove={removeAnAction}/>) //прокинул indexOfContainer, дабы было какое-то говорящее название. Если key требует React, то indexOfContainer требую я, дабы файл был читабельным.
                })}
            </section>
        </>
    )
}

export default MainPage;