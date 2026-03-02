/**
       * @file main.js
       * @description Recreación de paisaje marino minimalista mediante API Canvas.
       * @author Miguel Angel Cano Alejandro
       * @carrera Ingeniería en Sistemas Computacionales
       * @noControl 23200816
       * @institucion Instituto Tecnológico de Pachuca
 */

document.addEventListener('DOMContentLoaded', () => {
      const canvas = document.getElementById('miCanvas');
      const ctx = canvas.getContext('2d');
      const contenedor = document.getElementById('contenedor-canvas');

      // Contador para verificar el uso de figuras básicas (> 30)
      let totalFiguras = 0;

      function redimensionarCanvas() {
            canvas.width = contenedor.clientWidth;
            canvas.height = contenedor.clientHeight;
            totalFiguras = 0; // Reiniciar contador en cada renderizado
            dibujarEscena();
      }

      window.addEventListener('resize', redimensionarCanvas);

      /**
             * 1. FONDO: CIELO, MAR Y ARENA
             * Figuras: 3 rectángulos + N líneas de oleaje
       */
      function dibujarFondo(w, h) {
            // Cielo
            ctx.fillStyle = '#bde0fe';
            ctx.fillRect(0, 0, w, h * 0.7);
            totalFiguras++;

            // Mar
            ctx.fillStyle = '#2A82C5';
            ctx.fillRect(0, h * 0.7, w, h * 0.15);
            totalFiguras++;

            // Arena (Playa inferior)
            ctx.fillStyle = '#E3C18A';
            ctx.fillRect(0, h * 0.85, w, h * 0.15);
            totalFiguras++;

            // Detalle de olas (Zig-zag) - Aproximadamente 10-15 segmentos de línea
            ctx.beginPath();
            ctx.strokeStyle = '#1D5D8C';
            ctx.lineWidth = 2;
            let step = w / 20;
            ctx.moveTo(0, h * 0.7);
            for (let i = 0; i <= 20; i++) {
                  let x = i * step;
                  let y = (i % 2 === 0) ? h * 0.7 : h * 0.7 + 10;
                  ctx.lineTo(x, y);
                  totalFiguras++; // Cada segmento cuenta como una figura de línea
            }
            ctx.stroke();
      }

      /**
             * 2. ELEMENTOS CELESTES: SOL Y NUBES
             * Figuras: 1 arco (Sol) + 15 arcos (Nubes)
       */
      function dibujarSol(w, h) {
            ctx.beginPath();
            ctx.arc(w * 0.2, h * 0.15, h * 0.07, 0, Math.PI * 2);
            ctx.fillStyle = '#FFD700';
            ctx.fill();
            ctx.strokeStyle = '#333';
            ctx.stroke();
            totalFiguras++;
      }

      function crearNube(x, y, scale) {
            ctx.fillStyle = '#FFFFFF';
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1.5;
            
            // Diseño de nube minimalista (3 círculos limpios)
            const radios = [20 * scale, 25 * scale, 20 * scale];
            const offsets = [0, 20 * scale, 40 * scale];

            radios.forEach((r, i) => {
                  ctx.beginPath();
                  ctx.arc(x + offsets[i], y, r, 0, Math.PI * 2);
                  ctx.fill();
                  ctx.stroke();
                  totalFiguras++;
            });
      }

      /**
             * 3. FAUNA: PÁJAROS
             * Figuras: 10 líneas (5 pájaros)
       */
      function dibujarPajaros(w, h) {
            const posiciones = [[0.3, 0.3], [0.45, 0.35], [0.7, 0.2], [0.8, 0.4], [0.9, 0.25]];
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1.5;

            posiciones.forEach(p => {
                  let px = w * p[0];
                  let py = h * p[1];
                  ctx.beginPath();
                  ctx.moveTo(px, py);
                  ctx.lineTo(px + 10, py + 5); // Ala 1
                  ctx.lineTo(px + 20, py);     // Ala 2
                  ctx.stroke();
                  totalFiguras += 2;
            });
      }

      /**
             * 4. TRANSPORTE: BARCOS
             * Figuras: 3 trapecios (cascos) + 3 líneas (mástiles) + 6 triángulos (velas)
       */
      function dibujarBarco(x, y, s) {
            // Casco
            ctx.fillStyle = '#6D4C41';
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + 80 * s, y);
            ctx.lineTo(x + 65 * s, y + 20 * s);
            ctx.lineTo(x + 15 * s, y + 20 * s);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            totalFiguras++;

            // Mástil
            ctx.beginPath();
            ctx.moveTo(x + 40 * s, y);
            ctx.lineTo(x + 40 * s, y - 60 * s);
            ctx.stroke();
            totalFiguras++;

            // Velas
            ctx.fillStyle = '#FFF';
            // Vela Mayor
            ctx.beginPath();
            ctx.moveTo(x + 38 * s, y - 5);
            ctx.lineTo(x + 38 * s, y - 55 * s);
            ctx.lineTo(x + 5 * s, y - 10 * s);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            totalFiguras++;

            // Vela Menor
            ctx.beginPath();
            ctx.moveTo(x + 42 * s, y - 5);
            ctx.lineTo(x + 42 * s, y - 40 * s);
            ctx.lineTo(x + 70 * s, y - 10 * s);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            totalFiguras++;
      }

      function dibujarEscena() {
            const w = canvas.width;
            const h = canvas.height;

            dibujarFondo(w, h); // ~23 figuras
            dibujarSol(w, h);   // 1 figura
            dibujarPajaros(w, h); // 10 figuras
            
            // Nubes (5 nubes * 3 círculos = 15 figuras)
            crearNube(w * 0.4, h * 0.1, 1);
            crearNube(w * 0.65, h * 0.2, 0.8);
            crearNube(w * 0.85, h * 0.15, 1.1);
            crearNube(w * 0.1, h * 0.25, 0.7);
            crearNube(w * 0.55, h * 0.05, 0.9);

            // Barcos (3 barcos * 4 figuras = 12 figuras)
            dibujarBarco(w * 0.15, h * 0.78, 1.2);
            dibujarBarco(w * 0.5, h * 0.75, 1.5);
            dibujarBarco(w * 0.8, h * 0.77, 1);

            console.log("Total de figuras básicas renderizadas: " + totalFiguras);
      }

      setTimeout(redimensionarCanvas, 100);
});