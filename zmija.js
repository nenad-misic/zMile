document.getElementById('tabla').innerHTML = [...Array(30)].map((e,i) => `<tr>${[...Array(30)].map((x,j) => `<td id="td_${i}_${j}" class="field"></td>`).join('\n')}</tr>`).join('\n');
var check_end = () => {
    if (((new Set(pozisns.map(e => `${e.i} ${e.j}`))).size != pozisns.length) || (pozisns.filter(e => e.i < 0 || e.i > 29 || e.j < 0 || e.j > 29).length > 0)) {
	location.reload();
        alert(`The end! Score: ${(leng-4)/2}`);
    }
}
var render = () => {
    check_end();
    for (let x of document.querySelectorAll('.field')) {
         x.style.background = "#efefef";
    }
    for (let pozisn of pozisns) {
	document.getElementById(`td_${pozisn.i}_${pozisn.j}`).style.background = '#666';
    }

   
    document.getElementById(`td_${food.i}_${food.j}`).style.background = '#0F0';
    document.getElementById('score').innerHTML = `Score: ${(leng-4)/2}`;
   
}

var getRandom = () => {
    let i = parseInt(Math.random() * 29);
    while (pozisns.filter( e => e.i == i).length > 0) i = parseInt(Math.random() * 29);
    let j = parseInt(Math.random() * 29);
    while (pozisns.filter( e => e.j == j).length > 0) j = parseInt(Math.random() * 29);
    return {i,j}
}

var state = 0;
var mapa = {
	'w': 3,
	's': 1,
	'a': 2,
	'd': 0
}
var moves = [[0,1],[1,0],[0,-1],[-1,0]]
var leng = 4;
var pozisns = [{i: 10, j:11},{i: 10, j:12},{i: 10, j:13},{i: 10, j:14}]
var food = getRandom()


setInterval(() => {
    let last_element = pozisns[pozisns.length - 1]
    let newlyadded = {i: last_element.i + moves[state][0], j: last_element.j + moves[state][1]}
    pozisns.push(newlyadded)
    if (newlyadded.i == food.i && newlyadded.j == food.j) {food = getRandom(); leng += 2;}
    if (pozisns.length > leng) {
        pozisns = pozisns.splice(1)
    }
    render()
}, 100)


document.getElementById('control').addEventListener( 'input', evt => {
	document.getElementById('xxx').play()
    if ((state + mapa[evt.data]) % 2 == 0) return;
    state = mapa[evt.data]
})
document.getElementById('control').focus();

