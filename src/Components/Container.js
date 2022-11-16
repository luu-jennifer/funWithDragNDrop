import update from 'immutability-helper'
import { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { DraggableBox } from './DraggableBox.js'
import { ItemTypes } from './ItemTypes.js'
import snapToGrid from '../hooks/snapToGrid.js'
const styles = {
  width: "80vw",
  height: "80vh",
  border: '1px solid black',
  margin: '0 auto',
  position: 'relative',
}

const Container = ({userSelection, words, helperWordBank}) => {
  console.log('userSelection', userSelection);
  console.log('words', words);

      const userSelectionArr = words.map((wordObject) => {
        return wordObject.word;
    });

    const userWords = [
      ...userSelectionArr, 
      ...helperWordBank
    ];

console.log(userSelectionArr, 'userSelectionArr');
console.log(userWords, "userWords");

// const getRandomInt = (max) => {
//   return Math.floor(Math.random() * Math.floor(max));
// }
// console.log(getRandomInt(100));



  const [boxes, setBoxes] = useState(
    userWords.map((word, index) => ({
      title: word,
      left: index,
      top: index,
      id: index,
      type: ItemTypes.BOX,
      word: word,
      wordObject: userSelection[index],
      wordIndex: index,
      wordObjectIndex: index,
    })),
  )
  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        }),
      )
    },
    [boxes],
  )
  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset()
      let left = Math.round(item.left + delta.x)
      let top = Math.round(item.top + delta.y)
      if (snapToGrid) {
        ;[left, top] = snapToGrid(left, top)
      }
      moveBox(item.id, left, top)
      return undefined
    },
  })
  return (
    <div ref={drop} style={styles}>
      <ul
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        height: '80%',
        width: '90%',
      }}
      >

      {boxes.map(({ left, top, title, id, word, wordObject, wordIndex, wordObjectIndex }) => (
        <li
        style={
          {
            padding: '10px 20px',
            margin: '10px 40px',
          }
        }
        >

        <DraggableBox
        key={id}
        id={id}
        left={left}
        top={top}
        title={title}
        word={word}
        wordObject={wordObject}
        wordIndex={wordIndex}
        wordObjectIndex={wordObjectIndex}
        />
        </li>
        ))
        }
        </ul>
    </div>
  )
}
export default Container



// const [word, setWord] = useState({ 
//   word: {top: 0, left: 0, title: userSelectionArr[0] }});



    




//   const [boxes, setBoxes] = useState({
//     // create a box for each word in helperWordBank
//     a: { top: 20, left: 80, title: 'a' },
//     are: { top: 20, left: 280, title: 'are' },
//     an: { top: 120, left: 80, title: 'an' },
//     and: { top: 120, left: 180, title: 'and' },
//     as: { top: 220, left: 20, title: 'as' },
//     at: { top: 220, left: 120, title: 'at' },
//     by: { top: 320, left: 120, title: 'by' },
//     else: { top: 320, left: 220, title: 'else' },
//     for: { top: 320, left: 420, title: 'for' },
//     from: { top: 420, left: 20, title: 'from' },
//     in: { top: 420, left: 320, title: 'in' },
//     not: { top: 520, left: 20, title: 'not' },
//     of: { top: 520, left: 120, title: 'of' },
//     on: { top: 520, left: 320, title: 'on' },
//     or: { top: 620, left: 20, title: 'or' },
//     the: { top: 620, left: 420, title: 'the' },
//     to: { top: 720, left: 20, title: 'to' },
//     too: { top: 720, left: 120, title: 'too' },
//     with: { top: 720, left: 220, title: 'with' },
//     had: { top: 720, left: 420, title: 'had' },
//     has: { top: 820, left: 20, title: 'has' },
//     have: { top: 820, left: 120, title: 'have' },
//     he: { top: 820, left: 220, title: 'he' },
//     her: { top: 820, left: 320, title: 'her' },
//     hers: { top: 820, left: 420, title: 'hers' },
//     him: { top: 920, left: 20, title: 'him' },
//     his: { top: 920, left: 120, title: 'his' },
//     I: { top: 920, left: 220, title: 'I' },
//     is: { top: 920, left: 320, title: 'is' },
//     it: { top: 920, left: 420, title: 'it' },
//   })


  
//   // const moveBox = useCallback(
//   //   (id, left, top) => {
//   //     setBoxes(
//   //       update(boxes, {
//   //         [id]: {
//   //           $merge: { left, top },
//   //         },
//   //       }),
//   //     )
//   //   },
//   //   [boxes],
//   // )
//   // const [, drop] = useDrop(
//   //   () => ({
//   //     accept: ItemTypes.BOX,
//   //     drop(item, monitor) {
//   //       const delta = monitor.getDifferenceFromInitialOffset()
//   //       let left = Math.round(item.left + delta.x)
//   //       let top = Math.round(item.top + delta.y)
//   //       if (snapToGrid) {
//   //         ;[left, top] = snapToGrid(left, top)
//   //       }
//   //       moveBox(item.id, left, top)
//   //       return undefined
//   //     },
//   //   }),
//   //   [moveBox],
//   // )


//     const moveWord = useCallback(
//     (id, left, top) => {
//       setWord(
//         update(word, {
//           [id]: {
//             $merge: { left, top },
//           },
//         }),
//       )
//     },
//     [word],
//   )
//   const [, drop] = useDrop(
//     () => ({
//       accept: ItemTypes.BOX,
//       drop(item, monitor) {
//         const delta = monitor.getDifferenceFromInitialOffset()
//         let left = Math.round(item.left + delta.x)
//         let top = Math.round(item.top + delta.y)
//         if (snapToGrid) {
//           ;[left, top] = snapToGrid(left, top)
//         }
//         moveWord(item.id, left, top)
//         return undefined
//       },
//     }),
//     [moveWord],
//   )


//   return (

//     <div ref={drop} style={styles}>
//       {
//       Object.keys(boxes).map((key) => (
//         <DraggableBox key={key} id={key} {...boxes[key]} />
//       ))
//       }
// <ul className='poem'>

//       {
//       Object.keys(word).map((key) => (
//         <DraggableBox key={key} id={key} {...word[key]} />
//       ))
//       }







//         {/* { */}
//           {/* userSelectionArr.map((item) => { */}
//             {/* //make each word in userSelectionArr a draggable box */}
//               {/* return( */}
//                 {/* <li> */}
//                   {/* <DraggableBox key={item} id={item} {...word} /> */}

//                   {/* {item} */}
//                 {/* </li> */}
//               {/* ) */}
//           {/* }) */}
//         {/* } */}
//       </ul>
//     </div>
//   )
// }

// export default Container;