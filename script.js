// HTML inportao
const tablero= document.getElementById ('tablerin')
const puntuacion = document.getElementById ('puntu2')
const botonini= document.getElementById ('comenzar')
const perdiosing= document.getElementById ('perdio')

// configuracion del gamer
const tamañotablero= 10;
const velocidad = 100;
const tiposdecuadros = {
    Cvacio: 0,
    CSerpi: 1,
    Ccomida: 2
};

const direcciones= {
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft: -1,
    KeyW: -10,
    KeyS: 10,
    KeyA: 1,
    KeyD: -1,
};

// variables del juego
let serpi;
let puntu;
let direccion;
let Ctablero;
let Cvacio;
let movinter;

const dibuserpi = () => {
    serpi.forEach(cuadrado => dibucudrao (cuadrado, 'CSerpi'));
}

const dibucudrao=  (cuadrado, type) => {
    const [ row, column ] = cuadrado.split('');
    Ctablero[row] [column] =  tiposdecuadros [type] ;
    const elecuadri = document.getElementById(cuadrado);
    elecuadri.setAttribute('class',`cuadrado ${type}`);
    if (type === 'Cvacio') {
        Cvacio.push(cuadrado);
    } else {
        if (Cvacio.indexOf(cuadrado) !== -1) {
            Cvacio.splice(Cvacio.indexOf(cuadrado), 1);

        }
    }
}

const movelserpi = () => {
    const nuevocudrao = String(
        Number(serpi[serpi.length - 1 ]) + direcciones [direccion])
        .padStart (2,'0');
    const [row,column] = nuevocudrao.split('');

    if (nuevocudrao < 0 || 
        nuevocudrao > tamañotablero * tamañotablero ||
        (direccion === 'ArrowRight' && column == 0) ||
        (direccion === 'ArrowLeft' && column == 9  ||
        Ctablero [row] [column] == tiposdecuadros.CSerpi )  ) {    
        fin();
    } else {
        serpi.push(nuevocudrao);
        if(Ctablero[row] [column] === tiposdecuadros.Ccomida ) {
            Pcomida();
        }else{
            const Cvacio = serpi.shift();
            dibucudrao (Cvacio, 'Cvacio');
        }
        dibuserpi();
    }
}

const Pcomida = () => {
        puntu++;
    actupuntuaje();
    crearandicomida();
}

const fin = () => {
    perdiosing.style.display = 'block';
    clearInterval(movinter)
    comenzar.disabled=false;

}

const direcionuev = nuevadirec => {
    direccion= nuevadirec;
}

const direccio1 = llave => {
    switch (llave.code){
        case 'ArrowUp':
            direccion!= 'ArrowDown' && direcionuev(llave.code)
            break;
        case 'ArrowDown':
            direccion != 'ArrowUp' &&  direcionuev(llave.code)
            break;
        case 'ArrowLeft':
            direccion != 'ArrowRight' && direcionuev(llave.code)
            break;
        case 'ArrowRight':
            direccion != 'ArrowLeft' && direcionuev(llave.code)
            break;
    }
}

const crearandicomida = () => {
    const Crandivacio= Cvacio [Math.floor(Math.random() * Cvacio.length)]
    dibucudrao(Crandivacio,  'Ccomida');
} 

const actupuntuaje = () => {
    puntuacion.innerText =puntu;
}
const creartablero = () => {
    Ctablero.forEach(  ( row, rowIndex) => {
        row.forEach( (column, columndex) => {
            const cuadradin =  `${rowIndex}${columndex}`;
            const elecuadri = document.createElement('tip');
            elecuadri.setAttribute ('class', 'cuadrado Cvacio' )
            elecuadri.setAttribute ('id', cuadradin)
            tablero.appendChild (elecuadri);
            Cvacio.push (cuadradin) 
        })
    } )
}

const preparativos = () => {
    serpi = ['00', '01', '02', '03'];
    puntu = serpi.length-4;
    direccion = 'ArrowRight';
    Ctablero = Array.from(Array(tamañotablero),  () => new Array(tamañotablero).fill(tiposdecuadros.Cvacio));
    tablero.innerHTML = ' ';
    Cvacio = [];
    creartablero();
}

const inicarjuego = () => { 
    preparativos();
    perdiosing.style.display ='none ';
    comenzar.disabled = true;
    dibuserpi();
    actupuntuaje();
    crearandicomida();
    document.addEventListener ( 'keydown', direccio1);
    movinter = setInterval ( () => movelserpi(), velocidad);
}

botonini.addEventListener('click' ,inicarjuego);