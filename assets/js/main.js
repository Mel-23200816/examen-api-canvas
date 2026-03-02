document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('miCanvas');
    const contenedor = document.getElementById('contenedor-canvas');
    const ctx = canvas.getContext('2d');

    // Ajusta la resolución interna del canvas al tamaño del contenedor de Bootstrap
    function redimensionarCanvas() {
        // Obtenemos el tamaño real calculando por Bootstrap
        canvas.width = contenedor.clientWidth;
        canvas.height = contenedor.clientHeight;
        
        dibujarPlano();
    }

    // Dibuja el plano cartesiano
    function dibujarPlano() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centroX = canvas.width / 2;
        const centroY = canvas.height / 2;

        // Estilo de las líneas (Azul estilo Bootstrap)
        ctx.strokeStyle = '#0d6efd'; 
        ctx.lineWidth = 2;

        ctx.beginPath();
        // Eje X (Horizontal)
        ctx.moveTo(0, centroY);
        ctx.lineTo(canvas.width, centroY);
        // Eje Y (Vertical)
        ctx.moveTo(centroX, 0);
        ctx.lineTo(centroX, canvas.height);
        ctx.stroke();

        // Agregamos una pequeña etiqueta en el centro (Opcional)
        ctx.fillStyle = '#6c757d'; // Color de texto gris secundario
        ctx.font = '16px sans-serif';
        ctx.fillText('(0, 0)', centroX + 10, centroY - 10);
    }

    // Escuchar cambios en el tamaño de la ventana
    window.addEventListener('resize', redimensionarCanvas);

    // Un pequeño retraso en la inicialización asegura que 
    // Bootstrap haya renderizado los tamaños correctamente antes de dibujar
    setTimeout(redimensionarCanvas, 50);
});