import { Test } from '../test/Test'
import './App.css'

const colorPalette = [
  "#FF0000", "#FF1111", "#FF2222", "#FF3333", "#FF4444", "#FF5555", "#FF6666", "#FF7777",
  "#800000", "#8B0000", "#A52A2A", "#DC143C", "#CD5C5C", "#F08080",
  "#FFA500", "#FF8C00", "#FF7F50", "#FF6347", "#FF4500", "#FFD700",
  "#FFFF00", "#FFE4B5", "#FFDAB9", "#EEE8AA", "#F0E68C", "#BDB76B",
  "#008000", "#006400", "#228B22", "#32CD32", "#90EE90", "#98FB98",
  "#00FF00", "#7CFF00", "#7FFF00", "#00FF7F", "#00FA9A", "#98FB98",
  "#0000FF", "#0000CD", "#00008B", "#000080", "#191970", "#4169E1",
  "#4682B4", "#87CEEB", "#87CEFA", "#00BFFF", "#1E90FF", "#6495ED",
  "#800080", "#8B008B", "#9400D3", "#9932CC", "#BA55D3", "#DA70D6",
  "#EE82EE", "#DDA0DD", "#D8BFD8", "#E6E6FA",
  "#FF1493", "#FF69B4", "#FFB6C1", "#FFC0CB", "#DB7093",
  "#8B4513", "#A0522D", "#D2691E", "#CD853F", "#DEB887", "#F4A460",
  "#FFFFFF", "#F5F5F5", "#DCDCDC", "#D3D3D3", "#C0C0C0", "#A9A9A9",
  "#808080", "#696969", "#778899", "#708090", "#2F4F4F",
  "#000000",
  "#40E0D0", "#48D1CC", "#00CED1", "#20B2AA", "#008B8B", "#008080",
  "#00FFFF", "#E0FFFF", "#B0E0E6", "#ADD8E6", "#87CEEB", "#87CEFA",
  "#FFD700", "#DAA520", "#B8860B", "#CD853F", "#D2691E", "#8B4513",
  "#FFE4E1", "#FFF0F5", "#FAF0E6", "#F5F5DC", "#F0FFF0", "#F0FFFF",
  "#F0F8FF", "#E6E6FA", "#FFE4B5", "#FFDEAD"
];

function getRandomColor():string{
  const index = Math.floor(Math.random()*colorPalette.length);
  return colorPalette[index];
}

function App() {

  return (
    <>
      {Array(100).fill(0).map((v, i)=>
        <Test key={`key_test_${i}`} background={getRandomColor()} color={getRandomColor()}  text={`test_${i}`}/>
      )}
    </>
  )
}

export default App
