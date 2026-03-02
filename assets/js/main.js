/**
 * main.js
 * Reproducción de la imagen 'paisaje-marino' en API Canvas
 * para el Examen API Canvas.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Configuración Inicial del Canvas
    const canvas = document.getElementById('miCanvas');
    const ctx = canvas.getContext('2d');
    const contenedor = document.getElementById('contenedor-canvas');

    // Función para ajustar el tamaño del canvas al contenedor
    function redimensionarCanvas() {
        // Obtenemos las dimensiones del contenedor (Bootstrap)
        const ancho = contenedor.clientWidth;
        const alto = contenedor.clientHeight;

        // Establecemos la resolución interna del canvas
        canvas.width = ancho;
        canvas.height = alto;

        // Redibujamos todo
        dibujarEscenaCompleta();
    }

    // Escuchamos el evento de cambio de tamaño de ventana
    window.addEventListener('resize', redimensionarCanvas);

    // 2. Funciones de Dibujo (Organizadas por Elementos)

    function dibujarEscenaCompleta() {
        if (!ctx) return;
        const w = canvas.width;
        const h = canvas.height;

        // Limpiamos el canvas
        ctx.clearRect(0, 0, w, h);

        // Definimos las capas de profundidad (Cielo -> Mar -> Elementos)
        const altoCielo = h * 0.8;
        const altoMar = h * 0.2;

        dibujarFondoYMar(w, altoCielo, altoMar);
        dibujarSol(w, h);
        dibujarNubes(w, h);
        dibujarPajaros(w, h);
        dibujarBarcos(w, h);
    }

    // --- Esto forma el Cielo y el Mar ---
    function dibujarFondoYMar(w, altoCielo, altoMar) {
        // Cielo (Fondo claro)
        ctx.fillStyle = '#bde0fe'; // Un azul cielo claro minimalista
        ctx.fillRect(0, 0, w, altoCielo);

        // Mar (Parte inferior)
        ctx.fillStyle = '#0077b6'; // Un azul mar intenso
        ctx.fillRect(0, altoCielo, w, altoMar);

        // Detalle de olas (línea en zig-zag)
        ctx.beginPath();
        ctx.strokeStyle = '#005f90'; // Un tono más oscuro
        ctx.lineWidth = 1;
        
        const pasoZigZag = 20;
        const altoZigZag = 10;
        const yBase = altoCielo;

        ctx.moveTo(0, yBase);
        for (let x = 0; x <= w; x += pasoZigZag) {
            ctx.lineTo(x + pasoZigZag / 2, yBase + altoZigZag);
            ctx.lineTo(x + pasoZigZag, yBase);
        }
        ctx.stroke();
    }

    // --- Esto forma el Sol ---
    function dibujarSol(w, h) {
        // Posición y tamaño relativos
        const solX = w * 0.25;
        const solY = h * 0.15;
        const radioSol = h * 0.08;

        ctx.beginPath();
        ctx.arc(solX, solY, radioSol, 0, Math.PI * 2);
        ctx.fillStyle = '#ffeb3b'; // Amarillo vibrante minimalista
        ctx.strokeStyle = '#333'; // Borde oscuro minimalista
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
    }

    // --- Esto forma las Nubes ---
    function dibujarUnaNube(x, y, escala) {
        ctx.fillStyle = '#ffffff'; // Blanco puro
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        // La nube está hecha de círculos solapados
        const radio = 25 * escala;
        ctx.arc(x, y, radio, 0, Math.PI * 2); // Círculo izquierdo
        ctx.arc(x + 30 * escala, y - 10 * escala, radio + 5 * escala, 0, Math.PI * 2); // Centro arriba
        ctx.arc(x + 30 * escala, y + 10 * escala, radio + 5 * escala, 0, Math.PI * 2); // Centro abajo
        ctx.arc(x + 60 * escala, y, radio, 0, Math.PI * 2); // Círculo derecho
        
        ctx.fill();
        ctx.stroke();
    }

    function dibujarNubes(w, h) {
        // Nube 1 (Izquierda)
        dibujarUnaNube(w * 0.1, h * 0.25, h * 0.001);
        // Nube 2 (Arriba Centro)
        dibujarUnaNube(w * 0.45, h * 0.15, h * 0.001);
        // Nube 3 (Abajo Centro)
        dibujarUnaNube(w * 0.6, h * 0.28, h * 0.001);
        // Nube 4 (Arriba Derecha)
        dibujarUnaNube(w * 0.75, h * 0.15, h * 0.001);
        // Nube 5 (Abajo Derecha)
        dibujarUnaNube(w * 0.9, h * 0.28, h * 0.001);
    }

    // --- Esto forma las Pajaros (V-shapes) ---
    function dibujarUnPajaro(x, y, ancho, alto) {
        ctx.beginPath();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1.5;
        ctx.moveTo(x, y); // Punta izquierda
        ctx.lineTo(x + ancho / 2, y + alto); // Vértice abajo
        ctx.lineTo(x + ancho, y); // Punta derecha
        ctx.stroke();
    }

    function dibujarPajaros(w, h) {
        const tamBaseAncho = w * 0.03;
        const tamBaseAlto = h * 0.02;

        // Unos pocos pájaros esparcidos
        dibujarUnPajaro(w * 0.35, h * 0.3, tamBaseAncho, tamBaseAlto);
        dibujarUnPajaro(w * 0.3, h * 0.4, tamBaseAncho, tamBaseAlto);
        dibujarUnPajaro(w * 0.45, h * 0.35, tamBaseAncho * 1.2, tamBaseAlto * 1.2);
        dibujarUnPajaro(w * 0.7, h * 0.4, tamBaseAncho, tamBaseAlto);
        dibujarUnPajaro(w * 0.8, h * 0.32, tamBaseAncho * 0.8, tamBaseAlto * 0.8);
        dibujarUnPajaro(w * 0.93, h * 0.4, tamBaseAncho, tamBaseAlto);
        dibujarUnPajaro(w * 0.07, h * 0.4, tamBaseAncho, tamBaseAlto);
    }

    // --- Esto forma un Barco ---
    function dibujarUnBarco(x, y, escala, colorCasco) {
        const anchoVela = 60 * escala;
        const altoVela = 100 * escala;
        const anchoCasco = 120 * escala;
        const altoCasco = 25 * escala;

        // Casco (Trapecio)
        ctx.fillStyle = colorCasco; // Un marrón
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y); // Esquina superior izquierda
        ctx.lineTo(x + anchoCasco, y); // Esquina superior derecha
        ctx.lineTo(x + anchoCasco - anchoCasco * 0.15, y + altoCasco); // Esquina inferior derecha
        ctx.lineTo(x + anchoCasco * 0.15, y + altoCasco); // Esquina inferior izquierda
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Mástil
        const mastilX = x + anchoVela;
        ctx.beginPath();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 3;
        ctx.moveTo(mastilX, y); // Base mástil
        ctx.lineTo(mastilX, y - altoVela); // Punta mástil
        ctx.stroke();

        // Velas (Dos triángulos)
        ctx.fillStyle = '#ffffff'; // Velas blancas
        
        // Vela izquierda
        ctx.beginPath();
        ctx.moveTo(mastilX - 2, y); // Base junto al mástil
        ctx.lineTo(mastilX - anchoVela + 5, y - altoVela / 10); // Punta izquierda
        ctx.lineTo(mastilX - 2, y - altoVela * 0.9); // Punta superior junto al mástil
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Vela derecha
        ctx.beginPath();
        ctx.moveTo(mastilX + 2, y); // Base junto al mástil
        ctx.lineTo(mastilX + anchoVela - 20, y - altoVela / 10); // Punta derecha
        ctx.lineTo(mastilX + 2, y - altoVela * 0.5); // Punta superior junto al mástil
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    function dibujarBarcos(w, h) {
        const yBase = h * 0.8;
        const marronCasco = '#8d6e63'; // Un tono marrón minimalista

        // Barco 1 (Izquierda)
        dibujarUnBarco(w * 0.15, yBase, h * 0.0012, marronCasco);
        // Barco 2 (Centro - más grande)
        dibujarUnBarco(w * 0.45, yBase, h * 0.0018, marronCasco);
        // Barco 3 (Derecha - más pequeño y más lejos)
        dibujarUnBarco(w * 0.78, yBase, h * 0.001, marronCasco);
    }

    // 3. Inicialización
    // Un pequeño retraso para asegurar que Bootstrap ha calculado los tamaños
    setTimeout(redimensionarCanvas, 100);
});