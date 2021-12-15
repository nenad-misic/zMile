
setTimeout(() => {
    document.getElementById('tabla').innerHTML = [...Array(20)].map((e,i) => `<tr>${[...Array(20)].map((x,j) => `<td id="td_${i}_${j}" class="field"></td>`).join('\n')}</tr>`).join('\n');
    document.getElementById('overlay').style.opacity = 0;

    
var check_end = () => {
    if (((new Set(pozisns.map(e => `${e.i} ${e.j}`))).size != pozisns.length) || (pozisns.filter(e => e.i < 0 || e.i > 19 || e.j < 0 || e.j > 19).length > 0)) {
	    // location.reload();
        document.getElementById('msg').innerHTML = `Score: ${(leng-4)/2}`;
        document.getElementById('overlay').style.opacity = 1;
        setTimeout(() => location.reload(), 2000);
        }
    }
    var render = () => {
        check_end();
        for (let x of document.querySelectorAll('.field')) {
            x.style.background = "#efefef";
            x.style.borderRadius = 0
        }
        for (let pozisn of pozisns) {
        document.getElementById(`td_${pozisn.i}_${pozisn.j}`).style.background = '#999';
        document.getElementById(`td_${pozisn.i}_${pozisn.j}`).style.borderRadius = '50%'
        }

        let glava = pozisns[pozisns.length - 1]
        document.getElementById(`td_${glava.i}_${glava.j}`).style.background = `url("pele.jpg")`;
        document.getElementById(`td_${glava.i}_${glava.j}`).style.backgroundRepeat = 'round';

    
        document.getElementById(`td_${food.i}_${food.j}`).style.background = 'url("cevap.jpg")';
        document.getElementById(`td_${food.i}_${food.j}`).style.backgroundRepeat = 'round';
        document.getElementById('score').innerHTML = `Score: ${(leng-4)/2}`;
    
    }

    var getRandom = () => {
        let i = parseInt(Math.random() * 19);
        while (pozisns.filter( e => e.i == i).length > 0) i = parseInt(Math.random() * 19);
        let j = parseInt(Math.random() * 19);
        while (pozisns.filter( e => e.j == j).length > 0) j = parseInt(Math.random() * 19);
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


    var playing = false;

    render()

    document.getElementById('control').addEventListener( 'input', evt => {
        if (!playing){
            playing = true;
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
        }
        document.getElementById('xxx').play()
        if ((state + mapa[evt.data]) % 2 == 0) return;
        state = mapa[evt.data]
    })
    document.getElementById('control').focus();


}, 100)
