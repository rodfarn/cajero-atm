var cuentas = [
    { nombre: "Mamá", saldo: 200 },
    { nombre: "Papá", saldo: 290 },
    { nombre: "Rodrigo", saldo: 167 }
];

var usuarioActual = null;

function autenticar() {
    var seleccion = document.getElementById("cuentas").value;
    var password = document.getElementById("password").value;

    if (password === "1234") { // Contraseña de ejemplo, debes implementar una lógica segura de autenticación
        usuarioActual = cuentas[seleccion];
        document.getElementById("acciones").style.display = "block";
        document.getElementById("resultado").innerText = "";
    } else {
        alert("Contraseña incorrecta. Inténtalo nuevamente.");
    }
}

function consultarSaldo() {
    mostrarResultado("Saldo actual: $" + usuarioActual.saldo);
}

function ingresarMonto() {
    var monto = prompt("Ingresa el monto a ingresar:");
    monto = parseFloat(monto);

    if (!isNaN(monto) && monto > 0 && usuarioActual.saldo + monto <= 990) {
        usuarioActual.saldo += monto;
        mostrarResultado("Monto ingresado: $" + monto + "<br>Nuevo saldo: $" + usuarioActual.saldo);
    } else {
        mostrarResultado("Ingrese un monto válido que no exceda el límite de $990.");
    }
}

function retirarMonto() {
    var monto = prompt("Ingresa el monto a retirar:");
    monto = parseFloat(monto);

    if (!isNaN(monto) && monto > 0 && monto <= usuarioActual.saldo && usuarioActual.saldo - monto >= 10) {
        usuarioActual.saldo -= monto;
        mostrarResultado("Monto retirado: $" + monto + "<br>Nuevo saldo: $" + usuarioActual.saldo);
    } else {
        mostrarResultado("Monto no válido o excede los límites de la cuenta.");
    }
}

function transferir() {
    var monto = prompt("Ingresa el monto a transferir:");
    monto = parseFloat(monto);

    if (!isNaN(monto) && monto > 0 && monto <= usuarioActual.saldo) {
        var cuentasDestino = cuentas.filter((cuenta, index) => index !== cuentas.indexOf(usuarioActual));
        var opcionesDestino = cuentasDestino.map((cuenta, index) => `${index}: ${cuenta.nombre}`).join('\n');

        var cuentaDestinoIndex = prompt("Selecciona la cuenta destino:\n" + opcionesDestino);
        cuentaDestinoIndex = parseInt(cuentaDestinoIndex);

        if (!isNaN(cuentaDestinoIndex) && cuentaDestinoIndex >= 0 && cuentaDestinoIndex < cuentasDestino.length) {
            var cuentaDestino = cuentasDestino[cuentaDestinoIndex];

            if (usuarioActual.saldo - monto >= 10 && cuentaDestino.saldo + monto <= 990) {
                usuarioActual.saldo -= monto;
                cuentaDestino.saldo += monto;
                mostrarResultado(`Transferencia exitosa. Monto transferido: $${monto}\nNuevo saldo (${usuarioActual.nombre}): $${usuarioActual.saldo}\nNuevo saldo (${cuentaDestino.nombre}): $${cuentaDestino.saldo}`);
            } else {
                mostrarResultado("La transferencia está fuera de los límites de saldo permitidos.");
            }
        } else {
            mostrarResultado("Número de cuenta destino no válido.");
        }
    } else {
        mostrarResultado("Monto no válido o excede los límites de la cuenta.");
    }
}

function mostrarResultado(mensaje) {
    document.getElementById("resultado").innerHTML = mensaje;
}
