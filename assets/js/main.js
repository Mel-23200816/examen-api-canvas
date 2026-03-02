document.addEventListener('DOMContentLoaded', () => {
    // Obtenemos las referencias de los elementos
    const canvas = document.getElementById('miCanvas');
    const contenedor = document.getElementById('contenedor-canvas');
    const ctx = canvas.getContext('2d');

    // Función para ajustar la resolución del canvas al tamaño de la pantalla
    function redimensionarCanvas() {
        canvas.width = contenedor.clientWidth;
        canvas.height = contenedor.clientHeight;
        
        dibujarPlano();
    }

    // Función donde pondrás la lógica de tu examen
    function dibujarPlano() {
        // Limpiamos el canvas antes de dibujar (útil cuando se redimensiona)
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Ejemplo: Dibujando una cruz en el centro para confirmar que funciona
        ctx.beginPath();
        // Línea horizontal
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        // Línea vertical
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        
        // Estilos de la línea
        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Escuchamos el evento 'resize' por si el usuario cambia el tamaño de la ventana
    window.addEventListener('resize', redimensionarCanvas);

    // Inicializamos el canvas al cargar la página
    redimensionarCanvas();
});